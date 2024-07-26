import Header from '../Header/Header';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Herocomponent from '../HeroComponent/herocomponent';
import "./home.css"


function Home() {
  
  return (
    <div className="App mainClass">
      <Header/>
      <Herocomponent/>
    </div>
  );
}

export default Home;
