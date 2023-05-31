import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export default function SpO2() {
  const location = useLocation();
  const currentEntries = location.state;
  const [chartWidth, setChartWidth] = useState(400);
  const [chartHeight, setChartHeight] = useState(400);

  useEffect(() => {
    function handleResize() {
      const isMobile = window.matchMedia("(min-width: 600px)").matches;
      const width = isMobile ? 800 : 400;
      const height = isMobile ? 400 : 400;
      setChartWidth(width);
      setChartHeight(height);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const filteredData = currentEntries.state.filter(
    (entry) => entry.field5 !== null
  );

  const chartData = filteredData.map((item) => ({
    name: item.created_at,
    spo2: parseFloat(item.field5),
  }));

  return (
    <div className="temp">
      <h2>SpO2 Sensor Data</h2>
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>No.</th>
              <th>Date/Time</th>
              <th>SpO2</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={item.entry_id}>
                <td>{index + 1}</td>
                <td>{item.created_at}</td>
                <td>{item.field5}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <div className="chart-container">
          <h3 className="chart-title">Graph</h3>
          <div className="chart-toggle"></div>
          <div className="chart-wrapper">
            <LineChart width={chartWidth} height={chartHeight} data={chartData}>
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
              <Line
                key="spo2"
                type="monotone"
                dataKey="spo2"
                name="spo2"
                stroke="#8854d8"
              />
            </LineChart>
          </div>
        </div>
      </div>
    </div>
  );
}
