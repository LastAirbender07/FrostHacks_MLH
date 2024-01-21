import React, { useState } from 'react';
import axios from 'axios';
import { ThreeCircles } from 'react-loader-spinner'

const Request = ({webHeader, text}) => {
  const [file, setFile] = useState(null);
  const [scanResult, setScanResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Step 1: Loading state

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileUpload = () => {
    if (!file) {
      setError('No file selected.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    let web = 'http://127.0.0.1:5000/'
        web = web + webHeader
    setLoading(true); 
    axios.post(web, formData)
      .then(response => {
        setLoading(false);
        if (response.data.error) {
          setError(response.data.error);
          setScanResult(null);
        } 
        else {
          setError(null);
          setScanResult(response.data);
        }
      })
      .catch(error => {
        setLoading(false);
        console.error(error);
        setError('An error occurred during the scan.');
        setScanResult(null);
      });
  };
  return (
    <div className="bg-gray-100 p-8 rounded-lg w-[55rem] h-[39rem] max-w-[55rem] max-h-[39rem]">
  <h2 className="text-center mb-8 text-2xl font-bold">{text}</h2>
  <div className="flex items-center mb-8">
    <input
      type="file"
      onChange={handleFileChange}
      className="mr-4"
    />
    <button
      onClick={handleFileUpload}
      className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
    >
      Upload and Scan
    </button>
  </div>
  {error && <div className="text-red-500 mb-8">{error}</div>}
  <div className="bg-white p-8 rounded-lg">
    <h3 className="mb-4 text-xl font-bold">Scan Result:</h3>
    {loading ? ( // Step 2: Show loading spinner
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
    <pre className="bg-gray-100 p-4 rounded-lg w-[47rem] h-[20rem] max-w-[47rem] max-h-[20rem] overflow-scroll">
      {JSON.stringify(scanResult, null, 2)}
    </pre>
        )}
  </div>
</div>
  )
}

export default Request;

