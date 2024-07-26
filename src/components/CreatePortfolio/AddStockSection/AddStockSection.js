import React, { useState, useEffect } from 'react';
import { Container, InputGroup, Form, Row, Col } from 'react-bootstrap';
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import WeightageModal from './WeightageModal';

import addIcon from "./add.svg"

import "./addStockSection.css"

export default function AddStockSection(props) {
    const [hoveredRow, setHoveredRow] = useState(null);
    const [stocks, setStocks] = useState([]);
    const [currentStocktoAdd, setStocktoadd] = useState();

    useEffect(() => {
        async function stockList() {
            try {
                const response = await axios.get("http://localhost:3000/stocklist",{ withCredentials:true});
                const fetchedData = response.data;
                setStocks(fetchedData);
            } catch (err) {
                console.log(err);
            }
        }
        stockList();
    }, []);

    return (
        <>
            <Container className="wholeSection">
                <Row>
                    <Col lg={12}>
                        <div>
                            <InputGroup className="mb-3 mt-3">
                                <Form.Control
                                    placeholder="Search Stocks"
                                    aria-label="Search"
                                    aria-describedby="basic-addon1"
                                />
                                <InputGroup.Text id="basic-addon1">Search</InputGroup.Text>
                            </InputGroup>
                        </div>
                    </Col>
                </Row>
                <div className="stockClusterParent">
                    {stocks.map((stock, index) => (
                        <Row
                            key={index}
                            className="stockCluster mt-2"
                            onMouseOver={() => setHoveredRow(index)}
                            onMouseLeave={() => setHoveredRow(null)}
                            style={{ backgroundColor: hoveredRow === index ? '#a5a4a4' : '' }}
                        >
                            <Col xs={8} sm={6} className="stockName">
                                {stock.name}
                            </Col>
                            <Col xs={2} sm={4} className="stockPrice">
                                ₹{stock.price}
                            </Col>
                            <Col xs={2}>
                                <img
                                    src={addIcon}
                                    className="addIcon"
                                    alt="Add icon"
                                    onClick={async () => {
                                        await props.addStock({ stockName: stock.name, stockTicker: stock.ticker, price: stock.price, id: stock.id });
                                        props.addWeightage(true);
                                    }}
                                />
                            </Col>
                        </Row>
                    ))}
                </div>
            </Container>
        </>
    );
}
