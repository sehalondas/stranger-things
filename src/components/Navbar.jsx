import { useState } from "react";
import {BrowserRouter, Route, Link} from 'react-router-dom';

export const Navbar =()=> {
    const logOut=()=>{
        localStorage.removeItem('token');
    }
    return (
        <>
       <Link to='/Login'>Login</Link>
       <Link to='/profile'>Profile</Link>
       <Link to='/Posts'>Posts</Link>
        </>
    )
}

export default Navbar;