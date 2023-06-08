import React from "react";
import ReactDOM  from "react-dom";
import { fetchPost } from "./client/api";

const Test =()=>{
    return <div>Hello</div>
}

// fetchPost()

ReactDOM.render(<Test/>, document.getElementById('app'))