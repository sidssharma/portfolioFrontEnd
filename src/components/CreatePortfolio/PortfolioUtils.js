// Importing axios for making HTTP requests
import axios from "axios";

/**
 * Calculates the Compound Annual Growth Rate (CAGR) between two values over a period.
 * 
 * @param {number} beginningValue - The initial value at the start of the period.
 * @param {number} endingValue - The final value at the end of the period.
 * @param {number} numberOfYears - The number of years over which the growth is calculated.
 * @returns {number} - The CAGR expressed as a decimal.
 * @throws {Error} - Throws an error if any input value is zero or negative.
 */
export function calculateCAGR(beginningValue, endingValue, numberOfYears) {
    if (beginningValue <= 0 || endingValue <= 0 || numberOfYears <= 0) {
        throw new Error("All values must be greater than zero.");
    }
    return Math.pow((endingValue / beginningValue), (1 / numberOfYears)) - 1;
}

/**
 * Adds a stock to the portfolio by fetching its historical returns and calculating its performance metrics.
 * 
 * @param {object} stockValues - Object containing stock details such as name, ticker, and price.
 * @param {function} setCurrStocks - Function to set the current stock data.
 * @param {function} setPortfolioVolatilityReturns - Function to update the portfolio volatility returns data.
 * @param {Array} portfolioStocks - Array of stocks currently in the portfolio.
 */
export async function addStock(stockValues, setCurrStocks, setPortfolioVolatilityReturns, portfolioStocks) {
    try {
        // Get today's date and dates for 1, 3, and 5 years ago
        const today = new Date().toISOString().split('T')[0];
        const oneyearBack = new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString().split('T')[0];
        const threeyearBack = new Date(new Date().setFullYear(new Date().getFullYear() - 3)).toISOString().split('T')[0];
        const fiveyearBack = new Date(new Date().setFullYear(new Date().getFullYear() - 5)).toISOString().split('T')[0];

        // Fetch historical returns for the stock over different time periods
        const [oneYearReturns, threeYearReturns, fiveYearReturns] = await Promise.all([
            axios.get("https://strategicfolio.onrender.com/historicalReturns", { params: { ticker: stockValues.stockTicker, startDate: oneyearBack, endDate: today } }),
            axios.get("https://strategicfolio.onrender.com/historicalReturns", { params: { ticker: stockValues.stockTicker, startDate: threeyearBack, endDate: today } }),
            axios.get("https://strategicfolio.onrender.com/historicalReturns", { params: { ticker: stockValues.stockTicker, startDate: fiveyearBack, endDate: today } })
        ]);

        // Calculate CAGR for the stock over different time periods
        const oneYearReturnsincent = calculateCAGR(oneYearReturns.data[0].close, oneYearReturns.data[oneYearReturns.data.length - 1].close, 1);
        const threeYearReturnsincent = calculateCAGR(threeYearReturns.data[0].close, threeYearReturns.data[threeYearReturns.data.length - 1].close, 3);
        const fiveYearReturnsincent = calculateCAGR(fiveYearReturns.data[0].close, fiveYearReturns.data[fiveYearReturns.data.length - 1].close, 5);

        // Create a new stock object with calculated metrics
        const currentStock = {
            stockName: stockValues.stockName,
            stockTicker: stockValues.stockTicker,
            price: stockValues.price,
            oneYear: oneYearReturnsincent,
            threeYear: threeYearReturnsincent,
            fiveYear: fiveYearReturnsincent,
            weightage: 0,
            id: stockValues.id
        };

        // Check if the stock is already in the portfolio
        const isStockAlreadyAdded = portfolioStocks.some(stock => stock.stockName === currentStock.stockName);

        if (!isStockAlreadyAdded) {
            // If not already added, update the current stock and portfolio volatility returns
            setCurrStocks(currentStock);
            const stocktoAdd = oneYearReturns.data.map(data => data.close);
            setPortfolioVolatilityReturns(prevReturns => [...prevReturns, stocktoAdd]);
        } else {
            return "Stock Already Available"; // Return a message if the stock is already in the portfolio
        }
    } catch (error) {
        console.error("Error fetching historical returns:", error); // Log any errors that occur during the data fetch
    }
}

