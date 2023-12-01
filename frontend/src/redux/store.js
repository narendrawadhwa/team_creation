// store.js
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import userReducer from './reducers/userReducer'; // Update the path accordingly

const initialState = {
  user: {
    users: [],
    currentPage: 1,
    totalPages: 1,
    loading: false,
    error: null,
  },
  // Add other initial states if any
};

const store = createStore(
  userReducer, // Since you only have one reducer
  initialState,
  applyMiddleware(thunk)
);

export default store;
