import { createSlice } from '@reduxjs/toolkit';

export const timerSlice = createSlice({
  name: 'timer',
  initialState: {
    time: 1500,
    workTime: 1500,
    breakTime: 300,
    longBreakTime: 900,
    sessions: 0,
    sessionGoal: 4,
  },
  reducers: {
    decrement: (state) => {
      state.time -= 1;
    },
    reset: (state, action) => {
      state.time = action.payload;
    },
    setWorkTime: (state, action) => {
      state.workTime = action.payload;
    },
    setBreakTime: (state, action) => {
      state.breakTime = action.payload;
    },
    setLongBreakTime: (state, action) => {
      state.longBreakTime = action.payload;
    },
    setSessionGoal: (state, action) => {
      state.sessionGoal = action.payload;
    },
    incrementSessions: (state) => {
      state.sessions += 1;
    },
    resetSessions: (state) => {
      state.sessions = 0;
    },
  },
});

export const {
  decrement, reset, setWorkTime, setBreakTime, setLongBreakTime,
  setSessionGoal, incrementSessions, resetSessions,
} = timerSlice.actions;

export const selectTime = (state) => state.timer.time;
export const selectWorkTime = (state) => state.timer.workTime;
export const selectBreakTime = (state) => state.timer.breakTime;
export const selectLongBreakTime = (state) => state.timer.longBreakTime;
export const selectSessions = (state) => state.timer.sessions;
export const selectSessionGoal = (state) => state.timer.sessionGoal;

export default timerSlice.reducer;