/**
 * Formats a date string into 'YYYY-MM-DD' format.
 * 
 * @param {string} dateString - The date string to format.
 * @returns {string} - The formatted date string.
 */
export function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so add 1
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

/**
 * Fetches the portfolio return data from the server and updates state variables.
 * 
 * @param {object} data - Object containing portfolio and stock data for the request.
 * @param {function} setPortfolioDateFinal - Function to update the final portfolio dates.
 * @param {function} setPortfolioReturnFinal - Function to update the final portfolio returns.
 */
export async function portfolioReturn(data, setPortfolioDateFinal, setPortfolioReturnFinal) {
    const result = await axios.post("https://strategicfolio.onrender.com/portfolioReturns", data);
    const newdate = result.data.map(element => formatDate(element.date)); // Format dates
    const stockPrice = result.data.map(element => element["Portfolio Sum"]); // Extract portfolio return values

    setPortfolioDateFinal(newdate);
    setPortfolioReturnFinal(stockPrice);
}

/**
 * Calculates the volatility of a stock based on daily prices.
 * 
 * @param {Array<number>} dailyPrices - Array of daily closing prices.
 * @returns {number} - The annualized volatility of the stock.
 */
export function calculateVolatility(dailyPrices) {
    let dailyReturns = [];
    for (let i = 1; i < dailyPrices.length; i++) {
        // Calculate daily returns as percentage changes
        dailyReturns.push((dailyPrices[i] - dailyPrices[i - 1]) / dailyPrices[i - 1]);
    }

    // Calculate the mean return
    let meanReturn = dailyReturns.reduce((acc, curr) => acc + curr, 0) / dailyReturns.length;

    // Calculate the variance of returns
    let variance = dailyReturns.reduce((acc, curr) => acc + Math.pow(curr - meanReturn, 2), 0) / (dailyReturns.length - 1);

    // Calculate the standard deviation (volatility)
    let standardDeviation = Math.sqrt(variance);

    // Assume 252 trading days in a year and annualize the volatility
    let tradingDays = dailyPrices.length - 1;
    let annualizedVolatility = standardDeviation * Math.sqrt(tradingDays);

    return annualizedVolatility;
}

/**
 * Calculates the returns for a stock based on its historical prices.
 * 
 * @param {Array<Array<number>>} prices - Nested array of historical prices for multiple stocks.
 * @returns {Array<Array<number>>} - Array of arrays with returns for each stock.
 */
export function calculateReturns(prices) {
    if (!prices || prices.length === 0) {
        return [];
    }

    return prices.map((stockPrices) => {
        if (!stockPrices || stockPrices.length < 2) {
            return [];
        }

        return stockPrices.slice(1).map((price, index) =>
            (price - stockPrices[index]) / stockPrices[index]
        );
    });
}

/**
 * Calculates the portfolio volatility based on the weights of stocks and their historical returns.
 * 
 * @param {Array<number>} weights - Array of weights for each stock in the portfolio.
 * @param {Array<Array<number>>} prices - Nested array of historical prices for each stock.
 * @param {number} [tradingDays=252] - Number of trading days in a year, default is 252.
 * @returns {number} - The annualized volatility of the portfolio expressed as a percentage.
 * @throws {Error} - Throws an error if prices data is empty or undefined.
 */
