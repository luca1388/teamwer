/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it
const axios = require("axios").default
const path = require('path');

require("dotenv").config({
  path: `.env`,
})

// constants for your GraphQL Post and Author types
const POST_NODE_TYPE = `Team`
const TABLE_POSITION_NODE_TYPE = `Position`

exports.sourceNodes = async ({
  actions,
  createContentDigest,
  createNodeId,
  getNodesByType,
}) => {
  const { createNode } = actions

  const data = {}

  const fetchTeams = async () =>
    axios.get("https://api.football-data.org/v2/competitions/SA/teams", {
      headers: { "X-Auth-Token": process.env.API_TOKEN },
    })
  const fetchTable = async () =>
    axios.get("https://api.football-data.org/v2/competitions/SA/standings", {
      headers: { "X-Auth-Token": process.env.API_TOKEN },
    })

  data.teams = (await fetchTeams()).data.teams
  data.table = (await fetchTable()).data.standings[0].table;

  // loop through data and create Gatsby nodes
  data.teams.forEach(team =>
    createNode({
      ...team,
      id: createNodeId(`${POST_NODE_TYPE}-${team.id}`),
      parent: null,
      children: [],
      internal: {
        type: POST_NODE_TYPE,
        content: JSON.stringify(team),
        contentDigest: createContentDigest(team),
      },
    })
  )

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
  )
  return
}

exports.onCreateNode = ({ node, getNode, actions }) => {
  if (node.internal.type === `Position`) {
    console.log(`Node created of type "${node.internal.type}"`)
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
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
  `)

  createPage({
    path: '/table/',
    component: path.resolve(`./src/templates/Table.js`),
    context: {
      // Data passed to context is available
      // in page queries as GraphQL variables.
      table: result.data.allPosition.edges.map(edge => ({...edge.node}))
    },
  })
}