import React from "react";
import { graphql } from "gatsby";
import Layout from "../../components/layout";
import SEO from "../../components/seo";

import "./Schedule.css";

const Schedule = ({ data, pageContext }) => {
  const matches = data.allMatch.edges.filter(
    edge => edge.node.teamId === pageContext.teamId
  );

  return (
    <Layout>
      <SEO title={"Calendario " + pageContext.teamName}></SEO>
      {matches.map(match => (
        <div className="schedule-container" key={match.node.id}>
          <div className="schedule-team">{match.node.homeTeam.name}</div>
          <div className="schedule-score">{match.node.score.fullTime.homeTeam}</div>-
          <div className="schedule-score">{match.node.score.fullTime.awayTeam}</div>
          <div className="schedule-team">{match.node.awayTeam.name}</div>
        </div>
      ))}
    </Layout>
  );
};

export default Schedule;

export const query = graphql`
  query {
    allMatch {
      edges {
        node {
          id
          teamName
          teamId
          score {
            fullTime {
              homeTeam
              awayTeam
            }
          }
          homeTeam {
            name
            id
          }
          awayTeam {
            name
          }
        }
      }
    }
  }
`;
