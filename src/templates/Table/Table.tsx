import React from 'react';

import Layout from '../../components/Layout/Layout';
import SEO from '../../components/SEO/SEO';
import "./Table.css";

interface TableProps {
    pageContext: {
        table: [{
            position: number;
            id: string;
            team: {
                name: string;
                crestUrl: string;
                tla: string;
                shortName: string;
            },
            points: number;
            playedGames: number;
            draw: number;
            lost: number;
            goalsFor: number;
            goalsAgainst: number;
            won: number;
        }]
    }
};

const Table: React.FC<TableProps> = ({ pageContext }) => {
    return(
        <Layout>
            <SEO title="Competition table"></SEO>
            <div className="table-row header">
                <div className="position"></div>
                <div className="image"></div>
                <div className="team"></div>
                <div className="statsHeader">G</div>
                <div className="statsHeader">V</div>
                <div className="statsHeader">N</div>
                <div className="statsHeader">P</div>
                <div className="statsHeader">GF</div>
                <div className="statsHeader">GS</div>
                <div className="points">Pt</div>             
            </div>
            {pageContext.table.map(entry => 
                <div className="table-row" key={entry.id}>
                    <div className="position">{entry.position}</div>
                    <div className="image"><img width={40} src={entry.team.crestUrl} alt={entry.team.name} /></div>
                    <div className="team desktop">{entry.team.shortName}</div>
                    <div className="team mobile">{entry.team.tla}</div>
                    <div className="stats">{entry.playedGames}</div>
                    <div className="stats">{entry.won}</div>
                    <div className="stats">{entry.draw}</div>
                    <div className="stats">{entry.lost}</div>
                    <div className="stats">{entry.goalsFor}</div>
                    <div className="stats">{entry.goalsAgainst}</div>
                    <div className="points">{entry.points}</div>             
                </div>
            )}
        </Layout>
    );
};

export default Table;