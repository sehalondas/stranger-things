import React, { useEffect } from "react";
import ReactDOM  from "react-dom";
import { useState } from "react";
import { fetchPost, 
   // registerUser
 } from "./client/api";
import {BrowserRouter, Route, Link} from 'react-router-dom';
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import Navbar from "./components/Navbar";
import Posts from "./components/Posts";

const Main =()=>{
    const [token, setToken] = useState('');

    useEffect(()=>{
        const storedToken = localStorage.getItem('token');
        if(storedToken) {
            setToken(storedToken);
        }
    }, [])

   return(
   <BrowserRouter>

        <div>
        <Navbar/>

        <Route exact path='/'>
                <Posts/>
            </Route>

            <Route exact path='/Login'>
                <Login setToken={setToken}/>
            </Route>

            <Route exact path='/register'>
                <Register/>
            </Route>

            <Route exact path='/Profile'>
                <Profile token={token}/>
            </Route>

            <Route exact path='/Posts'>
                <Posts token={token} />
            </Route>

        </div>
        
   </BrowserRouter>)
}

ReactDOM.render(<Main/>, document.getElementById('app'))