import { configureStore } from '@reduxjs/toolkit';
import paginationReducer from './reducers';

const store = configureStore({
  reducer: {
    pagination: paginationReducer,
  },
});

export default store;
