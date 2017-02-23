import * as actionTypes from '../constants/actionTypes'

export default function organizations(state = { organizationsList: [], fetchingOrganizations: false }, action) {
  let organizationsList = [];
  switch (action.type) {
    case actionTypes.ORGANIZATION_ADDED:
      return {
        ...state,
        organizationsList: state.organizationsList.concat(action.payload.organization)
      };
    case actionTypes.ORGANIZATIONS_FETCHED:
      return { ...state, fetchingOrganizations: true };
    case actionTypes.ORGANIZATIONS_LOADED:
      return { ...state, organizationsList: action.payload.organizations, fetchingOrganizations: false };
    case actionTypes.ORGANIZATION_SELECTED:
      return state;
    case actionTypes.SINGER_ADDED:
      organizationsList = state.organizationsList.map(organization => {
        if(organization.orgId === action.payload.singer.orgId) {
          let updatedOrganization = Object.assign({}, organization);
          updatedOrganization.singers = (updatedOrganization.singers ? updatedOrganization.singers : []).concat(action.payload.singer);
          return updatedOrganization;
        } else {
          return organization;
        }
      });
      return { ...state, organizationsList };
    case actionTypes.SINGERS_LOADED:
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
    case actionTypes.ADD_SINGER_MODAL_OPENED:
      return { ...state, addSingerModalOpen: true };
    case actionTypes.ADD_SINGER_MODAL_CLOSED:
      return { ...state, addSingerModalOpen: false };
    case actionTypes.ADD_ORGANIZATION_MODAL_OPENED:
      return { ...state, addOrganizationModalOpen: true };
    case actionTypes.ADD_ORGANIZATION_MODAL_CLOSED:
      return { ...state, addOrganizationModalOpen: false };
    default:
      return state;
  }
}