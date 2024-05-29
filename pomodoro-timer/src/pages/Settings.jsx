import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setWorkTime, setBreakTime, setLongBreakTime, setSessionGoal, reset,
  selectWorkTime, selectBreakTime, selectLongBreakTime, selectSessionGoal
} from '../store/timerSlice';

const Settings = () => {
  const dispatch = useDispatch();
  const currentWorkTime = useSelector(selectWorkTime);
  const currentBreakTime = useSelector(selectBreakTime);
  const currentLongBreakTime = useSelector(selectLongBreakTime);
  const currentSessionGoal = useSelector(selectSessionGoal);

  const [workTime, setWorkTimeLocal] = useState(currentWorkTime / 60);
  const [breakTime, setBreakTimeLocal] = useState(currentBreakTime / 60);
  const [longBreakTime, setLongBreakTimeLocal] = useState(currentLongBreakTime / 60);
  const [sessionGoal, setSessionGoalLocal] = useState(currentSessionGoal);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setWorkTime(workTime * 60));
    dispatch(setBreakTime(breakTime * 60));
    dispatch(setLongBreakTime(longBreakTime * 60));
    dispatch(setSessionGoal(sessionGoal));
    dispatch(reset(workTime * 60));
  };

  return (
    <div className="settings">
      <h1>Settings Page</h1>
      <form onSubmit={handleSubmit}>
        <div className="settings-group">
          <label>
            Work Time (minutes):
            <input
              type="number"
              value={workTime}
              onChange={(e) => setWorkTimeLocal(e.target.value)}
            />
          </label>
        </div>
        <div className="settings-group">
          <label>
            Break Time (minutes):
            <input
              type="number"
              value={breakTime}
              onChange={(e) => setBreakTimeLocal(e.target.value)}
            />
          </label>
        </div>
        <div className="settings-group">
          <label>
            Long Break Time (minutes):
            <input
              type="number"
              value={longBreakTime}
              onChange={(e) => setLongBreakTimeLocal(e.target.value)}
            />
          </label>
        </div>
        <div className="settings-group">
          <label>
            Sessions Before Long Break:
            <input
              type="number"
              value={sessionGoal}
              onChange={(e) => setSessionGoalLocal(e.target.value)}
            />
          </label>
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default Settings;
