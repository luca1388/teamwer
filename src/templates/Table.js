import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import "./Table.css";

const Test = ({ pageContext }) => {
    console.log(pageContext.table);
    return(
        <Layout>
            <SEO title="Competitions table"></SEO>
            <div className="table-row header">
                <div className="position"></div>
                <div className="image"></div>
                <div className="team">Squadra</div>
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


export default Test;