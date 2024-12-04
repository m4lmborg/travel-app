import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import groupReducer from './slices/groupSlice';
import itineraryReducer from './slices/itinerarySlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    groups: groupReducer,
    itinerary: itineraryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
