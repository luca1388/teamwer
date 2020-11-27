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
      <span key={link.to}><Link to={link.to}>{link.label}</Link> {index !== (links.length - 1) && "|"} </span>
    ))}
  </div>
)

export default Toolbar;