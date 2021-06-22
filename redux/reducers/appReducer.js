import {ALL_BOOKS, LOGIN, LOGOUT} from '../constants';

const initialState = {
  books: [],
  user: null,
};

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_BOOKS:
      return {
        ...state,
        books: action.payload,
      };
    case LOGIN:
      return {
        ...state,
        user: action.payload,
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};
