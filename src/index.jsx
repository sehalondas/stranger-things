import React from "react";
import ReactDOM  from "react-dom";
import { useState } from "react";
import { fetchPost, registerUser } from "./client/api";
import {BrowserRouter, Route, Link} from 'react-router-dom';

const Login =()=>{
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const handleChange = (event) => {
        setUsername(event.target.value);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(username);
        setUsername("");
        setPassword("");
        console.log(password);
    };
    return (
        <div id="container">
            <div id="navbar">Login</div>
            <form onSubmit={handleSubmit}>
                <h1>Log In</h1>
                <input type="text" placeholder="Username" value={username} onChange={handleChange}></input>
                <h2>Password</h2>
                <input type="password" placeholder="Password" value={password} onChange={(event) => {setPassword(event.target.value)}}></input>
                <button type="submit">Log In</button>
                <Link to="/register">Don't have an account? Sign up!</Link>
            </form>
        </div>
    );
}

const Register =()=>{
    return (
        <div id="container">
            <div id="navbar">Sign Up</div>
            <form>
                <h1>Create Username</h1>
                <input type="text" placeholder="Username"></input>
                <h2>Create Password</h2>
                <input type="password" placeholder="Password"></input>
                <button type="submit">Create Account</button>
            </form>
        </div>
    );
}

const Main =()=>{
   return(
   <BrowserRouter>

        <div>
            <Route path='/Login'>
                <Login/>
            </Route>
            <Route path='/register'>
                <Register/>
            </Route>
        </div>
        
   </BrowserRouter>)
}

ReactDOM.render(<Main/>, document.getElementById('app'))