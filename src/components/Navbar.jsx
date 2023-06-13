import { useState } from "react";
import {BrowserRouter, Route, Link} from 'react-router-dom';

export const Navbar =()=> {
    return (
        <>
       <Link to='/Login'>Login</Link>
       <Link to='/profile'>Profile</Link>
        </>
    )
}

export default Navbar;