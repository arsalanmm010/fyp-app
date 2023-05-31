import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./components/Login";
import Temp from "./pages/Temp";
import BPM from "./pages/BPM";
import ECG from "./pages/ECG";
import SpO2 from "./pages/SpO2";
import { Route, Routes } from "react-router-dom";
import Main from "./components/Main";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [channelID, setChannelID] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("loggedIn");
    if (isLoggedIn) {
      setLoggedIn(true);
      setChannelID(localStorage.getItem("channelID"));
      setName(localStorage.getItem("name"));
    }
  }, []);

  const handleLogin = (name, channelID) => {
    setLoggedIn(true);
    setChannelID(channelID);
    setName(name);
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("channelID", channelID);
    localStorage.setItem("name", name);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setChannelID("");
    setName("");
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("channelID");
    localStorage.removeItem("name");
  };

  return (
    <div className="page-container">
      <Header handleLogout={handleLogout} />
      <div className="page-ccc">
        <Routes>
          {!loggedIn ? (
            <Route path="/" element={<Login handleLogin={handleLogin} />} />
          ) : null}
          {loggedIn ? (
            <Route
              path="/"
              element={<Main name={name} channelID={channelID} />}
            />
          ) : null}
          <Route
            path="/main"
            element={<Main name={name} channelID={channelID} />}
          />
          <Route path="/temp" element={<Temp />} />
          <Route path="/bpm" element={<BPM />} />
          <Route path="/ecg" element={<ECG />} />
          <Route path="/spo2" element={<SpO2 />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
