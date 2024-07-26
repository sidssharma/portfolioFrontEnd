import { Row, Button, Col } from "react-bootstrap";
import "./PortfolioSaveSection.css";
import { useState, useEffect } from "react";
import SavePortfolioModal from "./SavePortfolioModal";
import LoadPreviousModal from "./LoadPreviousModal";
import { addStock2, allPortfoliosFetch, testingFunction } from "../PortfolioUtils";
import { all } from "axios";

export default function PortfolioSaveSection(props) {
    const [savePortfolioModal, setsavePortfolioModal] = useState(false)
    const [LoadPortfolioModal, setLoadPortfolioModal] = useState(false)
    const[fetchedPortfolios, setFetchedPortfolios] = useState([])
    const[testPortfolioStocks, settestPortfolioStocks] = useState([])
    

    function handleClose(){
        if(savePortfolioModal){
            setsavePortfolioModal(false)
        }else{
            setsavePortfolioModal(true)
        }
    }
    async function LoadPreviousHandle(){
        if(LoadPortfolioModal){
            setLoadPortfolioModal(false)
        }else{
            setLoadPortfolioModal(true)
        }
        const allPortfolios = await allPortfoliosFetch(setFetchedPortfolios)
        setFetchedPortfolios(allPortfolios)
        
        
        
        


        
    }
    async function allPortfolios(name){
        // console.log(props.portfolioStocks)
        
        
    }
    useEffect(() => {
        const fetchPortfolios = async () => {
          try {
            const allPortfolios = await allPortfoliosFetch(setFetchedPortfolios);
            setFetchedPortfolios(allPortfolios);
            
          } catch (error) {
            console.error('Error fetching portfolios:', error);
          }
        };
    
        fetchPortfolios();
      }, []);
    

    return (
        <>
        <Row className="d-flex justify-content-md-end justify-content-sm-start align-items-stretch savePortfolioRow">
            <Col md={3} sm={12} className="d-flex justify-content-center mb-2 mb-md-0">
                <Button className="w-100 backgroundColor1 textColor2 savePortfolio" onClick={handleClose}>
                    Save Portfolio
                </Button>
            </Col>
            <Col md={3} sm={12} className="d-flex justify-content-center mb-2 mb-md-0">
                <Button className="w-100 backgroundColor1 textColor2 savePortfolio">
                    Optimize Portfolio
                </Button>
            </Col>
            <Col md={3} sm={12} className="d-flex justify-content-center">
                <Button className="w-100 backgroundColor1 textColor2 savePortfolio" onClick={LoadPreviousHandle}>
                    Load Previous Portfolio
                </Button>
            </Col>
        </Row>
        <SavePortfolioModal show={savePortfolioModal} handleClose ={()=>setsavePortfolioModal(false)} portfolioStocks={props.portfolioStocks} setsavedPortfolioName={props.setsavedPortfolioName}/>
        <LoadPreviousModal show={LoadPortfolioModal} handleClose ={()=>setLoadPortfolioModal(false)} portfolioStocks={props.portfolioStocks} setsavedPortfolioName={props.setsavedPortfolioName} fetchedPortfolios={fetchedPortfolios} setPortfolioStocks={props.setPortfolioStocks} setportfolioVolatilityReturns={props.setportfolioVolatilityReturns } setloadPortfolio={props.setloadPortfolio}/>
        

        </>
    );
}
