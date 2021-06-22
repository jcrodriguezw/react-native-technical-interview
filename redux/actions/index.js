import {LOGIN, ALL_BOOKS, LOGOUT} from '../constants';

export const allBooksAction = books => {
  return {
    type: ALL_BOOKS,
    payload: books,
  };
};

export const loginAction = user => {
  return {
    type: LOGIN,
    payload: user,
  };
};

export const logoutAction = () => {
  return {
    type: LOGOUT,
  };
};
