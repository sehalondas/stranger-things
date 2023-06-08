import React from "react";
import ReactDOM  from "react-dom";
import { fetchPost } from "./client/api";
import {BrowserRouter, route, link} from 'react-router-dom';

const Login =()=>{
    return <div>
        <form>
        <h1>Log In</h1>
        <input type="text" placeholder="Username"></input>
        </form>
    </div>
}

const Main =()=>{
   return(
   <BrowserRouter>
        <Login/>
   </BrowserRouter>)
}

ReactDOM.render(<Main/>, document.getElementById('app'))