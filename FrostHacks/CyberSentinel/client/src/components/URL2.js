import React, { useState } from 'react';
import axios from 'axios';
import { ThreeCircles } from 'react-loader-spinner'

const URL2 = ({ webHeader, text }) => {
  const [url, setUrl] = useState('');
  const [scanResult, setScanResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Step 1: Loading state

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const handleUrlScan = () => {
    if (!url) {
      setError('Please enter a valid URL to scan.');
      return;
    }

    let web = 'http://127.0.0.1:5000/';
    web = web + webHeader;

    setLoading(true); // Step 1: Set loading state to true

    axios
      .post(web, { url })
      .then((response) => {
        setLoading(false); // Step 3: Set loading state to false when response is received

        if (response.data.error) {
          setError(response.data.error);
          setScanResult(null);
        } else {
          setError(null);
          setScanResult(response.data);
        }
      })
      .catch((error) => {
        setLoading(false); // Step 3: Set loading state to false on error
        console.error(error);
        setError('An error occurred during the URL scan.');
        setScanResult(null);
      });
  };
  const formattedOutput = scanResult?.output?.replace(/\n/g, '<br />');
  
  return (
    <div className="bg-gray-100 p-8 rounded-lg w-[55rem] h-[39rem] max-w-[55rem] max-h-[39rem]">
      <h2 className="text-center mb-8 text-2xl font-bold">URL Scanner</h2>
      <div className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Enter URL to scan"
          className="border border-gray-300 p-2 rounded-md"
          value={url}
          onChange={handleUrlChange}
        />
        <button
          type="button"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
          onClick={handleUrlScan}
        >
          Scan
        </button>
      </div>

      {error && (
        <div className="text-red-500 mt-8">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center mt-8">
          <ThreeCircles size={50} 
            height="70"
            width="70"
            color="#5D3FD3"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="three-circles-rotating"
          />
        </div>
      ):(
        <div className="mt-8">
          <h3 className="text-xl font-bold">Scan Result</h3>
          <div className="border border-gray-300 p-4 rounded-md h-[20rem] max-h-[20rem] overflow-scroll">
            <pre dangerouslySetInnerHTML={{ __html: formattedOutput }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default URL2;
