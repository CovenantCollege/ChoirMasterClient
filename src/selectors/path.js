export const getOrgId = state => {
  const path = state.routing.locationBeforeTransitions.pathname;
  const pathPrefix = '/organizations/';
  return parseInt(path.substring(pathPrefix.length), 10);
};

export const getChoirId = state => {
  const path = state.routing.locationBeforeTransitions.pathname;
  const pathPrefix = '/choirs/';
  return parseInt(path.substring(path.indexOf(pathPrefix) + pathPrefix.length), 10);
};

export const getPerformanceId = state => {
  const path = state.routing.locationBeforeTransitions.pathname;
  const pathPrefix = '/performances/';
  return parseInt(path.substring(path.indexOf(pathPrefix) + pathPrefix.length), 10);
};