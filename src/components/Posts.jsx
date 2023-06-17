import { useEffect, useState } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";

const cohortName = "2303-ftb-et-web-pt";
const baseUrl = `https://strangers-things.herokuapp.com/api/${cohortName}`;

export const Posts = ({token}) => {
  const [posts, setPosts] = useState([]);
  const [addPost, setAddPost] = useState(false);

  const checkToken=()=>{
    if(token.length > 0) {
      setAddPost(true);
    }
    }

  const fetchPosts = async () => {
    try {
      const response = await fetch(`${baseUrl}/Posts`);
      const result = await response.json();
      console.log(result);
      setPosts(result.data.posts);
      console.log(posts);
      return result;
    } catch (err) {
      console.error(err);
    }
  };

  const deletePost = async () => {
    try {
      const response = await fetch(`${baseUrl}/Profile/${posts._id}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      const result = await response.json();
      console.log(result);
      return result
    } catch (err) {
      console.error("Unable to delete post.", err);
    }
  }

  const updatePost = async () => {
    try {
      const response = await fetch(`${baseUrl}/Profile/${posts._id}`, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          post: {
            title: "My favorite stuffed animal",
            description: "This is a pooh doll from 1973. It has been carefully taken care of since I first got it.",
            price: "$480.00",
            location: "New York, NY",
            willDeliver: true
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

  useEffect(() => {
    fetchPosts();
    checkToken();
    deletePost();
    updatePost();
  }, [token]);

  return (
    <>
      {addPost === true && (
        <Link to='/Posts/Add'>Add Post</Link>
      )}

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
