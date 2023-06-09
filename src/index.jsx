import React from "react";
import ReactDOM  from "react-dom";
import { useState } from "react";
import { fetchPost, 
   // registerUser
 } from "./client/api";
import {BrowserRouter, Route, Link} from 'react-router-dom';

const cohortName = '2303-ftb-et-web-pt';
const baseUrl = `https://strangers-things.herokuapp.com/api/${cohortName}`;

const Login =()=>{
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useState('');
    //store token to call in profile compoent to view data

    const handleChange = (event) => {
        setUsername(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(username);
        login();
        setUsername("");
        setPassword("");
        console.log(password);
    };

    const login = async () => {

        try {
          const response = await fetch(`${baseUrl}/users/login`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              user: {
                username: username,
                password: password
              }
            })
          });
          const result = await response.json();
          console.log(result);
          return result
        } catch (err) {
          console.error(err);
        }
      }

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
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleChange = (event) => {
        setUsername(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(username);
        registerUser();
        setUsername("");
        setPassword("");
        console.log(password);
    };

    const registerUser = async () => {
        try {
          const response = await fetch(
            `${baseUrl}/users/register`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              user: {
                username: username,
                password: password
              }
            })
          });
          const result = await response.json();
          console.log(result)
          return result
        } catch (err) {
          console.error(err);
        }
      }

    return (
        <div id="container">
            <div id="navbar">Sign Up</div>
            <form onSubmit={handleSubmit}>
                <h1>Create Username</h1>
                <input type="text" placeholder="Username" value={username} onChange={handleChange}></input>
                <h2>Create Password</h2>
                <input type="password" placeholder="Password" value={password} onChange={(event) => {setPassword(event.target.value)}}></input>
                <button type="submit">Create Account</button>
            </form>
        </div>
    );
}

const Profile =()=> {
    const myData = async () => {

        try {
          const response = await fetch(`${baseUrl}/users/me`, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${TOKEN_STRING_HERE}`
            },
          });
          const result = await response.json();
          console.log(result);
          return result
        } catch (err) {
          console.error(err);
        }
      }

    return (
        <div>
            hello
        </div>
    )
}

const Navbar =()=> {
    return (
        <>
       <Link to='/Login'>Login</Link>
       <Link to='/profile'>Profile</Link>
        </>
    )
}

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