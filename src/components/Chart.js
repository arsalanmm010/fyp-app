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

export default function Chart({ data, width, height }) {
  const [chartWidth, setChartWidth] = useState(800);
  const [chartHeight, setChartHeight] = useState(400);
  const [showTemperature, setShowTemperature] = useState(true);
  const [showHumidity, setShowHumidity] = useState(true);
  const [showBPM, setShowBPM] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth > 600;
      const newWidth = isMobile ? window.innerWidth + 120 : 300;
      const newHeight = isMobile ? 400 : 300;
      setChartWidth(newWidth);
      setChartHeight(newHeight);
    };

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

    return lines;
  };

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
