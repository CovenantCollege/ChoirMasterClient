export const getSingers = (state, orgId) => state.organizations.organizationsList[orgId].singers;

export const getAddSingerModalOpen = state => state.organizations.addSingerModalOpen;