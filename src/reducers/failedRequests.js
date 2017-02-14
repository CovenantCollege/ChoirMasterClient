export default function failedRequests(state = {}, action) {
  switch(action.type) {
    case 'ADD_SINGER_FAILED':
      return { ...state, addSingerFailed: true };
    case 'ADD_SINGER_FAILED_CLEARED':
      return { ...state, addSingerFailed: false };
    case 'ADD_ORGANIZATION_FAILED':
      return { ...state, addOrganizationFailed: true };
    case 'ADD_ORGANIZATION_FAILED_CLEARED':
      return { ...state, addOrganizationFailed: false };
    case 'FAILED_REQUESTS_CLEARED':
      return {};
    default:
      return state;
  }
}