import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { savePortfolio } from '../PortfolioUtils';

export default function SavePortfolioModal(props){
       
const [portfolioName, setPortfolioName] = useState('');
const [portfolioDesc, setPortfolioDesc] = useState('');
const[isPortfolioexist, setisPortfolioexist]=useState(false);


async function savePortfolioandStocks(name){
    // console.log(props.portfolioStocks)
    savePortfolio(portfolioName,portfolioDesc,props.portfolioStocks,setisPortfolioexist, props.handleClose, props.setsavedPortfolioName)
    
    
}

return (
    <>
        <Modal show={props.show} onHide={props.handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Save Portfolio</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p>Portfolio Name</p>
                <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Add Portfolio Name"
                    aria-describedby="basic-addon1"
                    value={portfolioName}
                    onChange={(e) => setPortfolioName(e.target.value)}
                />
                <p>Portfolio Description</p>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Add Portfolio Description"
                    aria-describedby="basic-addon1"
                    value={portfolioDesc}
                    onChange={(e) => setPortfolioDesc(e.target.value)}
                />
                {isPortfolioexist?<p className='text-danger mt-3'>Portfolio Name exists</p>:<p></p>}
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleClose}>
                    Close
                </Button>
                <Button
                    variant="primary"
                    onClick={() => {
                        savePortfolioandStocks(portfolioName); // Ensure weight is parsed as a float
                    }}
                >
                    Save Name
                </Button>
            </Modal.Footer>
        </Modal>



        </>
    )
}