export const getOrganizations = state => state.organizations.organizationsList;
export const getSelectedOrganization = (state, orgId) => state.organizations.organizationsList.find(organization => organization.orgId === orgId);
export const getAddOrganizationModalOpen = state => state.organizations.addOrganizationModalOpen;
export const isFetchingOrganizations = state => state.organizations.isFetching;