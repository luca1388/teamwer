import React from "react";
import { graphql } from "gatsby";
import Layout from "../../components/layout";
import SEO from "../../components/seo";

import "./Schedule.css";

type ScheduleNode = {
  node: {
    id: string;
    teamName: string;
    teamId: number;
    score: {
      fullTime: {
        homeTeam: number;
        awayTeam: number;
      }
    },
    homeTeam: {
      name: string;
    },
    awayTeam: {
      name: string
    }
  }
};

interface ScheduleProps {
  pageContext: {
    teamId: number;
    teamName: string;
  },
  data: {
    allMatch: {
      edges: ScheduleNode[]
    }
  }
};

const Schedule: React.FC<ScheduleProps> = ({ data, pageContext }) => {
  const matches: ScheduleNode[] = data.allMatch.edges.filter(
    edge => edge.node.teamId === pageContext.teamId
  );

  console.log(pageContext.teamName);

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
