import { Row, Col, Container, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import heroRectangle from "./rectangle5.png";
import logo2 from "./logo10.png";
import "./heroRectangle.css";

export default function HeroComponent(props) {
    const navigate = useNavigate();

    const goToCreatePortfolio = () => {
        navigate("/createportfolio");
    };

    return (
        <>
            <Container fluid className="pt-5 backgroundColor1 full-height">
                <Row className="align-items-center full-height">
                    <Col xs={12} md={6} className="text-center text-md-start">
                        <img src={logo2} alt="Logo" className="logoImage mb-3" />
                        {/* <p className="display-5 textColor1">Building Wealth<br /> one portfolio at a time</p> */}
                    </Col>
                    <Col xs={12} md={6} className="text-center text-md-start mt-5 mt-md-0">
                        <h5 className="textColor1">
                            Strategic Folios helps you create personalized investment portfolios. 
                            It empowers your financial decisions with data-driven insights and 
                            helps you achieve your goals confidently.
                        </h5>
                        <Button className="mt-3 backgroundColor1 textColor2 loginButton" onClick={goToCreatePortfolio}>
                            Create Portfolio
                        </Button>
                    </Col>
                </Row>
            </Container>
        </>
    );
}
