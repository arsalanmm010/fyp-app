import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import "../App.css";

export default function Chart({ data }) {
  const [chartWidth, setChartWidth] = useState(400);
  const [chartHeight, setChartHeight] = useState(400);
  const [showTemperature, setShowTemperature] = useState(true);
  const [showHumidity, setShowHumidity] = useState(true);
  const [showBPM, setShowBPM] = useState(true);
  const [showECG, setShowECG] = useState(true);
  const [showSpO2, setShowSpO2] = useState(true);

  useEffect(() => {
    function handleResize() {
      const isMobile = window.matchMedia("(min-width: 600px)").matches;
      const width = isMobile ? 800 : 400;
      const height = isMobile ? 400 : 400;
      setChartWidth(width);
      setChartHeight(height);
    }

    handleResize(); // Initial sizing
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleToggleTemperature = () => {
    setShowTemperature(!showTemperature);
  };

  const handleToggleHumidity = () => {
    setShowHumidity(!showHumidity);
  };

  const handleToggleBPM = () => {
    setShowBPM(!showBPM);
  };

  const handleToggleECG = () => {
    setShowECG(!showECG);
  };

  const handleToggleSpO2 = () => {
    setShowSpO2(!showSpO2);
  };

  const renderLines = () => {
    const lines = [];

    if (showTemperature) {
      lines.push(
        <Line
          key="temperature"
          type="monotone"
          dataKey="temperature"
          name="Temperature"
          stroke="#8884d8"
        />
      );
    }

    if (showHumidity) {
      lines.push(
        <Line
          key="humidity"
          type="monotone"
          dataKey="humidity"
          name="Humidity"
          stroke="#0036FF"
        />
      );
    }

    if (showBPM) {
      lines.push(
        <Line
          key="bpm"
          type="monotone"
          dataKey="bpm"
          name="BPM"
          stroke="#B94701"
        />
      );
    }

    if (showECG) {
      lines.push(
        <Line
          key="ecg"
          type="monotone"
          dataKey="ecg"
          name="ECG"
          stroke="#B94722"
        />
      );
    }

    if (showSpO2) {
      lines.push(
        <Line
          key="spo2"
          type="monotone"
          dataKey="spo2"
          name="SpO2"
          stroke="#B23701"
        />
      );
    }

    return lines;
  };

  console.log(data);

  return (
    <div className="chart-container">
      <h3 className="chart-title">Sensor Data Chart</h3>
      <div className="chart-toggle">
        <label>
          <input
            type="checkbox"
            checked={showTemperature}
            onChange={handleToggleTemperature}
          />
          Temperature
        </label>
        <label>
          <input
            type="checkbox"
            checked={showHumidity}
            onChange={handleToggleHumidity}
          />
          Humidity
        </label>
        <label>
          <input type="checkbox" checked={showBPM} onChange={handleToggleBPM} />
          BPM
        </label>
        <label>
          <input type="checkbox" checked={showECG} onChange={handleToggleECG} />
          ECG
        </label>
        <label>
          <input
            type="checkbox"
            checked={showSpO2}
            onChange={handleToggleSpO2}
          />
          SpO2
        </label>
      </div>
      <div className="chart-wrapper">
        <LineChart width={chartWidth} height={chartHeight} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend
            className="chart-legend"
            iconType="circle"
            iconSize={10}
            wrapperStyle={{ verticalAlign: "middle" }}
          />
          {renderLines()}
        </LineChart>
      </div>
    </div>
  );
}
