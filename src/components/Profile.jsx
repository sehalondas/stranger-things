import { useEffect, useState } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";

const cohortName = "2303-ftb-et-web-pt";
const baseUrl = `https://strangers-things.herokuapp.com/api/${cohortName}`;

export const Profile = ({ token }) => {
  const [userData, setUserData] = useState(null);
  
    const deletePost = async (postId) => {
      try {
        const response = await fetch(`${baseUrl}/posts/${postId}`, {
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
        console.error(err);
      }
    }

  const handleEdit=()=>{
    console.log('edit')
  }

  const myData = async () => {
    try {
      const response = await fetch(`${baseUrl}/users/me`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      console.log(result);
      setUserData(result.data);
      console.log(userData);
      return result;
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    myData();
  }, []);

  return (
    <>
      {userData && (
        <div>
          <div key={userData._id}>
            <h3>{userData.username}</h3>

            {userData.posts.length > 0 && (
              <div>
                {userData.posts.map((data) => (
                  <div key={data._id}>
                    <h3>{data.title}</h3>
                    <h4>{data.author.username}</h4>
                    <p>{data.description}</p>
                    <p>{data.price}</p>
                    <p>{data.location}</p>
                    <p>{data.willDeliver}</p>
                    <button id={`${data._id}`} onClick={()=> deletePost(data._id)}>DELETE</button>
                  </div>
                ))}
              </div>
            )}

            {userData.messages.length > 0 && (
              <div>
                {userData.messages.map((data) => (
                  <div key={data._id}>
                    <h4>{data.content}</h4>
                    <p>{data.fromUser.username}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
