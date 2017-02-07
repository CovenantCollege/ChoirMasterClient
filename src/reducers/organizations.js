export default function organizations(state = { organizationsList: [] }, action) {
  switch (action.type) {
    case 'ORGANIZATIONS_LOADED':
      return { ...state, organizationsList: action.payload.organizations };
    default:
      return state;
  }
}