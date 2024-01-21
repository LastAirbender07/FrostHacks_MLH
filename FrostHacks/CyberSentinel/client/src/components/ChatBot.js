import React, { useState } from 'react';
import axios from 'axios';
import { ThreeCircles } from 'react-loader-spinner'

const ChatBot = () => {
    const [qn, setqn] = useState('');
    const [scanResult, setScanResult] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    let res;
    const handleqnChange = (event) => {
        setqn(event.target.value);
    };

    const handleqnScan = () => {
        if (!qn) {
        setError('Please enter a valid prompt to scan.');
        return;
        }
        setLoading(true);
        axios.post("http://127.0.0.1:5000/get_answer", { qn })
        .then(response => {
            if (response.data.error) {
              setError(response.data.error);
              setScanResult(null);
            } 
            else {
              setLoading(false);
              setError(null);
              setScanResult(response.data['reply']);
            }
        })
        .catch(error => {
            console.error(error);
            setError('An error occurred during the qn scan.');
            setScanResult(null);
        });
    };
    res = JSON.stringify(scanResult, null, 2)
  return (
    <div className="bg-gray-100 p-8 rounded-lg w-[55rem] h-[39rem] max-w-[55rem] max-h-[39rem]">
  <h2 className="text-center mb-8 text-2xl font-bold">Ask your Queries!</h2>
  <div className="flex items-center mb-8">
    <input
      type="text"
      value={qn}
      onChange={handleqnChange}
      placeholder="Why is Cybersecurity essential?"
      className="mr-4 w-[85%] px-4 py-2 border border-gray-300 rounded-lg"
    />
    <button
      onClick={handleqnScan}
      className="w-[15%] text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
    >
      Go
    </button>
  </div>
  {error && <div className="text-red-500 mb-8">{error}</div>}
  <div className="bg-white p-8 rounded-lg">
    <h3 className="mb-4 text-xl font-bold">Output from AI:</h3>
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
      <div class="text-white rounded-lg flex w-[47rem] h-[20rem] max-w-[47rem] max-h-[20rem] bg-gray-800 back overflow-scroll px-4 py-3">
        <p dangerouslySetInnerHTML={{ __html: res}} />
      </div>
        )}
  </div>
</div>
  )
}

export default ChatBot

