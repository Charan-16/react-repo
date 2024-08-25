import { useState } from 'react';

const BgChanger = () => {
  const [bgColor, setBgColor] = useState('bg-pink-200' ); // Default background color

  // Mapping colors to Tailwind CSS classes
  const colorClasses = {
    red: 'bg-red-500 hover:bg-red-700',
    blue: 'bg-blue-500 hover:bg-blue-700',
    green: 'bg-green-500 hover:bg-green-700',
    yellow: 'bg-yellow-500 hover:bg-yellow-700',
    pink: 'bg-pink-500 hover:bg-pink-700',
    purple: 'bg-purple-500 hover:bg-purple-700'
  };

  const colors = Object.keys(colorClasses); // taking key from object

  const handleBgChange = (color) => {
    setBgColor(`bg-${color}-500`); // Update background color
  };

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen ${bgColor}`}>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Background Changer</h1>
        <div className="flex space-x-4">
          {colors.map(color => (
            <button
              key={color}
              className={`text-white font-bold py-2 px-4 rounded ${colorClasses[color]}`}
              onClick={() => handleBgChange(color)}
            >
              {color.charAt(0).toUpperCase() + color.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BgChanger;
