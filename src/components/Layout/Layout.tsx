/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react";
import { useStaticQuery, graphql } from "gatsby";

import Header from "../Header/header";
import "./Layout.css";
import Toolbar from "../Toolbar/Toolbar";

import { SiteData } from "../../types";

const Layout: React.FC = ({ children }) => {
  const data: SiteData = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          description
          author
          image
        }
      }
    }
  `);

  return (
    <>
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
      <Toolbar
        links={[
          { to: "/", label: "Home" },
          { to: "/table", label: "Standings" },
        ]}
      />
      <div
        className="main-container"
      >
        <main>{children}</main>
      </div>
    </>
  );
};

export default Layout;
