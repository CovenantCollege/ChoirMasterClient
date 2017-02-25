export const getOrgId = (state) => {
  const path = state.routing.locationBeforeTransitions.pathname;
  const pathPrefix = '/organizations/';
  return path.substring(pathPrefix.length);
};