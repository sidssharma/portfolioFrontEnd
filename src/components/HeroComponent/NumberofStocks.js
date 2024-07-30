import React, { useEffect, useState } from 'react';
import {FaSync } from 'react-icons/fa';
import "./NumberofStocks.css"
export default function NumberofStocks(props){
    const [startAnimation, setStartAnimation] = useState(false);

  useEffect(() => {
    setStartAnimation(true);
  }, []);

  return (
    <div className="portfolio-container">
      <div className={`portfolio-subcontainer ${startAnimation ? 'animate' : ''}`}>
        <h1 className="numberStockHeading">
          50+ Stocks
        </h1>
        <h1 className="numberStockSubHeading">400+ Active Users</h1>
        <FaSync className="rotating-icon" />
      </div>
    </div>
  )

}