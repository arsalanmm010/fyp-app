import { useState } from "react";
import useSWR from "swr";
import { Link } from "react-router-dom";

function Main({ channelID, name }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  const url = `https://api.thingspeak.com/channels/${channelID}/feeds.json`;

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

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = sortedData.slice(indexOfFirstEntry, indexOfLastEntry);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  console.log(currentEntries);

  // const totalPages = Math.ceil(sortedData.length / entriesPerPage);

  return (
    <div className="main">
      <h2 className="main-head">Welcome {name}.</h2>
      <p className="main-para">
        Here you can monitor your different health parameters by pressing one of
        the buttons.
      </p>
      <div className="main-container">
        <div className="button-row">
          <Link
            to={"/temp"}
            state={{ state: currentEntries }}
            className="button"
          >
            Temp & Humidity
          </Link>

          <Link
            to={"/bpm"}
            state={{ state: currentEntries }}
            className="button"
          >
            BPM
          </Link>
        </div>
        <div className="button-row">
          <Link
            to={"/ecg"}
            state={{ state: currentEntries }}
            className="button"
          >
            ECG
          </Link>
          <Link
            to={"/spo2"}
            state={{ state: currentEntries }}
            className="button"
          >
            SpO2
          </Link>
        </div>
        <div className="button-row">
          <Link
            to={"/home"}
            state={{ state: currentEntries }}
            className="button"
          >
            ALL
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Main;
