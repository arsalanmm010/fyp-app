import React, { useState, useEffect } from "react";
import "../App.css";
import useSWR from "swr";
import Chart from "../components/Chart";
import Table from "../components/Table";

const channelId = process.env.REACT_APP_CHANNEL_ID;
const channelId2 = process.env.REACT_APP_CHANNEL_ID_2;

export default function SensorData() {
  console.log(channelId2);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [chartWidth, setChartWidth] = useState(800);
  const [chartHeight, setChartHeight] = useState(400);
  const [channel, setChannel] = useState(channelId);

  function handleChange() {
    if (channel === channelId) {
      setChannel(channelId2);
    } else {
      setChannel(channelId);
    }
  }

  const url = `https://api.thingspeak.com/channels/${channel}/feeds.json`;

  const fetcher = (url) => fetch(url).then((response) => response.json());
  const { data: sensorData, error } = useSWR(url, fetcher);

  useEffect(() => {
    function handleResize() {
      const isMobile = window.matchMedia("(min-width: 600px)").matches;
      const width = isMobile ? window.innerWidth + 120 : 300;
      const height = isMobile ? 400 : 300;
      setChartWidth(width);
      setChartHeight(height);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
  // const filteredData = sortedData.filter(
  //   (entry) =>
  //     (entry.field1 !== 0 || entry.field1 !== null) &&
  //     (entry.field2 !== 0 || entry.field2 !== null) &&
  //     (entry.field3 !== 0 || entry.field3 !== null) &&
  //     (entry.field4 !== 0 || entry.field4 !== null) &&
  //     (entry.field5 !== 0 || entry.field5 !== null)
  // );

  // Calculate the index range for the current page
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = sortedData.slice(indexOfFirstEntry, indexOfLastEntry);

  // Prepare data for the LineChart
  const chartData = currentEntries.map((item) => ({
    name: item.created_at,
    temperature: parseFloat(item.field1),
    humidity: parseFloat(item.field2),
    bpm: parseFloat(item.field3),
    ecg: parseFloat(item.field4),
    spo2: parseFloat(item.field5),
  }));

  // Calculate the total number of pages
  const totalPages = Math.ceil(sortedData.length / entriesPerPage);

  // Handle page navigation
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="sensor-data">
      <button onClick={handleChange} className="channel-change">
        Change Channel
      </button>
      {channel === channelId ? <h2>Ali's Data</h2> : <h2>Arsalan's Data</h2>}
      <Table data={currentEntries} />

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
