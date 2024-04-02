// reducer.js
import { SET_CURRENT_PAGE, SET_DATA } from './actionTypes';

const initialState = {
  currentPage: 0,
  data: [],
};

const paginationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };
    case SET_DATA:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

export default paginationReducer;
