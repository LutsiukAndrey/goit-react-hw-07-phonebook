import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { contactReducer } from './contactSlice';

export const rootReducer = combineReducers({
  contacts: contactReducer,
});

export const store = configureStore({
  reducer: contactReducer,
  devTools: process.env.NODE_ENV !== 'production',
});
