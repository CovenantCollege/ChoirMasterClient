import { getSelectedOrganization } from './organizations';

export const getPerformances = (state, orgId, venueId) => {
  const selectedOrganization = getSelectedOrganization(state, orgId);
  if(selectedOrganization === undefined) {
    return [];
  } else {
    return selectedOrganization.performances.filter(performance => performance.venueId === venueId);
  }
};

export const getSelectedPerformance = (state, orgId, performanceId) => {
  const selectedOrganization = getSelectedOrganization(state, orgId);
  if(selectedOrganization) {
    return selectedOrganization.performances.find(performance => performance.performanceId === performanceId);
  } else {
    return undefined;
  }
};