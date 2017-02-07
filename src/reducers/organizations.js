export default function organizations(state = { organizationsList: [] }, action) {
  switch (action.type) {
    case 'ORGANIZATIONS_LOADED':
      return { ...state, organizationsList: action.payload.organizations };
    case 'ORGANIZATION_SELECTED':
      return { ...state, orgIdSelected: action.payload.orgId };
    default:
      return state;
  }
}