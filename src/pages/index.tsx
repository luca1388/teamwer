import React from "react"
import { PageProps, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import TeamTile from "../components/TeamTile/TeamTile"

type IndexPageProps = {
  allTeam: {
    nodes: [
      {
        id: number
        shortName: string
        crestUrl: string
        tla: string
      }
    ]
  }
}

const IndexPage: React.FC<PageProps<IndexPageProps>> = ({ data }) => {
  const teams = data.allTeam.nodes

  return (
    <Layout>
      <SEO title="Home" />
      <div className="teams-container" style={{ flexWrap: 'wrap', display: 'flex', justifyContent: 'center', alignItems: "center"}}>
        {teams.map(team => (
          <TeamTile
            key={team.id}
            name={team.tla}
            id={"" + team.id}
            shortName={team.shortName}
            imageUrl={team.crestUrl}
          />
        ))}
      </div>
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query TeamNamesQuery {
    allTeam {
      nodes {
        id
        shortName
        crestUrl
        tla
      }
    }
  }
`
