import * as actionTypes from '../constants/actionTypes'

export default function organizations(state = { organizationsList: [], isFetching: false, isFetchingSingersForChoir: [], organizationTabSelected: 'choirs' }, action) {
  let organizationsList = [];
  switch (action.type) {
    case actionTypes.ORGANIZATION_ADDED:
      return {
        ...state,
        organizationsList: state.organizationsList.concat(action.payload.organization),
      };
      case actionTypes.ORGANIZATION_SELECTED:
      return {...state, organizationTabSelected: 'choirs' };
    case actionTypes.ORGANIZATIONS_REQUESTED:
      return { ...state, isFetching: true };
    case actionTypes.ORGANIZATIONS_RECEIVED:
      return { ...state, organizationsList: action.payload.organizations, isFetching: false };
    case actionTypes.SINGERS_REQUESTED:
      return { ...state, isFetchingSingersForChoir: state.isFetchingSingersForChoir.concat(action.payload.choirId) };
    case actionTypes.SINGERS_RECEIVED:
      organizationsList = state.organizationsList.map(organization => {
        if(organization.orgId === action.payload.orgId) {
          let updatedOrganization = Object.assign({}, organization);
          let updatedChoirs = updatedOrganization.choirs.map(choir => {
            if(choir.choirId === action.payload.choirId) {
              let updatedChoir = Object.assign({}, choir);
              updatedChoir.singers = action.payload.singers;
              return updatedChoir;
            } else {
              return choir;
            }
          });
          updatedOrganization.choirs = updatedChoirs;
          return updatedOrganization;
        } else {
          return organization;
        }
      });
      let updatedIsFetchingSingersForChoir = JSON.parse(JSON.stringify(state.isFetchingSingersForChoir));
      updatedIsFetchingSingersForChoir.splice(state.isFetchingSingersForChoir.findIndex(choirId => choirId === action.payload.choirId), 1);
      return { ...state, organizationsList, isFetchingSingersForChoir: updatedIsFetchingSingersForChoir };
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
    case actionTypes.CHOIR_SELECTED:
      return state;
    case actionTypes.CHOIR_ADDED:
      organizationsList = state.organizationsList.map(organization => {
        if(organization.orgId === action.payload.choir.orgId) {
          let updatedOrganization = Object.assign({}, organization);
          updatedOrganization.choirs = (updatedOrganization.choirs ? updatedOrganization.choirs : []).concat(action.payload.choir);
          return updatedOrganization;
        } else {
          return organization;
        }
      });
      return { ...state, organizationsList };
    case actionTypes.CHOIR_EDITED:
      organizationsList = state.organizationsList.map(organization => {
        if(organization.orgId === action.payload.orgId) {
          let updatedOrganization = Object.assign({}, organization);
          updatedOrganization.choirs = updatedOrganization.choirs.map(choir => {
            if(choir.choirId === action.payload.choirId) {
              let updatedChoir = Object.assign({}, choir);
              let updatedSingers = [];
              organization.singers.forEach(singer => {
                if(action.payload.selectedSingerIds.find(singerId => singerId === singer.singerId)) {
                  updatedSingers.push(singer);
                }
              });
              updatedChoir.singers = updatedSingers;
              return updatedChoir;
            } else {
              return choir;
            }
          });
          return updatedOrganization;
        } else {
          return organization;
        }
      });
      return { ...state, organizationsList };
    case actionTypes.CHOIRS_LOADED:
      organizationsList = state.organizationsList.map(organization => {
        if(organization.orgId === action.payload.orgId) {
          let updatedOrganization = Object.assign({}, organization);
          updatedOrganization.choirs = action.payload.choirs;
          return updatedOrganization;
        } else {
          return organization;
        }
      });
      return { ...state, organizationsList };
    case actionTypes.CHOIR_DELETED:
      organizationsList = state.organizationsList.map(organization => {
        if(organization.orgId === action.payload.orgId) {
          let updatedOrganization = JSON.parse(JSON.stringify(organization));
          let index = updatedOrganization.choirs.findIndex(choir => choir.choirId === action.payload.choirId);
          if(index !== -1) {
            updatedOrganization.choirs.splice(index, 1);
          }
          return updatedOrganization;
        } else {
          return organization;
        }
      });
      return { ...state, organizationsList };
    case actionTypes.VENUE_SELECTED:
      return state;
    case actionTypes.VENUE_ADDED:
      organizationsList = state.organizationsList.map(organization => {
        if(organization.orgId === action.payload.venue.orgId) {
          let updatedOrganization = Object.assign({}, organization);
          updatedOrganization.venues = (updatedOrganization.venues ? updatedOrganization.venues : []).concat(action.payload.venue);
          return updatedOrganization;
        } else {
          return organization;
        }
      });
      return { ...state, organizationsList };
    case actionTypes.VENUES_LOADED:
      organizationsList = state.organizationsList.map(organization => {
        if(organization.orgId === action.payload.orgId) {
          let updatedOrganization = Object.assign({}, organization);
          updatedOrganization.venues = action.payload.venues;
          return updatedOrganization;
        } else {
          return organization;
        }
      });
      return { ...state, organizationsList };
    case actionTypes.ORGANIZATION_TAB_SELECTED:
      return { ...state, organizationTabSelected: action.payload.tab };
    case actionTypes.PERFORMANCE_ADDED:
      organizationsList = state.organizationsList.map(organization => {
        if (organization.orgId === action.payload.orgId) {
          let updatedOrganization = Object.assign({}, organization);
          updatedOrganization.performances = (updatedOrganization.performances ? updatedOrganization.performances : []).concat(action.payload.performance);
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