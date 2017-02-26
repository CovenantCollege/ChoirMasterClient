export const isAuthenticated = state => state.user.isAuthenticated;
export const getIsAuthenticationFailed = state => state.user.isAuthenticationFailed;
export const getToken = state => state.user.token;
export const getEmail = state => state.user.email;