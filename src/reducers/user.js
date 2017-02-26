import * as actionTypes from '../constants/actionTypes'

function getToken() {
  if(!(Window.localStorage === undefined)) {
    return Window.localStorage.getItem('token');
  } else {
   return null;
  }
}

export default function authentication(state = {
  isAuthenticated: getToken() ? true : false,
  isAuthenticationFailed: false,
  email: null,
  token: getToken()
}, action) {
  switch (action.type) {
    case actionTypes.LOGIN_REQUESTED:
      return {
        ...state,
        isAuthenticated: true,
        email: action.payload.email,
        token: action.payload.token,
        isAuthenticationFailed: false
      };
    case actionTypes.LOGOUT_REQUESTED:
      return {
        ...state,
        isAuthenticated: false,
        user: false,
        token: null
      };
    case actionTypes.AUTHENTICATION_FAILED:
      return { ...state, isAuthenticationFailed: true };
    case actionTypes.PASSWORD_CHANGED:
      return { ...state, email: null, isAuthenticated: false, token: null };
    default:
      return state;
  }
}