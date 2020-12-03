import React from "react";
import Layout from "../../components/Layout/Layout";
import SEO from "../../components/SEO/SEO";

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
      shortName: string;
      crestUrl: string;
    },
    awayTeam: {
      name: string;
      shortName: string;
      crestUrl: string;
    }
  }
};

interface ScheduleProps {
  pageContext: {
    teamId: number;
    teamName: string;
    matches: ScheduleNode[];
    teamShortName: string;
    teamImage: string;
  }
};

const Schedule: React.FC<ScheduleProps> = ({ pageContext }) => {
  const { teamName, matches, teamImage, teamShortName } = pageContext;

  return (
    <Layout>
      <SEO title={"Calendario " + teamShortName} image={teamImage}></SEO>
      {matches.map(match => (
        <div className="schedule-container" key={match.node.id}>
          <div className="schedule-team">{match.node.homeTeam.shortName}</div>
          <div className="score-container">
              <div className="schedule-score">{match.node.score.fullTime.homeTeam}</div>-
              <div className="schedule-score">{match.node.score.fullTime.awayTeam}</div>
          </div>
          <div className="schedule-team">{match.node.awayTeam.shortName}</div>
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
