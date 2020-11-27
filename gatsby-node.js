/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it
const axios = require("axios").default;
const path = require("path");

require("dotenv").config({
  path: `.env`,
});

// constants for your GraphQL Post and Author types
const POST_NODE_TYPE = `Team`;
const TABLE_POSITION_NODE_TYPE = `Position`;
const MATCH_NODE_TYPE = `Match`;

exports.sourceNodes = async ({
  actions,
  createContentDigest,
  createNodeId,
  getNodesByType,
}) => {
  const { createNode } = actions;

  const data = {};

  const fetchTeams = async () =>
    axios.get("https://api.football-data.org/v2/competitions/SA/teams", {
      headers: { "X-Auth-Token": process.env.API_TOKEN },
    });
  const fetchTable = async () =>
    axios.get("https://api.football-data.org/v2/competitions/SA/standings", {
      headers: { "X-Auth-Token": process.env.API_TOKEN },
    });
  const fetchSchedule = async () =>
    axios.get("https://api.football-data.org/v2/competitions/SA/matches", {
      headers: { "X-Auth-Token": process.env.API_TOKEN },
    });

  data.teams = (await fetchTeams()).data.teams;
  data.table = (await fetchTable()).data.standings[0].table;
  data.schedule = (await fetchSchedule()).data.matches;

  // loop through data and create Gatsby nodes
  data.teams.forEach(team => {
    createNode({
      ...team,
      teamId: team.id,
      id: createNodeId(`${POST_NODE_TYPE}-${team.id}`),
      parent: null,
      children: [],
      internal: {
        type: POST_NODE_TYPE,
        content: JSON.stringify(team),
        contentDigest: createContentDigest(team),
      },
    });
    let teamSchedule = data.schedule.filter(
      match => match.homeTeam.id === team.id || match.awayTeam.id === team.id
    );

    // createNode({
    //   ...teamSchedule,
    //   teamName: team.name,
    //   teamId: team.id,
    //   id: createNodeId(`${MATCH_NODE_TYPE}-${teamSchedule.id}`),
    //   parent: null,
    //   children: [],
    //   internal: {
    //     type: MATCH_NODE_TYPE,
    //     content: JSON.stringify(teamSchedule),
    //     contentDigest: createContentDigest(teamSchedule),
    //   },
    // })
    teamSchedule.forEach(match =>
      createNode({
        ...match,
        teamName: team.name,
        teamId: team.id,
        id: createNodeId(`${MATCH_NODE_TYPE}-${match.id}`),
        parent: null,
        children: [],
        internal: {
          type: MATCH_NODE_TYPE,
          content: JSON.stringify(match),
          contentDigest: createContentDigest(match),
        },
      })
    );
  });

  data.table.forEach(position =>
    createNode({
      ...position,
      id: createNodeId(`${TABLE_POSITION_NODE_TYPE}-${position.position}`),
      parent: null,
      children: [],
      internal: {
        type: TABLE_POSITION_NODE_TYPE,
        content: JSON.stringify(position),
        contentDigest: createContentDigest(position),
      },
    })
  );
  return;
};

exports.onCreateNode = ({ node, getNode, actions }) => {
  if (node.internal.type === `Position`) {
    console.log(`Node created of type "${node.internal.type}"`);
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const result = await graphql(`
    query {
      allPosition {
        edges {
          node {
            id
            position
            team {
              id
              name
              crestUrl
            }
            points
            playedGames
            draw
            lost
            goalsFor
            goalsAgainst
            goalDifference
          }
        }
      }
    }
  `);

  createPage({
    path: "/table/",
    component: path.resolve(`./src/templates/Table.tsx`),
    context: {
      // Data passed to context is available
      // in page queries as GraphQL variables.
      table: result.data.allPosition.edges.map(edge => ({ ...edge.node })),
    },
  });

  const scheduleResult = await graphql(`
    {
      allMatch {
        totalCount
        edges {
          node {
            teamId
            teamName
            id
            score {
              fullTime {
                homeTeam
                awayTeam
              }
            }
            homeTeam {
              name
            }
            awayTeam {
              name
            }
          }
        }
      }
    }
  `);

  scheduleResult.data.allMatch.edges.forEach(match => {
    createPage({
      path: "/schedule/teams/" + match.node.teamId,
      component: path.resolve(`./src/templates/Schedule/Schedule.tsx`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        teamId: match.node.teamId,
        match: match.node,
      },
    });
  });
};
