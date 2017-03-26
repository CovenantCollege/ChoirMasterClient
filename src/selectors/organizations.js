export const getOrganizations = state => state.organizations.organizationsList;
export const getSelectedOrganization = (state, orgId) => state.organizations.organizationsList.find(organization => organization.orgId === orgId);
export const isFetchingOrganizations = state => state.organizations.isFetching;
export const getOrganizationTabSelected = state => state.organizations.organizationTabSelected;