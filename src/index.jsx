import React from "react";
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

const Main =()=>{
   return(
   <BrowserRouter>

        <div>
        <Navbar/>

        <Route exact path='/'>
                <Login/>
            </Route>

            <Route exact path='/Login'>
                <Login/>
            </Route>

            <Route exact path='/register'>
                <Register/>
            </Route>

            <Route exact path='/Profile'>
                <Profile/>
            </Route>

        </div>
        
   </BrowserRouter>)
}

ReactDOM.render(<Main/>, document.getElementById('app'))