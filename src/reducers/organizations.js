import * as actionTypes from '../constants/actionTypes'

export default function organizations(state = { organizationsList: [], isFetching: false }, action) {
  let organizationsList = [];
  switch (action.type) {
    case actionTypes.ORGANIZATION_ADDED:
      return {
        ...state,
        organizationsList: state.organizationsList.concat(action.payload.organization)
      };
    case actionTypes.ORGANIZATION_SELECTED:
      return state;
    case actionTypes.ORGANIZATIONS_REQUESTED:
      return { ...state, isFetching: true };
    case actionTypes.ORGANIZATIONS_RECEIVED:
      return { ...state, organizationsList: action.payload.organizations, isFetching: false };
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
    case actionTypes.SINGER_DELETED_FROM_ORGANIZATION:
      organizationsList = state.organizationsList.map(organization => {
        if(organization.orgId === action.payload.orgId) {
          let updatedOrganization = JSON.parse(JSON.stringify(organization));
          let index = updatedOrganization.singers.findIndex(singer => singer.singerId === action.payload.singerId);
          if(index !== -1) {
            updatedOrganization.singers.splice(index, 1);
          }
          return updatedOrganization;
        } else {
          return organization;
        }
      });
      return { ...state, organizationsList };
    default:
      return state;
  }
}