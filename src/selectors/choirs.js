import { getOrgId } from './path'
import { getSelectedOrganization } from './organizations'

export const getChoirs = state => {
  const orgId = getOrgId(state);
  const selectedOrganization = getSelectedOrganization(state, orgId);
  return selectedOrganization ? selectedOrganization.choirs || [] : undefined;
};

export const getChoirsInOrganization = (state, orgId) => {
  const selectedOrganization = getSelectedOrganization(state, orgId);
  return selectedOrganization ? selectedOrganization.choirs || [] : undefined;
};

export const getSelectedChoir = (state, orgId, choirId) => {
  const selectedOrganization = getSelectedOrganization(state, orgId);
  if(selectedOrganization) {
    return selectedOrganization.choirs.find(choir => choir.choirId === choirId);
  } else {
    return undefined;
  }
};