import  { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Settings from './pages/Settings';
import ToggleDarkMode from './components/ToggleDarkMode';
import './App.css';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`App ${isDarkMode ? 'dark' : 'light'}`}>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/settings">Settings</Link>
        <ToggleDarkMode isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </div>
  );
}

export default App;
