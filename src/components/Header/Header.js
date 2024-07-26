import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import "./header.css";
import { useNavigate } from 'react-router-dom';
import logo from './logo10.png';


export default function Header(props) {
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
            <Navbar expand="lg" className="backgroundColor1">
                <Container>
                    <Navbar.Brand href="#home" className="textColor2 textStyle">
                        <img src={logo} className="logo" alt="Logo" onClick={homeNavigate} />
                     
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ borderColor: 'white' }} />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#home" className="textColor1" onClick={homeNavigate}>Home</Nav.Link>
                            {props.savedPortfolioName ? (
                                <Nav.Link href="#link" className="text-success">
                                    <b>Current Portfolio: </b>{props.savedPortfolioName}
                                </Nav.Link>
                            ) : (
                                <Nav.Link href="#link" className="textColor1" onClick={createportfolioNavigate}>Create Portfolio</Nav.Link>
                            )}
                        </Nav>
                        {props.authenticated?(<>
                            <Nav.Link href="#user" className="textColor1" onClick={homeNavigate}>Hi, {props.user.username}</Nav.Link>
                        </>):((<Button type="button" className="backgroundColor1 textColor2 loginButton" onClick={loginNavigate}>
                            Login
                        </Button>))}
                        
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}
