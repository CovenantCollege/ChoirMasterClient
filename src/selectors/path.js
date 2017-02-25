export const getOrgId = (state) => {
  const path = state.routing.locationBeforeTransitions.pathname;
  const pathPrefix = '/organizations/';
  return parseInt(path.substring(pathPrefix.length), 10);
};