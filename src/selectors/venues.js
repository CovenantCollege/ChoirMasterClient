import { getOrgId } from './path'
import { getSelectedOrganization } from './organizations'

export const getVenues = state => {
  const orgId = getOrgId(state);
  const selectedOrganization = getSelectedOrganization(state, orgId);
  return selectedOrganization ? selectedOrganization.venues || [] : undefined;
};

export const getSelectedVenue = (state, orgId, venueId) => {
  const selectedOrganization = getSelectedOrganization(state, orgId);
  if(selectedOrganization) {
    return selectedOrganization.venues.find(venue => venue.venueId === venueId);
  } else {
    return undefined;
  }
};