import React, { useState } from "react";
import "../App.css";
import useSWR from "swr";
import Chart from "../components/Chart";
import Table from "../components/Table";

const channelId = process.env.REACT_APP_CHANNEL_ID;

export default function SensorData() {
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  const url = `https://api.thingspeak.com/channels/${channelId}/feeds.json`;

  const fetcher = (url) => fetch(url).then((response) => response.json());
  const { data: sensorData, error } = useSWR(url, fetcher);

  if (error) {
    console.log("Error:", error);
  }

  // Render loading state while data is being fetched
  if (!sensorData) {
    return <div>Loading...</div>;
  }

  const sortedData = [...sensorData.feeds].sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  // Filter out entries with 0 values or null for temp, humidity, and bpm
  const filteredData = sortedData.filter(
    (entry) =>
      entry.field1 !== null && entry.field2 !== null && entry.field3 !== null
  );

  // Calculate the index range for the current page
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredData.slice(
    indexOfFirstEntry,
    indexOfLastEntry
  );

  // Prepare data for the LineChart
  const chartData = currentEntries.map((item) => ({
    name: item.created_at,
    temperature: parseFloat(item.field1),
    humidity: parseFloat(item.field2),
    bpm: parseFloat(item.field3),
  }));

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredData.length / entriesPerPage);

  // Handle page navigation
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="sensor-data">
      <h2>Sensor Data</h2>
      <Table data={currentEntries} />

      <div className="graph">
        <Chart data={chartData} />

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
