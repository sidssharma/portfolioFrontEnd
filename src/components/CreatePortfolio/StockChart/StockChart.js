// LineChart.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import Dropdown from 'react-bootstrap/Dropdown';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend } from 'chart.js';
import "./StockChart.css";

// Register the components we will be using with ChartJS
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

const LineChart = (props) => {
    const data = {
        labels: props.portfolioDateFinal,
        datasets: [
            {
                label: 'Portfolio',
                data: props.portfolioReturnFinal,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)', // Added background color
                borderWidth: 2,
                pointRadius: 1,
                pointStyle: 'none',
                fill: true, // Fill area under the line
            }
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false, // Ensure the chart adjusts to container
        plugins: {
            title: {
                display: true,
                text: 'Stock Portfolio Performance',
                font: {
                    size: 18,
                    weight: 'bold'
                }
            },
            legend: {
                display: true,
                position: 'top',
            },
            tooltip: {
                enabled: true,
                mode: 'index',
                intersect: false,
                callbacks: {
                    label: function(tooltipItem) {
                        return `Value: ${tooltipItem.raw}`;
                    }
                }
            }
        },
        scales: {
            x: {
                display: true,
                title: {
                    display: true,
                    text: 'Months',
                    font: {
                        size: 14,
                        weight: 'bold'
                    }
                },
                ticks: {
                    maxTicksLimit: 7,
                },
                grid: {
                    display: false, // Remove horizontal grid lines
                },
            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: 'Price',
                    font: {
                        size: 14,
                        weight: 'bold'
                    }
                },
                grid: {
                    display: false, // Remove horizontal grid lines
                },
            },
        },
    };

    return (
        <div className="chartContainer">
            <div className="portfolioContainer">
                <Dropdown className="dropdown-align-right">
                    <Dropdown.Toggle variant="success" id="dropdown-basic" className="backgroundColor1 textColor2">
                        Change Period
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => props.setYeartoTake(1)}>1 Year</Dropdown.Item>
                        <Dropdown.Item onClick={() => props.setYeartoTake(3)}>3 Year</Dropdown.Item>
                        <Dropdown.Item onClick={() => props.setYeartoTake(5)}>5 Year</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>

            <div className="lineChartWrapper">
                <Line data={data} options={options} />
            </div>
        </div>
    );
};

export default LineChart;
