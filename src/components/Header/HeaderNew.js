import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import "./headerNew.css";
import { useNavigate } from 'react-router-dom';
import logo from './logo10.png';


export default function HeaderNew(props) {
    const navigate = useNavigate()
    function loginNavigate(){
        
        navigate("/login")
    }
    function homeNavigate(){
        navigate("/")
    }
    function createportfolioNavigate(){
        navigate("/createportfolio")
    }
    
    return (
        <>
            <Navbar expand="lg" className="">
                <Container>
                    <Navbar.Brand href="https://sidssharma.github.io/portfolioFrontEnd/#/" className="logoHeading fontFamily bold fontColor">
                        SmartFolio
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ borderColor: 'white' }} />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="https://sidssharma.github.io/portfolioFrontEnd/#/" className="fontFamily fontColor" onClick={homeNavigate}>Home</Nav.Link>
                            {props.savedPortfolioName ? (
                                <Nav.Link href="#link" className="text-success">
                                    <b>Current Portfolio: </b>{props.savedPortfolioName}
                                </Nav.Link>
                            ) : (
                                <><Nav.Link href="#link" className="fontColor fontFamily" onClick={createportfolioNavigate}>Create Portfolio</Nav.Link>
                                <Nav.Link href="#link" className="fontColor fontFamily" onClick={createportfolioNavigate}>Contact Us</Nav.Link>
                                </>
                            )}
                        </Nav>
                        {props.authenticated?(<>
                            <Nav.Link href="#user" className="fontColor fontFamily" onClick={homeNavigate}>Hi, {props.user.username}</Nav.Link>
                        </>):(<><Nav.Link className="fontColor fontFamily" onClick={loginNavigate}>Login</Nav.Link>
                        <Button type="button" className="signUpButton" onClick={loginNavigate}>
                            Sign Up
                        </Button> 
                        
                        </>)}
                        
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}
