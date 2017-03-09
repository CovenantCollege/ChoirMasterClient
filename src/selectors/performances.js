import { getSelectedOrganization } from './organizations';

export const getPerformances = (state, orgId, venueId) => {
  const selectedOrganization = getSelectedOrganization(state, orgId);
  if(selectedOrganization === undefined) {
    return [];
  } else {
    return selectedOrganization.performances.filter(performance => performance.venueId === venueId);
  }
};