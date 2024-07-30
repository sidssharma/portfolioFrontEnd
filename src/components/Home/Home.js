import Header from '../Header/Header';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Herocomponent from '../HeroComponent/herocomponent';
import "./home.css"
import HeaderNew from '../Header/HeaderNew';
import HeroComponentNew from '../HeroComponent/HeroComponentNew';


function Home() {
  
  return (
    <div className="App mainClass">
      <HeaderNew/>
      {/* <Herocomponent/> */}
      <HeroComponentNew/>
    </div>
  );
}

export default Home;
