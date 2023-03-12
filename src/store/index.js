import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import rootReducer from './slices';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(logger)
});
export default store;