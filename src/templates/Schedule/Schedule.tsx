import React from "react"
import { graphql } from "gatsby"
import Layout from "../../components/layout"
import SEO from "../../components/seo"

const Schedule = ({ data, pageContext }) => {
  const matches = data.allMatch.edges.filter(
    edge => edge.node.teamId === pageContext.teamId
  )

  return (
    <Layout>
      <SEO title={"Calendario " + pageContext.teamName}></SEO>
      {matches.map(match => (
        <div key={match.node.id}>
          <div>{match.node.homeTeam.name}</div>
          <div>{match.node.awayTeam.name}</div>
        </div>
      ))}
    </Layout>
  )
}

export default Schedule

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
`
