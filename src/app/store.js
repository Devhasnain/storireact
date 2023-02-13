import { configureStore } from '@reduxjs/toolkit';
import studioReducer from '../features/studio/studioSlice';

export const store = configureStore({
  reducer: {
    studio: studioReducer
  },
});

