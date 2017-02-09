export default function organizations(state = { organizationsList: [] }, action) {
  switch (action.type) {
    case 'ORGANIZATION_ADDED':
      return {
        ...state,
        organizationsList: state.organizationsList.concat(action.payload.organization),
        addOrganizationModalOpen: false
      };
    case 'ORGANIZATIONS_LOADED':
      return { ...state, organizationsList: action.payload.organizations };
    case 'ORGANIZATION_SELECTED':
      return { ...state, orgIdSelected: action.payload.orgId };
    case 'SINGER_ADDED':
      return {
        ...state,
        singersList: state.organizationsList[action.payload.orgId].singersList.concat(action.payload.singer),
        addSingerModalOpen: false
      };
    case 'SINGERS_LOADED':
      return { ...state, singersList: action.payload.singers };
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