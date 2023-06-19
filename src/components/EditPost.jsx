import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const cohortName = "2303-ftb-et-web-pt";
const baseUrl = `https://strangers-things.herokuapp.com/api/${cohortName}`;

export const EditPost =({token, postIdNum, setPostIdNum, setEditPost})=> {
  const history = useHistory();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [checked, setChecked] = useState(false);
  
  const updatePost = async () => {
    try {
      const response = await fetch(`${baseUrl}/posts/${postIdNum}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          post: {
            title: title,
            description: description,
            price: price,
            location: location,
            willDeliver: checked,
          },
        }),
      });
      const result = await response.json();
      console.log(result);
      return result;
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updatePost();
    setTitle("");
    setDescription("");
    setPrice("");
    setChecked(false);
    setEditPost(false);
    history.push("/");
  };

  useEffect(() => {
    const storedPostId = postIdNum;
    if (storedPostId) {
      setPostIdNum(storedPostId);
    }
  }, [postIdNum, setPostIdNum]);

  return (
    <form onSubmit={handleSubmit}>
      <h1>Edit Post</h1>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(event) => {
          setTitle(event.target.value);
        }}
      ></input>
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(event) => {
          setDescription(event.target.value);
        }}
      ></input>
      <input
        type="text"
        placeholder="Price"
        value={price}
        onChange={(event) => {
          setPrice(event.target.value);
        }}
      ></input>
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(event) => {
          setLocation(event.target.value);
        }}
      ></input>
      <label>
        <input
          type="checkbox"
          checked={checked}
          onChange={() => {
            console.log(checked);
            setChecked(!checked);
            console.log(checked);
          }}
        />
        Willing to Deliver?
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default EditPost;