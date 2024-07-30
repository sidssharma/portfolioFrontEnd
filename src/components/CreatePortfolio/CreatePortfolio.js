import Header from "../Header/Header";
import { Row, Col } from 'react-bootstrap';
import AddStockSection from "./AddStockSection/AddStockSection.js";
import PortfolioStocks from "./PortfolioStocks.js";
import { useState, useEffect } from "react";
import PortfolioSaveSection from "./PortfolioSaveSection/PortfolioSaveSection.js";
import { useNavigate } from "react-router-dom";
import HeaderNew from "../Header/HeaderNew.js";
import axios from "axios";
import {
    calculateCAGR,
    addStock,
    portfolioReturn,
    calculateVolatility,
    portfolioVolatilityMethod,
    deleteStock,
    savePortfolio
} from "./PortfolioUtils.js";
import "./CreatePortfolio.css";
import WeightageModal from "./AddStockSection/WeightageModal";
import LineChart from "./StockChart/StockChart.js";
import PortfolioPerformance from "./PortfolioPerformance/PortfolioPerformance";

export default function CreatePortfolio(props) {
    const [authenticated, setAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [modalShow, setModalShow] = useState(false);
    const [addedStocks, setAddedStocks] = useState([]);
    const [portfolioStocks, setPortfolioStocks] = useState([]);
    const [currStock, setCurrStocks] = useState();
    const [totalWeightage, setTotalWeightage] = useState(0);
    const [portfolioVolatilityReturnsFinal, setportfolioVolatilityReturnsFinal] = useState([]);
    const [portfolioReturnFinal, setPortfolioReturnFinal] = useState([]);
    const [portfolioDateFinal, setPortfolioDateFinal] = useState([]);
    const [yeartoTake, setYeartoTake] = useState(1);
    const [portfolioVolatilityReturns, setportfolioVolatilityReturns] = useState([]);
    const [portfolioVolatilityWeights, setportfolioVolatilityWeights] = useState([]);
    const [portfolioVolatility, setPortfolioVolatility] = useState();
    const [calculatedPortfolioReturn, setCalculatedPortfolioReturn] = useState("-");
    const [savedPortfolioName, setsavedPortfolioName] = useState("");
    const [loadPortfolio, setloadPortfolio] = useState(false);
    const navigate = useNavigate();
    
    const loginNavigate = () => {
        console.log("Navigating to login page");
        navigate('/login');
    };

    // Function to add a stock to the portfolio
    function addPortfolioStocks(data) {
        const isStockAlreadyAdded = portfolioStocks.some(stock => stock.stockName === data.stockName);
        if (isStockAlreadyAdded) {
            console.log("Stock Already Available");
        } else {
            const totalWeightage = portfolioStocks.reduce((sum, stock) => sum + Number(stock.weightage), 0) + Number(data.weightage);
            if (totalWeightage > 100) {
                console.log("Total weightage exceeds 100");
            } else {
                setPortfolioStocks([...portfolioStocks, data]);
            }
        }
        portfolioReturn({
            tickers: portfolioStocks.map(stock => stock.stockTicker),
            stockWeightage: portfolioStocks.map(stock => stock.weightage / 100),
            startDate: new Date(new Date().setFullYear(new Date().getFullYear() - yeartoTake)).toISOString().split('T')[0],
            endDate: new Date().toISOString().split('T')[0]
        }, setPortfolioDateFinal, setPortfolioReturnFinal);
    }

    // Effect to update total weightage whenever portfolioStocks changes
    useEffect(() => {
        const totalWeightage = portfolioStocks.reduce((sum, stock) => sum + stock.weightage, 0);
        setTotalWeightage(totalWeightage);
        if (totalWeightage > 100) {
            console.log("Weightages exceed 100 after update");
        }
    }, [portfolioStocks]);

    // Effect to log changes to the current stock
    useEffect(() => {
        console.log("stock is changed");
    }, [currStock]);

    // Effect to recalculate portfolio return when portfolioStocks or yeartoTake changes
    useEffect(() => {
        if (portfolioStocks.length > 0) {
            portfolioReturn({
                tickers: portfolioStocks.map(stock => stock.stockTicker),
                stockWeightage: portfolioStocks.map(stock => stock.weightage / 100),
                startDate: new Date(new Date().setFullYear(new Date().getFullYear() - yeartoTake)).toISOString().split('T')[0],
                endDate: new Date().toISOString().split('T')[0]
            }, setPortfolioDateFinal, setPortfolioReturnFinal);
        }
    }, [portfolioStocks, yeartoTake]);

    // Effect to calculate volatility and CAGR when portfolioReturnFinal changes
    useEffect(() => {
        if (portfolioReturnFinal.length > 0) {
            const volta = calculateVolatility(portfolioReturnFinal);
            const returncalc = calculateCAGR(portfolioReturnFinal[0], portfolioReturnFinal[portfolioReturnFinal.length - 1], yeartoTake);
            setCalculatedPortfolioReturn(returncalc);
            console.log("Actual Volatility:" + portfolioVolatility * 100);
        }
    }, [portfolioReturnFinal]);

    // Effect to update volatility weights and calculate portfolio volatility when portfolioStocks or yeartoTake changes
    useEffect(() => {
        if (portfolioStocks.length > 0) {
            const weightages = portfolioStocks.map(stock => stock.weightage / 100);
            setportfolioVolatilityWeights(weightages);
            const psReturns = portfolioVolatilityReturns;
            const psReturnsFinal = portfolioVolatilityReturnsFinal;
            psReturnsFinal.push(psReturns[psReturns.length - 1]);

            setportfolioVolatilityReturnsFinal(psReturnsFinal);
            console.log(portfolioVolatilityReturnsFinal);
            console.log(weightages);
            const testing = portfolioVolatilityMethod(weightages, portfolioVolatilityReturnsFinal);
            console.log(testing);
            setPortfolioVolatility(testing);
        }
    }, [portfolioStocks, yeartoTake]);

    // Effect to fetch historical data and update portfolio volatility
    useEffect(() => {
        async function updatePortfolioVolatility() {
            try {
                const today = new Date().toISOString().split('T')[0];
                let startDate;
                if (yeartoTake === 1) {
                    startDate = new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString().split('T')[0];
                } else if (yeartoTake === 3) {
                    startDate = new Date(new Date().setFullYear(new Date().getFullYear() - 3)).toISOString().split('T')[0];
                } else if (yeartoTake === 5) {
                    startDate = new Date(new Date().setFullYear(new Date().getFullYear() - 5)).toISOString().split('T')[0];
                }

                const historicalDataPromises = portfolioStocks.map(stock =>
                    axios.get("https://strategicfolio.onrender.com/historicalReturns", { params: { ticker: stock.stockTicker, startDate, endDate: today } })
                );

                const historicalDataResponses = await Promise.all(historicalDataPromises);

                const prices = historicalDataResponses.map(response => response.data.map(entry => entry.close));

                const weightages = portfolioStocks.map(stock => stock.weightage / 100);
                const calculatedVolatility = portfolioVolatilityMethod(weightages, prices);
                console.log(prices);

                setPortfolioVolatility(calculatedVolatility);
            } catch (error) {
                console.error("Error fetching historical returns:", error);
            }
        }

        if (portfolioStocks.length > 0) {
            updatePortfolioVolatility();
        }
    }, [yeartoTake, portfolioStocks]);

    // Effect to check user authentication status on component mount
    useEffect(() => {
        async function checkAuth() {
            try {
                const response = await axios.get('https://strategicfolio.onrender.com/check-auth', {
                    withCredentials: true
                });
                if (response.data.authenticated) {
                    setAuthenticated(true);
                    setUser(response.data.user);
                } else {
                    console.log(response);
                    setAuthenticated(false);
                    loginNavigate();
                }
            } catch (err) {
                console.error('Error checking authentication:', err);
                setAuthenticated(false);
                loginNavigate();
            }
        }

        checkAuth();
    }, []);

    useEffect(() => {
        console.log('Authenticated:', authenticated);
    }, [authenticated]);

    return (
        <>
            {authenticated ? (
                <>
                    <HeaderNew savedPortfolioName={savedPortfolioName} authenticated={authenticated} user={user}/>
                    <Row>
                        <Col xs={12} md={3}>
                            <AddStockSection addStock={(stockValues) => addStock(stockValues, setCurrStocks, setportfolioVolatilityReturns, portfolioStocks)} addWeightage={setModalShow} />
                        </Col>
                        <Col xs={12} md={9}>
                            <Row xs={12} md={12}>
                                <Col xs={12} md={9} className="section1">
                                    <LineChart portfolioReturnFinal={portfolioReturnFinal} portfolioDateFinal={portfolioDateFinal} setYeartoTake={setYeartoTake} savedPortfolioName={savedPortfolioName} />
                                </Col>
                                <Col xs={12} md={3} className="section2">
                                    <PortfolioPerformance calculatedPortfolioReturn={calculatedPortfolioReturn} portfolioVolatility={portfolioVolatility} />
                                </Col>
                            </Row>
                            <Row className="sectionClass3" xs={12} md={12}>
                                <Col xs={12}>
                                    <PortfolioSaveSection portfolioStocks={portfolioStocks} savedPortfolioName={savedPortfolioName} setsavedPortfolioName={setsavedPortfolioName} setPortfolioStocks={setPortfolioStocks} setportfolioVolatilityReturnsFinal={setportfolioVolatilityReturnsFinal} setportfolioVolatilityReturns={setportfolioVolatilityReturns} setloadPortfolio={setloadPortfolio} />
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} className="section4">
                                    <PortfolioStocks portfolioStocks={portfolioStocks} deleteStock={deleteStock} setPortfolioStocks={setPortfolioStocks} />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <WeightageModal show={modalShow} handleClose={() => setModalShow(false)} currentStock={currStock} setCurrentStock={setCurrStocks} addPortfolioStocks={addPortfolioStocks} />
                </>
            ) :( <div className="d-flex justify-content-center align-items-center vh-100">
            <h1>User Not Authorized</h1>
        </div>)}
        </>
    );
}
