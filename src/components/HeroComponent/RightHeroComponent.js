import "./RightHeroComponent.css"; // Ensure to create this CSS file for styling
import Rectangle from "./rectangle.png";
import StockPriceLine from "./StockPriceLine";
import Hand from "./hand.jpeg"
import NumberofStocks from "./NumberofStocks";
export default function RightHeroComponent(props) {
    return (
        <div className="rightHeroComponent">
            <div className="gridContainer">
                <img src={Hand} alt="Image 1" className="gridItem" />
                
                {/* <img src={Rectangle}  alt="Image 3" className="gridItem" /> */}
                {/* <img src={Rectangle}  alt="Image 3" className="gridItem" /> */}
                <NumberofStocks className="gridItem"/>
                <StockPriceLine className="gridItem" />
                <img src={Rectangle}  alt="Image 2" className="gridItem" />
                
            </div>
        </div>
    );
}
