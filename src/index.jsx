import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { useState } from "react";
import {
  fetchPost,
  // registerUser
} from "./client/api";
import { BrowserRouter, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import Navbar from "./components/Navbar";
import Posts from "./components/Posts";
import AddPost from "./components/AddPost";
import EditPost from "./components/EditPost";


const Main = () => {
  const [token, setToken] = useState("");
  const [postIdNum, setPostIdNum] =useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return (
    <BrowserRouter>
      <div>
        <Navbar />

        <Route exact path="/">
          <Login setToken={setToken} />
        </Route>

        <Route exact path="/Login">
          <Login setToken={setToken} />
        </Route>

        <Route exact path="/Register">
          <Register />
        </Route>

        <Route exact path="/Profile">
          <Profile token={token} postIdNum={postIdNum} setPostIdNum={setPostIdNum}/>
        </Route>

        <Route exact path="/Posts">
          <Posts token={token} />
        </Route>

        <Route exact path="/Posts/Add">
            <AddPost token={token}/>
        </Route>

        <Route exact path="/Posts/Edit">
            <EditPost token={token} setPostIdNum={setPostIdNum} postIdNum={postIdNum}/>
        </Route>
      </div>
    </BrowserRouter>
  );
};

ReactDOM.render(<Main />, document.getElementById("app"));
