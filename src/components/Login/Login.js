import React, { useEffect, useState } from 'react';
import { Button, Spinner, Container, Row, Col } from 'react-bootstrap';
import './Login.css'; // Import custom CSS for additional styling
import Header from '../Header/Header';

export default function Login(props) {
   const googleAuth = () => {
       window.open("https://strategicfolio.onrender.com/auth/google/", "_self");
   };

   const [isLoggedIn, setIsLoggedIn] = useState(null);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
       const checkSession = async () => {
           try {
               const response = await fetch('https://strategicfolio.onrender.com/check-auth', {
                   credentials: 'include',
               });

               if (!response.ok) {
                   throw new Error('Network response was not ok');
               }

               const data = await response.json();
               setIsLoggedIn(data.loggedIn);
               setLoading(false);
           } catch (error) {
               console.error('Error checking session:', error);
               setIsLoggedIn(false);
               setLoading(false);
           }
       };

       checkSession();
   }, []);

   if (loading) {
       return (
           <div className="loading-container">
               <Spinner animation="border" variant="primary" />
           </div>
       );
   }

   if (isLoggedIn) {
       return (
           <div className="logged-in-message">
               <h2>Welcome back!</h2>
           </div>
       );
   }

   return (
    <>
    <Header/>
       <Container className="login-container">
        
           <Row className="justify-content-md-center">
               <Col md="auto">
                   <div className="login-box">
                       <h2 className="login-title">Sign in to Your Account</h2>
                       <Button 
                           variant="primary" 
                           size="lg" 
                           onClick={googleAuth} 
                           className="google-button"
                       >
                           <img 
                               src="https://img.icons8.com/color/16/000000/google-logo.png" 
                               alt="Google icon" 
                               className="google-icon" 
                           />
                           Sign in with Google
                       </Button>
                   </div>
               </Col>
           </Row>
       </Container>
       </>
   );
}
