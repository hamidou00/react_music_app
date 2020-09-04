import { configureStore } from '@reduxjs/toolkit';
// import counterReducer from '../features/counter/counterSlice';
import synthReducer from '../reducers/synthSlice';
import projectReducer from '../reducers/projectSlice';

export default configureStore({
  reducer: {
    // counter: counterReducer,
    Synth: synthReducer,
    Project : projectReducer
  },
});
