import "./App.css";

import { useState } from "react";

const axios = require("axios");

function App() {
  const [username, setUsername] = useState("");
  const [userList, setUserList] = useState([]);

  const onSubmit = (e) => {
    e.preventDefault();

    axios.post("http://localhost:8000/users", {
      username: username,
    });

    setUserList([...userList, username]);
    console.log("USERLIST", userList);
    console.log("USERNAME", username);
  };

  const onChange = (e) => {
    setUsername(e.target.value);
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
        <input type="file" id="img" name="img" accept="image/*" />
        <button type="submit" onClick={onSubmit}>
          Soumettre
        </button>
      </form>
    </div>
  );
}

export default App;
