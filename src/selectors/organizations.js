export const getOrganizations = state => state.organizations.organizationsList;

export const getSelectedOrganization = (state, orgId) => state.organizations.organizationsList[orgId];

export const getAddOrganizationModalOpen = state => state.organizations.addOrganizationModalOpen;

export const getFetchingOrganizations = state => state.organizations.fetchingOrganizations;