import "./App.css";

import { useState } from "react";
import FormData from "form-data";

const axios = require("axios");

function App() {
  const [username, setUsername] = useState("");
  const [userList, setUserList] = useState([]);
  const [image, setImage] = useState([]);

  const onSubmit = (e) => {
    e.preventDefault();

    const bodyFormData = new FormData();
    bodyFormData.append("img", image);
    bodyFormData.append("username", username);
    console.log(bodyFormData);

    axios({
      method: "post",
      url: "http://localhost:8000/users",
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    });
    // .then(function (response) {
    //   console.log(response);
    // })
    // .catch(function (response) {
    //   console.log(response);
    // });

    // setUserList([...userList, username]);
    // console.log("USERLIST", userList);
    // console.log("USERNAME", username);
  };

  const onChange = (e) => {
    setUsername(e.target.value);
  };

  const putImage = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div
      className="App"
      style={{
        width: "80vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1 style={{ textAlign: "center" }}>AJOUTER UNE IMAGE</h1>
      <form style={{ display: "flex", flexDirection: "column" }}>
        <input
          type="text"
          placeholder="Username"
          onChange={onChange}
          required
        />
        <label htmlFor="img">Select image:</label>
        <input
          type="file"
          id="img"
          name="img"
          accept="image/*"
          onChange={(e) => putImage(e)}
        />
        <button type="submit" onClick={onSubmit}>
          Soumettre
        </button>
      </form>
    </div>
  );
}

export default App;
