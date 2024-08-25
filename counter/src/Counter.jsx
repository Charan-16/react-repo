import{ useState, useEffect } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);         // Tracks the count value
  const [isRunning, setIsRunning] = useState(false); // Tracks if the counter is running
  const [intervalId, setIntervalId] = useState(null); // Stores the interval ID

  useEffect(() => {
    if (isRunning && !intervalId) {
      // Start the interval if the counter is running and no intervalId is set
      const id = setInterval(() => {
        setCount(prevCount => prevCount + 1);
      }, 1000);
      setIntervalId(id); // Store the interval ID
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId); // Clear the interval if it exists
        setIntervalId(null); // Reset the interval ID to avoid multiple intervals
      }
    };
  }, [isRunning, intervalId]); // Dependency array tracks `isRunning` and `intervalId`

  const startCounter = () => {
    if (!isRunning) {
      setIsRunning(true); // Start the counter
    }
  };

  const stopCounter = () => {
    if (isRunning && intervalId) {
      setIsRunning(false); // Stop the counter
      clearInterval(intervalId); // Clear the interval
      setIntervalId(null); // Reset the interval ID
    }
  };

  const resetCounter = () => {
    stopCounter(); // Ensure the counter is stopped
    setCount(0);   // Reset the count to 0
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Counter: {count}</h1>
        <div className="flex space-x-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={startCounter}
          >
            Start
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={stopCounter}
          >
            Stop
          </button>
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            onClick={resetCounter}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Counter;
