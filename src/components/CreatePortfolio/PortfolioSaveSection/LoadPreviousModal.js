import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Table } from 'react-bootstrap';
import axios from 'axios';
import { addStock2, allPortfoliosFetch, allStockinPortfolio, testingFunction } from '../PortfolioUtils';
import "./LoadPreviousModal.css";

export default function SavePortfolioModal(props){
       
const [portfolioName, setPortfolioName] = useState('');
const [portfolioDesc, setPortfolioDesc] = useState('');
const[isPortfolioexist, setisPortfolioexist]=useState(false);
const [allStockschange, setallStockschange]=useState([])


var datanew = []
const data = [
    {id: 2, name:"something"},
    {id:3, name:"something2"}

]

async function updateStocks(id,name) {
    try {
        console.log("Props portfolio stocks:", props.portfolioStocks);
        console.log("Portfolio ID:", id);

        const allstocks = await allStockinPortfolio(id);
        const updatedStocks = [];

        for (const element of allstocks) {
            console.log("Processing stock:", element.ticker);
            const datatopush = await addStock2(element.ticker, element.weightage);
            console.log("Data to push:", datatopush);
            updatedStocks.push(datatopush);
        }

        console.log("Updated stocks:", updatedStocks);

        // Update state once with all the gathered data
        setallStockschange(updatedStocks);
        props.setsavedPortfolioName(name)
        props.handleClose()

    } catch (error) {
        console.error("Error updating stocks:", error);
    }
}


useEffect(() => {
    // const testData = {
    //     "stockName": "Apollo Hospitals Enterprise Ltd.",
    //     "stockTicker": "APOLLOHOSP",
    //     "price": 6402.15,
    //     "oneYear": 0.23574547231515752,
    //     "threeYear": 0.1777521054963307,
    //     "fiveYear": 0.3619934777677263,
    //     "weightage": 20,
    //     "id": 317
    // }
    // const datatest = []
    // datatest.push(testData)
    // props.setPortfolioStocks(datatest)
    // props.setloadPortfolio(true)
    console.log(allStockschange)
    // props.setPortfolioStocks([])
    console.log(props.portfolioStocks)
    props.setPortfolioStocks(allStockschange)
    
    


}, [allStockschange]);






return (
    <>
        <Modal show={props.show} onHide={props.handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Previous Portfolios</Modal.Title>
            </Modal.Header>

            <Modal.Body>
            <Table bordered hover className="table">
                        <thead>
                            <tr>
                                <th>Portfolio Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.fetchedPortfolios.map((element) => (
                                <tr key={element.id} className="custom-row" onClick={()=>{updateStocks(element.id, element.name)}}>
                                    <td>{element.name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleClose}>
                    Close
                </Button>
                <Button
                    variant="primary"
                    
                >
                    Save Name
                </Button>
            </Modal.Footer>
        </Modal>



        </>
    )
}