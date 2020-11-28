/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";

import Header from "./Header/header";
import "./layout.css";
import Toolbar from "./Toolbar/Toolbar";

interface SiteData {
  site: {
    siteMetadata: {
      title: string;
    };
  };
}

const Layout: React.FC = ({ children }) => {
  const data: SiteData = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
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
          { to: "/table", label: "Table" },
        ]}
      />
      <div
        style={{
          margin: `0 auto`,
          width: "80%",
          padding: `0 1.0875rem 1.45rem`,
        }}
      >
        <main>{children}</main>
        {/* <footer
          style={{
            marginTop: `2rem`,
          }}
        >
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.com">Gatsby</a>
        </footer> */}
      </div>
    </>
  );
};

export default Layout;
