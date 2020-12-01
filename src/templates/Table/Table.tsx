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
            },
            points: number;
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
                <div className="points">Punti</div>             
            </div>
            {pageContext.table.map(entry => 
                <div className="table-row" key={entry.id}>
                    <div className="position">{entry.position}</div>
                    <div className="image"><img width={40} src={entry.team.crestUrl} alt={entry.team.name} /></div>
                    <div className="team">{entry.team.name}</div>
                    <div className="points">{entry.points}</div>             
                </div>
            )}
        </Layout>
    );
};

export default Table;