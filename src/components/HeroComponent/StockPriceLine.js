import React, { useEffect, useState } from 'react';
import './StockPriceLine.css';
import { FaArrowUp } from 'react-icons/fa';

export default function StockPriceLine(props){
  const [startAnimation, setStartAnimation] = useState(false);

  useEffect(() => {
    setStartAnimation(true);
  }, []);
  return(
    <div className="stock-container">
      <div className="top-left">
        <span className="amount">₹2,40,000</span>
        <FaArrowUp className="up-arrow" />
      </div>
      <div className="bottom-left">Portfolio</div>
      <svg className={`stock-line ${startAnimation ? 'animate' : ''}`} viewBox="0 0 500 500">
        <path d="M0 400 Q50 300 100 350 T200 300 T300 200 T400 150 T500 100" className="line-path" />
      </svg>
    </div>
  )
}