import { Link } from "gatsby"
import React from "react"

interface HeaderProps {
  siteTitle: string;
};

const Header: React.FC<HeaderProps> = ({ siteTitle }) => (
  <header
    style={{
      background: `#2f2f2f`,
      marginBottom: `1.45rem`,
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        width: "80%",
        padding: `1.45rem 1.0875rem`,
        display: "flex",
      }}
    >
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          {siteTitle}
        </Link>
      </h1>
    </div>
  </header>
)

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
