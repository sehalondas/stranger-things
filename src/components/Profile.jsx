import { useEffect, useState } from "react";
import {BrowserRouter, Route, Link} from 'react-router-dom';

const cohortName = '2303-ftb-et-web-pt';
const baseUrl = `https://strangers-things.herokuapp.com/api/${cohortName}`;

export const Profile =({token})=> {
    const [userData, setUserData] = useState([]);  

    const myData = async () => {

        try {
          const response = await fetch(`${baseUrl}/users/me`, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
          });
          const result = await response.json();
          console.log(result);
          setUserData(result.data)
          console.log(userData);
          return result
        } catch (err) {
          console.error(err);
        }
      }

      useEffect(()=>{myData()}, [])

    return (
      <>
      {userData.length > 0 && (
          <div>
              {userData.map(data=>(
                  <div key={data.id}>
                      <h3 key={data.id}>{data.username}</h3>
                      <p key={data.id}>{data.messages}</p>
                      <p key={data.id}>{data.posts}</p>
                      </div>
              ))}
          </div>
      )}
      </>
    )
}

export default Profile;