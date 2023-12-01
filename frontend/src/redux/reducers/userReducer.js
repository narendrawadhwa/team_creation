// userReducer.js
import {
    GET_USERS_REQUEST,
    GET_USERS_SUCCESS,
    GET_USERS_FAILURE,
  } from '../constants/userConstants';
  
  const initialState = {
    users: [],
    currentPage: 1,
    totalPages: 1,
    loading: false,
    error: null,
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_USERS_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case GET_USERS_SUCCESS:
        return {
          ...state,
          users: action.payload.users,
          currentPage: action.payload.currentPage,
          totalPages: action.payload.totalPages,
          loading: false,
          error: null,
        };
      case GET_USERS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default userReducer;
  