export const getSingers = (state, orgId) => state.organizations.organizationsList[orgId].singers;

export const getAddSingerModalOpen = state => state.organizations.addSingerModalOpen;

export const getDeleteSingerFromOrganizationModalOpen = state => state.organizations.deleteSingerFromOrganizationModalOpen;

export const getSelectedSinger = (state, orgId) => state.organizations.find(organization => organization.orgId === orgId).singers.find(singer => singer.singerId === state.organizations.selectedSingerId);

export const getSelectedSingerId = state => state.organizations.selectedSingerId;