import "./App.css";

import { useState, useEffect } from "react";
import FormData from "form-data";

const axios = require("axios");

function App() {
  const [username, setUsername] = useState("");
  const [reload, setReload] = useState(false);
  const [usersList, setUsersList] = useState([]);
  const [image, setImage] = useState([]);

  useEffect(() => {
    fetchUsers();
    console.log();
  }, [reload]);

  // Fonction fetch API
  const fetchUsers = async () => {
    await axios.get("http://localhost:8000/users").then((res) => {
      const data = res.data;
      setUsersList(data);
    });
  };

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

    setReload((prev) => !prev);
  };

  const onChange = (e) => {
    e.preventDefault();
    setUsername(e.target.value);
  };

  const putImage = (e) => {
    e.preventDefault();
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
      {usersList &&
        usersList.map((usr) => {
          return (
            <ul style={{ textAlign: "center" }} key={usr.username}>
              <li
                style={{
                  fontWeight: "bold",
                  listStyle: "none",
                  fontSize: "25px",
                }}
              >
                {usr.username}
              </li>
              <img
                src={`http://localhost:8000/${usr.image}`}
                alt="Image de profil"
                style={{ width: "35px", height: "35px" }}
              />
            </ul>
          );
        })}
    </div>
  );
}

export default App;
