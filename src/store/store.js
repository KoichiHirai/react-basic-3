import { configureStore } from '@reduxjs/toolkit';
import paginationReducer from '../reducers/reducer';

const store = configureStore({
  reducer: {
    pagination: paginationReducer,
  },
});

// import { paginationReducer, dataReducer } from '../reducers/reducer';

// const store = configureStore({
//   reducer: {
//     pagination: paginationReducer,
//     data: dataReducer,
//   },
// });

export default store;
