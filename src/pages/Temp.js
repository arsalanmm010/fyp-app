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

export default function Temp() {
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
    (entry) => entry.field1 !== null && entry.field2 !== null
  );

  const chartData = filteredData.map((item) => ({
    name: item.created_at,
    temperature: parseFloat(item.field1),
    humidity: parseFloat(item.field2),
  }));

  return (
    <div className="temp">
      <h2 className="head-sensors">Temperature and Humidity Sensors Data</h2>
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>No.</th>
              <th>Date/Time</th>
              <th>Temp</th>
              <th>Humidity</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={item.entry_id}>
                <td>{index + 1}</td>
                <td>{item.created_at}</td>
                <td>{item.field1}</td>
                <td>{item.field2}</td>
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
                key="temperature"
                type="monotone"
                dataKey="temperature"
                name="temperature"
                stroke="#8854d8"
              />
              <Line
                key="humidity"
                type="monotone"
                dataKey="humidity"
                name="humidity"
                stroke="#3344d2"
              />
            </LineChart>
          </div>
        </div>
      </div>
    </div>
  );
}
