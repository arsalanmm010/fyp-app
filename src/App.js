import React from "react";
import SensorData from "./components/SensorData";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
