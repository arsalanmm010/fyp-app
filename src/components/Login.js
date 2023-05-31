import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const channelId = process.env.REACT_APP_CHANNEL_ID;
const channelId2 = process.env.REACT_APP_CHANNEL_ID_2;

const Login = ({ handleLogin }) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [channelID, setChannelID] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (channelID === channelId || channelID === channelId2) {
      handleLogin(name, channelID);
      navigate("/");
    } else {
      setErrorMessage("Invalid name or channel ID. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input-field"
        />
        <input
          type="text"
          placeholder="Channel ID"
          value={channelID}
          onChange={(e) => setChannelID(e.target.value)}
          className="input-field"
        />
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