export function portfolioVolatilityMethod(weights, prices, tradingDays = 252) {
    if (!prices || prices.length === 0) {
        throw new Error('Prices data is empty or undefined');
    }

    const returns = calculateReturns(prices);
    const numStocks = weights.length;
    const numPeriods = returns[0].length;

    // Calculate mean returns for each stock
    const meanReturns = returns.map(stockReturns =>
        stockReturns.reduce((acc, ret) => acc + ret, 0) / numPeriods
    );

    // Calculate the covariance matrix
    const covMatrix = Array.from({ length: numStocks }, () => Array(numStocks).fill(0));

    for (let i = 0; i < numStocks; i++) {
        for (let j = 0; j < numStocks; j++) {
            let cov = 0;
            for (let k = 0; k < numPeriods; k++) {
                cov += (returns[i][k] - meanReturns[i]) * (returns[j][k] - meanReturns[j]);
            }
            covMatrix[i][j] = cov / (numPeriods - 1);
        }
    }

    // Calculate the portfolio variance
    let portfolioVar = 0;

    for (let i = 0; i < numStocks; i++) {
        for (let j = 0; j < numStocks; j++) {
            portfolioVar += weights[i] * weights[j] * covMatrix[i][j];
        }
    }

    // Annualize the portfolio volatility
    return Math.sqrt(portfolioVar) * 100 * Math.sqrt(tradingDays);
}

/**
 * Deletes a stock from the portfolio based on its ID.
 * 
 * @param {number} id - The ID of the stock to delete.
 * @param {Array<object>} portfolioStocks - Array of stocks currently in the portfolio.
 * @param {function} setPortfolioStocks - Function to update the portfolio stocks.
 */
export async function deleteStock(id, portfolioStocks, setPortfolioStocks) {
    console.log(id);
    console.log(portfolioStocks);
    // Implementation pending
}

/**
 * Saves the current portfolio to the server, including its stocks and metadata.
 * 
 * @param {string} portfolioName - Name of the portfolio.
 * @param {string} portfolioDesc - Description of the portfolio.
 * @param {Array<object>} portfolioStocks - Array of stocks in the portfolio.
 * @param {function} setisPortfolioexist - Function to set the existence status of the portfolio.
 * @param {function} handleClose - Function to close the save portfolio dialog.
 * @param {function} setsavedPortfolioName - Function to set the saved portfolio name.
 */
export async function savePortfolio(portfolioName, portfolioDesc, portfolioStocks, setisPortfolioexist, handleClose, setsavedPortfolioName) {
    console.log("Portfolio Name is " + portfolioStocks);
    const tickers = portfolioStocks.map(element => ({
        stockId: element.stockTicker,
        stockWeightage: element.weightage
    }));
    console.log(tickers);

    const data = {
        user_id: "1",
        name: portfolioName,
        desc: portfolioDesc
    };
    try {
        const response = await axios.post("https://strategicfolio.onrender.com/createPortfolio", data, { withCredentials: true });
        if (response.data.existingPortfolio) {
            console.log(response.data.existingPortfolio);
            setisPortfolioexist(true);
        } else {
            setisPortfolioexist(false);
            console.log(response.data.id);
            const portfolioidnew = response.data.id;
            try {
                const data2 = {
                    tickers: tickers,
                    portfolioId: portfolioidnew
                };
                console.log(data2);
                const response2 = await axios.post("https://strategicfolio.onrender.com/addStockToPortfolio2", data2, { withCredentials: true });
                console.log(response2);
                setsavedPortfolioName(portfolioName);
                handleClose();
            } catch (err2) {
                console.log(err2);
            }
        }
    } catch (err) {
        console.log(err);
    }
}

/**
 * Fetches all portfolios for the current user.
 * 
 * @returns {Array<object>} - Array of portfolio data.
 */
export async function allPortfoliosFetch() {
    const tobeExported = "this worked";
    const response = await axios.get("https://strategicfolio.onrender.com/getPortfolios", { withCredentials: true });
    console.log(response.data);
    return response.data;
}

/**
 * Fetches all stocks in a specific portfolio based on its ID.
 * 
 * @param {number} portid - The ID of the portfolio.
 * @returns {Array<object>} - Array of stocks in the portfolio.
 * @throws {Error} - Throws an error if the request fails.
 */
