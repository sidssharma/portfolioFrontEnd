import React from 'react';
import Table from 'react-bootstrap/Table';
import { Row, Col } from 'react-bootstrap';
import './PortfolioPerformance.css'; // Import the CSS file

export default function PortfolioPerformance(props) {
    return (
        <>
            <Row className="portfolio-performance-container">
                <Col xs={12}>
                    <h5 className="textColor2 mt-3">Portfolio Performance</h5>
                </Col>
                <Col xs={12}>
                    <Table bordered hover className="material-table">
                        <thead>
                            <tr>
                                <th>Metrics</th>
                                <th>Performance</th>
                            </tr>
                        </thead>
                        <tbody >
                            <tr>
                                <td className="bg-white">Portfolio Return</td>
                                <td className={`text-white ${props.calculatedPortfolioReturn > 0 ? 'bg-success' : 'bg-danger'}`}>{(props.calculatedPortfolioReturn * 100).toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td className="bg-white">Portfolio Volatility</td>
                                <td className="bg-secondary">{(props.portfolioVolatility*1).toFixed(2)}</td> {/* Updated */}
                            </tr>
                            <tr>
                                <td className="bg-white">Sharpe Ratio</td>
                                <td className={`text-white ${(((props.calculatedPortfolioReturn-0.06)/(props.portfolioVolatility/100))).toFixed(2) > 1 ? 'bg-success' : 'bg-danger'}`}>{(((props.calculatedPortfolioReturn-0.06)/props.portfolioVolatility)).toFixed(2)}</td> {/* Updated */}
                            </tr>
                            <tr>
                                <td className="bg-white">Treynor Ratio</td>
                                <td className="bg-success text-white">1.2</td> {/* Updated */}
                            </tr>
                            
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </>
    );
}
