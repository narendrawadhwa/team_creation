// userActions.js
import axios from 'axios';
import {
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USERS_FAILURE,
} from '../constants/userConstants';

export const getUsers = (page, filters) => async (dispatch) => {
  try {
    dispatch({ type: GET_USERS_REQUEST });

    const response = await axios.get(`http://localhost:3000/api/users?page=${page}`, {
      params: filters,
    });

    dispatch({
      type: GET_USERS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_USERS_FAILURE,
      payload: error.response?.data || { message: 'Internal server error' },
    });
  }
};
