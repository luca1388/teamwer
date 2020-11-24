import React from "react";
import "./TeamTile.css";

interface TeamTileProps {
  name: string
  imageUrl: string
  shortName: string
  id: string
}

const TeamTile: React.FC<TeamTileProps> = ({
  shortName,
  imageUrl,
  id,
}): React.ReactElement => { 
  return (
    <div className="tile-container" id={id}>
      <img src={imageUrl} alt={shortName} width={80} />
      {shortName}
    </div>
  )
}

export default TeamTile;