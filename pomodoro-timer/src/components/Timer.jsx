import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  decrement, reset, incrementSessions, resetSessions,
  selectTime, selectWorkTime, selectBreakTime, selectLongBreakTime,
  selectSessions, selectSessionGoal
} from '../store/timerSlice';
import './Timer.css';

const Timer = () => {
  const seconds = useSelector(selectTime);
  const workTime = useSelector(selectWorkTime);
  const breakTime = useSelector(selectBreakTime);
  const longBreakTime = useSelector(selectLongBreakTime);
  const sessions = useSelector(selectSessions);
  const sessionGoal = useSelector(selectSessionGoal);
  const dispatch = useDispatch();
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        dispatch(decrement());
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    if (seconds === 0) {
      setIsActive(false);
      showNotification();
      playSound();
      if (!isBreak) {
        dispatch(incrementSessions());
        if (sessions + 1 >= sessionGoal) {
          setIsBreak(true);
          dispatch(reset(longBreakTime));
          dispatch(resetSessions());
        } else {
          setIsBreak(true);
          dispatch(reset(breakTime));
        }
      } else {
        setIsBreak(false);
        dispatch(reset(workTime));
      }
    }
    return () => clearInterval(interval);
  }, [isActive, seconds, isBreak, workTime, breakTime, longBreakTime, sessions, sessionGoal, dispatch]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const showNotification = () => {
    if (Notification.permission === 'granted') {
      new Notification(isBreak ? 'Break Time Over!' : 'Work Time Over!');
    }
  };

  const playSound = () => {
    const audio = new Audio('/alarm.mp3'); // Ensure you have an alarm.mp3 file in the public folder
    audio.play();
  };

  const requestNotificationPermission = () => {
    if (Notification.permission === 'default') {
      Notification.requestPermission();
    }
  };

  useEffect(() => {
    requestNotificationPermission();
  }, []);

  return (
    <div className="timer">
      <h1>{formatTime(seconds)}</h1>
      <h2>{isBreak ? 'Break Time!' : 'Work Time!'}</h2>
      <h3>Completed Sessions: {sessions} / {sessionGoal}</h3>
      <div className="buttons">
        <button onClick={() => setIsActive(!isActive)}>
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button onClick={() => { dispatch(reset(isBreak ? breakTime : workTime)); setIsActive(false); }}>Reset</button>
      </div>
    </div>
  );
};

export default Timer;
