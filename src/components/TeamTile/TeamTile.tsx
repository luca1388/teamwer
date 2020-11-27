import { Link } from "gatsby";
import React from "react";
import "./TeamTile.css";

interface TeamTileProps {
  name: string
  imageUrl: string
  shortName: string
  id: number
}

const TeamTile: React.FC<TeamTileProps> = ({
  shortName,
  imageUrl,
  id,
}): React.ReactElement => { 
  return (
    <Link className="tile-link" to={"/schedule/teams/" + id} style={{ textDecoration: 'none'}}>
      <div className="tile-container" id={"" + id}>
        <img src={imageUrl} alt={shortName} width={80} />
        {shortName}
      </div>
    </Link>
  )
}

export default TeamTile;