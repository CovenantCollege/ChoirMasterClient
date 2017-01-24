export default function authentication(state = {
  isAuthenticated: localStorage.getItem('token') ? true : false,
  isAuthenticationFailed: false,
  user: false,
  token: localStorage.getItem('token')
}, action) {
  switch (action.type) {
    case 'LOGIN_REQUESTED':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticationFailed: false
      };
    case 'LOGOUT_REQUESTED':
      return {
        ...state,
        isAuthenticated: false,
        user: false,
        token: null
      }
    case 'AUTHENTICATION_FAILED':
      return { ...state, isAuthenticationFailed: true };
    default:
      return state;
  }
}