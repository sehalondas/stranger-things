import { useState } from "react";
import {BrowserRouter, Route, Link} from 'react-router-dom';
import storeToken from "../client/storeToken";

const cohortName = '2303-ftb-et-web-pt';
const baseUrl = `https://strangers-things.herokuapp.com/api/${cohortName}`;

export const Profile =()=> {
    const [token, setToken] = useState('');

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
          return result
        } catch (err) {
          console.error(err);
        }
      }

      myData();

    return (
        <div>
            hello
        </div>
    )
}

export default Profile;