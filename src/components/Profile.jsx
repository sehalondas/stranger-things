import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import EditPost from "./EditPost";


const cohortName = "2303-ftb-et-web-pt";
const baseUrl = `https://strangers-things.herokuapp.com/api/${cohortName}`;

export const Profile = ({ token, setPostIdNum, postIdNum}) => {
  const [userData, setUserData] = useState(null);
  const [editPost, setEditPost] =useState(false);
  const history = useHistory();

  const handleClick=(event)=>{
    event.preventDefault();
    setPostIdNum(event.target.id)
    console.log(postIdNum); 
    setEditPost(true);
  };

  const deletePost = async (postId) => {
    try {
      const response = await fetch(`${baseUrl}/posts/${postId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      console.log(result);
      if (result.success) {
        setUserData((prevUserData) => ({
          ...prevUserData,
          posts: prevUserData.posts.filter((post) => post._id !== postId),
        }));
      }
      return result;
    } catch (err) {
      console.error(err);
    }
  };

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
        return result;
      } catch (err) {
      console.error(err);
      }
    };

    useEffect(() => {
      if (token) {
        myData();
      } else {
        setUserData(null);
      }
    }, [!token]);

    useEffect(() => {
      const storedUserData = localStorage.getItem("userData");
  
      if (storedUserData) {
        setUserData(JSON.parse(storedUserData));
      } else {
        fetchUserData();
      }
    }, []);
  
    useEffect(() => {
      if (userData) {
        localStorage.setItem("userData", JSON.stringify(userData));
      }
    }, [userData]);
    


  return (
    <>
      {!token && (
        <div>
          <h1>Please login or create an account for access.</h1>
        </div>
      )}

      {userData && (
        <div>
          <div key={userData._id}>
            <h1>Welcome back {`${userData.username}`}!</h1>
            <h3>{userData.username}</h3>

            {userData.posts && userData.posts.length > 0 && (
              <div>
                {userData.posts.map((data) => (
                  <div key={data._id}>
                    <h3>{data.title}</h3>
                    <h4>{data.author.username}</h4>
                    <p>{data.description}</p>
                    <p>{data.price}</p>
                    <p>{data.location}</p>
                    <p>{data.willDeliver}</p>
                    <button
                      id={`${data._id}`}
                      onClick={handleClick}
                    >
                      Edit
                    </button>
                    {editPost === true && (
                        <EditPost setEditPost={setEditPost}/>
                      )}
                    <button
                      id={`${data._id}`}
                      onClick={() => deletePost(data._id)}
                    >
                      DELETE
                    </button>
                  </div>
                ))}
              </div>
            )}

            {userData.messages && userData.messages.length > 0 && (
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
