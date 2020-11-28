import React from "react";
import { graphql } from "gatsby";
import Layout from "../../components/layout";
import SEO from "../../components/seo";

import "./Schedule.css";

type ScheduleNode = {
  node: {
    id: number;
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
    matches: ScheduleNode[];
  }
};

const Schedule: React.FC<ScheduleProps> = ({ pageContext }) => {
  const { teamName, matches } = pageContext;

  return (
    <Layout>
      <SEO title={"Calendario " + teamName}></SEO>
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

// export const query = graphql`
//   query {
//     allMatch {
//       edges {
//         node {
//           id
//           score {
//             fullTime {
//               homeTeam
//               awayTeam
//             }
//           }
//           homeTeam {
//             name
//             id
//           }
//           awayTeam {
//             name
//             id
//           }
//         }
//       }
//     }
//   }
// `;
