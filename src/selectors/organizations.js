export const getOrganizations = state => state.organizations.organizationsList;

export const getSelectedOrganization = state => state.organizations.organizationsList[state.organizations.orgIdSelected];