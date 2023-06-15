import { useEffect, useState } from "react";
import {BrowserRouter, Route, Link} from 'react-router-dom';

const cohortName = '2303-ftb-et-web-pt';
const baseUrl = `https://strangers-things.herokuapp.com/api/${cohortName}`;

export const Posts=()=>{
    const [posts, setPosts] = useState([]);

    const fetchPosts = async () => {
        try {
          const response = await fetch(`${baseUrl}/posts`)
          const result = await response.json();
          console.log(result);
          setPosts(result.data.posts);
          console.log(posts);
          return result;
        } catch (err) {
          console.error(err);
        }
      }

    useEffect(()=>{ fetchPosts()}, [])

    return (
        <>
        {posts.length > 0 && (
            <div>
                {posts.map(post=>(
                    <div key={post.id}>
                        <h3 key={post.id}>{post.title}</h3>
                        <h4 key={post.id}>{post.author.username}</h4>
                        <p key={post.id}>{post.description}</p>
                        <p key={post.id}>{post.price}</p>
                        <p key={post.id}>{post.location}</p>
                        </div>
                ))}
            </div>
        )}
        </>
    )
}

export default Posts;