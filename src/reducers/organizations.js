export default function organizations(state = { organizationsList: [], fetchingOrganizations: false }, action) {
  let organizationsList = [];
  switch (action.type) {
    case 'ORGANIZATION_ADDED':
      return {
        ...state,
        organizationsList: state.organizationsList.concat(action.payload.organization),
        addOrganizationModalOpen: false
      };
    case 'ORGANIZATIONS_FETCHED':
      return { ...state, fetchingOrganizations: true };
    case 'ORGANIZATIONS_LOADED':
      return { ...state, organizationsList: action.payload.organizations, fetchingOrganizations: false };
    case 'ORGANIZATION_SELECTED':
      return state;
    case 'SINGER_ADDED':
      organizationsList = state.organizationsList.map(organization => {
        if(organization.orgId === action.payload.singer.orgId) {
          let updatedOrganization = Object.assign({}, organization);
          updatedOrganization.singers = (updatedOrganization.singers ? updatedOrganization.singers : []).concat(action.payload.singer);
          return updatedOrganization;
        } else {
          return organization;
        }
      });
      return { ...state, organizationsList, addSingerModalOpen: false };
    case 'SINGERS_LOADED':
      organizationsList = state.organizationsList.map(organization => {
        if(organization.orgId === action.payload.orgId) {
          let updatedOrganization = Object.assign({}, organization);
          updatedOrganization.singers = action.payload.singers;
          return updatedOrganization;
        } else {
          return organization;
        }
      });
      return { ...state, organizationsList };
    case 'ADD_SINGER_MODAL_OPENED':
      return { ...state, addSingerModalOpen: true };
    case 'ADD_SINGER_MODAL_CLOSED':
      return { ...state, addSingerModalOpen: false };
    case 'ADD_ORGANIZATION_MODAL_OPENED':
      return { ...state, addOrganizationModalOpen: true };
    case 'ADD_ORGANIZATION_MODAL_CLOSED':
      return { ...state, addOrganizationModalOpen: false };
    default:
      return state;
  }
}