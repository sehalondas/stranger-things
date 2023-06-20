import { useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const cohortName = "2303-ftb-et-web-pt";
const baseUrl = `https://strangers-things.herokuapp.com/api/${cohortName}`;

export const Messages = ({ posts, token }) => {
    const { postId } = useParams
    const post = posts.filter((post) => post._id === postId);
    const [content, setContent] = useState("")

    const handleMessage = (event) => {
        event.preventDefault();
    }

    const postMessage = async (postId) => {
        try {
          const response = await fetch(`${baseUrl}/posts/${postId}/messages`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
              message: {
                content: content,
              }
            })
          });
          const result = await response.json();
          console.log(result);
          return result
        } catch (err) {
          console.error("Error sending message");
        }
      };

      return (
        <div id="message">
            <form id='message-form' onSubmit={handleMessage}>
                <input
                type="text"
                placeholder='Type your message...'
                onChange={(event) => {
                    setContent(event.target.value);
                }}
                value={content}
                ></input>
                <button onClick={postMessage}>Send Message</button>
            </form>
        </div>
    );
};

export default Messages;