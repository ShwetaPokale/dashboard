import React, { useState, useEffect } from 'react';
import { getDataSources } from '../../services/dashboardService';

const DataSource = ({ onSelectDataSource }) => {
    const [dataSources, setDataSources] = useState([]);
    
    useEffect(() => {
        const fetchDataSources = async () => {
            try {
                const data = await getDataSources();
                setDataSources(data);
            } catch (error) {
                console.error("Error fetching data sources:", error);
            }
        };

        fetchDataSources();
    }, []);
    
    return (
        <div className="data-source-selector">
            <h3>Select Data Source</h3>
            <select onChange={(e) => onSelectDataSource(e.target.value)}>
                <option value="">Select a data source</option>
                {dataSources.map(source => (
                    <option key={source.id} value={source.id}>
                        {source.name} ({source.market})  
                    </option>
                ))}
            </select>
        </div>
    );
};

export default DataSource;
