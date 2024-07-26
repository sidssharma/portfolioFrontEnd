import axios from "axios";
import { useEffect } from "react";
export default function Test(){
    useEffect(() => {
        async function checkAuth() {
            try {
                const response = await axios.get('https://strategicfolio.onrender.com/testing', {
                    withCredentials: true
                });
                if (response.data.authenticated) {
                    console.log(response)
                } else {
                    console.log(response);
                   
                    
                }
            } catch (err) {
                console.error('Error checking authentication:', err);
                
            }
        }

        checkAuth();
    }, []);
    return(
        <>
        <h1>
            somethign

        </h1>
        </>
    )
}