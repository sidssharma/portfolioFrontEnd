import Table from 'react-bootstrap/Table';
import trashIcon from "./trash.svg";
import { useState, useEffect } from "react";

export default function PortfolioStocks(props) {
    const [idCounter, setIdCounter] = useState(1);

    // Function to increment idCounter
    const addCounter = () => {
        setIdCounter(idCounter + 1);
    }

    function deleteFunction(id) {
        const allStocks = props.portfolioStocks;
        const updatedStocks = allStocks.filter(element => element.id !== id);
        props.setPortfolioStocks(updatedStocks);
    }

    return (
        <>
            <Table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Stock Name</th>
                        <th scope="col">Stock Symbol</th>
                        <th scope="col">Current Price</th>
                        <th scope="col">Weightage</th>
                        <th scope="col">1Y Returns</th>
                        <th scope="col">2Y Returns</th>
                        <th scope="col">5Y Returns</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {props.portfolioStocks.map((element, index) => (
                        <tr key={index}>
                            <th scope="row">{idCounter + index}</th>
                            <td>{element.stockName}</td>
                            <td>{element.stockTicker}</td>
                            <td>₹{element.price}</td>
                            <td>{element.weightage}%</td>
                            <td>{(element.oneYear * 100).toFixed(2)}%</td>
                            <td>{(element.threeYear * 100).toFixed(2)}%</td>
                            <td>{(element.fiveYear * 100).toFixed(2)}%</td>
                            <td><img src={trashIcon} alt="Delete" onClick={() => { deleteFunction(element.id) }} /></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
}
