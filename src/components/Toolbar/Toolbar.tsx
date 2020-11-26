import { Link } from "gatsby";
import React from "react";

import "./Toolbar.css";

interface ToolbarProps {
  links: [
    {
      to: string
      label: string
    }
  ]
}

const Toolbar: React.FC<ToolbarProps> = ({ links }) => (
  <div className="toolbar">
    {links.map((link, index) => (
      <><Link to={link.to}>{link.label}</Link> {index !== (links.length - 1) && "|"} </>
    ))}
  </div>
)

export default Toolbar;