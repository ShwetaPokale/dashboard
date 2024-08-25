import React, { useEffect, useState } from 'react';
import { getDataSourcebyType } from '../../services/dashboardService';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import './dashboard.css'; 

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Chart = ({ data, dataSource }) => {
    const [chartData, setChartData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getDataSourcebyType(dataSource);

                if (result && result.length > 0) {
                    const chartData = {
                        labels: result.map(item => item.script),
                        datasets: [{
                            label: data.name,
                            data: result.map(item => item.close),
                            borderColor: 'rgba(75, 192, 192, 1)',
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        }]
                    };
                    setChartData(chartData);
                    setError(null); 
                } else {
                    setError('No data available for the selected data source.');
                }
            } catch (error) {
                setError('Error fetching data for the selected data source.');
            }
        };

        if (dataSource) {
            fetchData();
        }
    }, [dataSource, data]);

    return (
        <div className="chart-container">
            {error ? (
                <p>{error}</p>
            ) : chartData ? (
                <Line data={chartData} />
            ) : (
                <p>Loading chart...</p>
            )}
        </div>
    );
};

export default Chart;