export async function allStockinPortfolio(portid) {
    try {
        const response = await axios.get("https://strategicfolio.onrender.com/getPortfolioStocks", {
            params: { id: portid },
            withCredentials: true
        });
        console.log(response.data);
        return response.data; // Return the data if you need to use it
    } catch (err) {
        console.log(err);
        throw err; // Optional: throw error if you want to handle it in the calling code
    }
}

/**
 * Tests fetching stock details based on ticker symbol.
 * 
 * @param {string} ticker - The ticker symbol of the stock to test.
 */
export async function testingFunction(ticker) {
    const stockList = await axios.get("https://strategicfolio.onrender.com/stocklist", { withCredentials: true });
    for (var i = 0; i < stockList.data.length; i++) {
        if (stockList.data[i].ticker === ticker) {
            console.log(stockList.data[i].name);
        }
    }
}

/**
 * Adds a stock to the portfolio based on its ticker and weightage.
 * 
 * @param {string} ticker - The ticker symbol of the stock to add.
 * @param {number} weightageset - The weightage of the stock in the portfolio.
 * @returns {object} - The stock object with calculated metrics.
 */
export async function addStock2(ticker, weightageset) {
    console.log(ticker);
    try {
        // Fetch the list of stocks from the server
        const stockListResponse = await axios.get("https://strategicfolio.onrender.com/stocklist", { withCredentials: true });
        const stockList = stockListResponse.data;

        let stockName = "";
        let id = "";
        let price = "";
        let stockTicker = "";

        // Find the stock in the stockList
        const stock = stockList.find(stock => stock.ticker === ticker);
        if (!stock) {
            console.error("Stock not found in the stock list.");
            return;
        }

        stockName = stock.name;
        id = stock.id;
        price = stock.price;
        stockTicker = stock.ticker;

        // Get today's date and dates for 1, 3, and 5 years ago
        const today = new Date().toISOString().split('T')[0];
        const oneyearBack = new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString().split('T')[0];
        const threeyearBack = new Date(new Date().setFullYear(new Date().getFullYear() - 3)).toISOString().split('T')[0];
        const fiveyearBack = new Date(new Date().setFullYear(new Date().getFullYear() - 5)).toISOString().split('T')[0];

        // Fetch historical returns for the stock over different time periods
        const [oneYearReturnsResponse, threeYearReturnsResponse, fiveYearReturnsResponse] = await Promise.all([
            axios.get("https://strategicfolio.onrender.com/historicalReturns", { params: { ticker: stockTicker, startDate: oneyearBack, endDate: today } }),
            axios.get("https://strategicfolio.onrender.com/historicalReturns", { params: { ticker: stockTicker, startDate: threeyearBack, endDate: today } }),
            axios.get("https://strategicfolio.onrender.com/historicalReturns", { params: { ticker: stockTicker, startDate: fiveyearBack, endDate: today } })
        ]);

        const oneYearReturns = oneYearReturnsResponse.data;
        const threeYearReturns = threeYearReturnsResponse.data;
        const fiveYearReturns = fiveYearReturnsResponse.data;

        // Calculate CAGR for the stock over different time periods
        const oneYearReturnsincent = calculateCAGR(oneYearReturns[0].close, oneYearReturns[oneYearReturns.length - 1].close, 1);
        const threeYearReturnsincent = calculateCAGR(threeYearReturns[0].close, threeYearReturns[threeYearReturns.length - 1].close, 3);
        const fiveYearReturnsincent = calculateCAGR(fiveYearReturns[0].close, fiveYearReturns[fiveYearReturns.length - 1].close, 5);

        // Create a new stock object with calculated metrics and the given weightage
        const currentStock = {
            stockName: stockName,
            stockTicker: stockTicker,
            price: price,
            oneYear: oneYearReturnsincent,
            threeYear: threeYearReturnsincent,
            fiveYear: fiveYearReturnsincent,
            weightage: weightageset,
            id: id
        };

        console.log("Check this currentStock");
        console.log(currentStock);
        return currentStock;
    } catch (error) {
        console.error("Error fetching historical returns:", error); // Log any errors that occur during the data fetch
    }
}
