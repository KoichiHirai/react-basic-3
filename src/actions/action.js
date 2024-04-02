import { SET_CURRENT_PAGE, SET_DATA } from './actionTypes';

export const setCurrentPage = (page) => ({
  type: SET_CURRENT_PAGE,
  payload: page,
});

export const setData = (data) => ({
  type: SET_DATA,
  payload: data,
});
