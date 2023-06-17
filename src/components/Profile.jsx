import { useEffect, useState } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";

const cohortName = "2303-ftb-et-web-pt";
const baseUrl = `https://strangers-things.herokuapp.com/api/${cohortName}`;

export const Profile = ({ token }) => {
  const [userData, setUserData] = useState(null);
  const [editPost, setEditPost] = useState();
  const [removePost, setRemovePost] = useState();

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
  }, [token]);

  return (
    <>
      {editPost === true && (
        <Update to='/Posts/Edit'>Update Post</Update>
      )}

      {removePost === true && (
        <Delete to='/Profile/${posts._id}'>Update Post</Delete>
      )}

      {userData && (
        <div>
          <div key={userData._id}>
            <h3>{userData.username}</h3>

            {userData.posts.length > 0 && (
              <div>
                {userData.posts.map((data) => (
                  <div key={data._id}>
                    <h4>{data.title}</h4>
                    <button type="update">Update Post</button>
                    <button type="delete">Delete</button>
                  </div>
                ))}
              </div>
            )}

            {userData.messages.length > 0 && (
              <div>
                {userData.posts.map((data) => (
                  <div key={data._id}>
                    <h4>{data}</h4>
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
