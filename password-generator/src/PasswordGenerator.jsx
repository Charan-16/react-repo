import { useState } from 'react';

const PasswordGenerator = () => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(12); // Default length
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSpecial, setIncludeSpecial] = useState(true);

  const generatePassword = () => {
    const lowerCase = 'abcdefghijklmnopqrstuvwxyz';
    const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const specialChars = '!@#$%^&*()_+[]{}|;:,.<>?';
    
    let characters = lowerCase + upperCase;
    if (includeNumbers) characters += numbers;
    if (includeSpecial) characters += specialChars;

    let generatedPassword = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      generatedPassword += characters[randomIndex];
    }
    
    setPassword(generatedPassword);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password)
      .then(() => alert('Password copied to clipboard'))
      .catch(err => alert('Failed to copy password'));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Password Generator</h1>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">Password Length:</label>
          <input
            type="number"
            value={length}
            min="1"
            onChange={(e) => setLength(parseInt(e.target.value))}
            className="border border-gray-300 rounded-lg p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={() => setIncludeNumbers(!includeNumbers)}
              className="form-checkbox"
            />
            <span className="ml-2">Include Numbers</span>
          </label>
          <label className="inline-flex items-center ml-4">
            <input
              type="checkbox"
              checked={includeSpecial}
              onChange={() => setIncludeSpecial(!includeSpecial)}
              className="form-checkbox"
            />
            <span className="ml-2">Include Special Characters</span>
          </label>
        </div>
        <button
          onClick={generatePassword}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        >
          Generate Password
        </button>
        <input
          type="text"
          value={password}
          readOnly
          className="border border-gray-300 rounded-lg p-2 w-full mb-4"
        />
        <button
          onClick={copyToClipboard}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Copy to Clipboard
        </button>
      </div>
    </div>
  );
};

export default PasswordGenerator;
