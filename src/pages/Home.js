import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../App.css";
import Chart from "../components/Chart";
import Table from "../components/Table";

export default function SensorData() {
  const location = useLocation();
  const currentEntries = location.state;
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
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

  // Filter out entries with 0 values or null for temp, humidity, and bpm
  const filteredData = currentEntries.state.filter(
    (entry) =>
      entry.field1 !== 0 &&
      entry.field1 !== null &&
      entry.field2 !== 0 &&
      entry.field2 !== null &&
      entry.field3 !== 0 &&
      entry.field3 !== null &&
      entry.field4 !== 0 &&
      entry.field4 !== null &&
      entry.field5 !== 0 &&
      entry.field5 !== null
  );

  // Prepare data for the LineChart
  const chartData = filteredData.map((item) => ({
    name: item.created_at,
    temperature: parseFloat(item.field1),
    humidity: parseFloat(item.field2),
    bpm: parseFloat(item.field3),
    ecg: parseFloat(item.field4),
    spo2: parseFloat(item.field5),
  }));

  // Calculate the total number of pages
  const totalPages = Math.ceil(currentEntries.state.length / entriesPerPage);

  // Handle page navigation
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="sensor-data">
      <Table data={filteredData} />

      <div className="graph">
        <Chart data={chartData} width={chartWidth} height={chartHeight} />

        <div className="pagination">
          <span>Show entries:</span>
          <select
            value={entriesPerPage}
            onChange={(e) => setEntriesPerPage(Number(e.target.value))}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
          </select>

          <span>Page:</span>
          <ul className="pages">
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (page) => (
                <li
                  key={page}
                  className={page === currentPage ? "active" : ""}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
