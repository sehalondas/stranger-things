import { useEffect, useState } from "react";
import {BrowserRouter, Route, Link} from 'react-router-dom';

const cohortName = '2303-ftb-et-web-pt';
const baseUrl = `https://strangers-things.herokuapp.com/api/${cohortName}`;

export const Posts=()=>{
    const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const response = await fetch(`${baseUrl}/posts`);
      const result = await response.json();
      console.log(result);
      setPosts(result.data.posts);
      console.log(posts);
      return result;
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPosts();
    checkToken();
  }, [token]);

  return (
    <>
      {addPost === true && (
        <Link to='/Posts/Add'>Add Post</Link>
      )

      }
      {posts.length > 0 && (
        <div>
          {posts.map((post) => (
            <div key={post._id}>
              <h3>{post.title}</h3>
              <h4>{post.author.username}</h4>
              <p>{post.description}</p>
              <p>{post.price}</p>
              <p>{post.location}</p>
              <p>{post.willDeliver}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Posts;