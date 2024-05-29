

const ToggleDarkMode = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <button onClick={toggleDarkMode} className="dark-mode-toggle">
      {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    </button>
  );
};

export default ToggleDarkMode;
