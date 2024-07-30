import "./LeftComponent.css"
import { Button } from "react-bootstrap"
import { useNavigate } from 'react-router-dom';
export default function LeftHeroComponent(props){
    const navigate = useNavigate()
    function createportfolioNavigate(){
        navigate("/createportfolio")
    }
    return(
        <>
        <div className="leftHeroComponent">
        <h5 className="fontFamily fontColor tryHeading">TRY IT NOW!</h5>
        <h1 className="fontFamily fontColor changeHeading ">Change the way<br/> you create equity<br/> <i><div className="italic">portfolios</div></i></h1>
        <p className="leftHeadlinePara">Transform your investment strategy with SmartFolio. Our platform empowers investors to create, manage, and optimize portfolios effortlessly. With advanced analytics and personalized insights, you can achieve smarter, more profitable decisions.</p>
        <Button className="createPortfolioButton" onClick={()=>{createportfolioNavigate()}}>Create Portfolio!</Button>
        </div>
        </>
    )
}