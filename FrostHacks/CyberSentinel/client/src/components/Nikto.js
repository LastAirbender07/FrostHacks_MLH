import React, { useState } from 'react';
import axios from 'axios';
import { ThreeCircles } from 'react-loader-spinner';

const formatNiktoOutput = (output) => {
  if (output) {
    const lines = output.split('\n').filter((line) => line.trim() !== '');
    const formattedOutput = lines.map((line) => line.replace(/^\s*\+\s*/, '')).join('<br>');

    return formattedOutput;
  }
  return '';
};


const Nikto = ({ webHeader, text }) => {
  const [url, setUrl] = useState('');
  const [seconds, setSeconds] = useState(180); 
  const [scanResult, setScanResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const handleSecondsChange = (event) => {
    setSeconds(event.target.value);
  };

  const handleUrlScan = () => {
    if (!url) {
      setError('Please enter a valid URL to scan.');
      return;
    }

    let web = 'http://127.0.0.1:5000/';
    web = web + webHeader;

    setLoading(true);

    axios
      .post(web, { url, secs: seconds }) 
      .then((response) => {
        setLoading(false);

        if (response.data.error) {
          setError(response.data.error);
          setScanResult(null);
        } else {
          setError(null);
          setScanResult(formatNiktoOutput(response.data.output));
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
        setError('An error occurred during the URL scan.');
        setScanResult(null);
      });
  };

  return (
    <div className="bg-gray-100 p-8 rounded-lg w-[55rem] h-[39rem] max-w-[55rem] max-h-[39rem]">
      <h2 className="text-center mb-8 text-2xl font-bold">{text}</h2>
      <div className="flex items-center mb-8">
        <input
          type="text"
          value={url}
          onChange={handleUrlChange}
          placeholder="Enter URL"
          className="mr-4 w-1/2 px-4 py-2 border border-gray-300 rounded-lg"
        />
        <input
          type="number"
          value={seconds}
          onChange={handleSecondsChange}
          placeholder="Scan Duration (seconds)"
          className="mr-4 w-1/4 px-4 py-2 border border-gray-300 rounded-lg"
        />
        <button
          onClick={handleUrlScan}
          className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Scan
        </button>
      </div>
      {error && <div className="text-red-500 mb-8">{error}</div>}
      <div className="bg-white p-8 rounded-lg">
        <h3 className="mb-4 text-xl font-bold">Scan Result:</h3>
        {loading ? (
          <div className="text-center flex justify-center items-center h-32">
            <div className="spinner-border text-primary" role="status">
              <ThreeCircles
                height="70"
                width="70"
                color="#5D3FD3"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel="three-circles-rotating"
                outerCircleColor=""
                innerCircleColor=""
                middleCircleColor=""
              />
            </div>
          </div>
        ) : (
          <div className="bg-gray-100 p-4 rounded-lg w-[47rem] h-[20rem] max-w-[47rem] max-h-[20rem] overflow-scroll">
            <p dangerouslySetInnerHTML={{ __html: scanResult}} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Nikto;
