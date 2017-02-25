import * as actionTypes from '../constants/actionTypes'

export default function modal(state = { showModal: false, modalType: '' }, action) {
  switch (action.type) {
    case actionTypes.SHOW_MODAL:
      return { ...state, showModal: true, modalType: action.payload.modalType, data: action.payload.data };
    case actionTypes.HIDE_MODAL:
      return { ...state, showModal: false };
    default:
      return state;
  }
}