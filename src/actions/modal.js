import * as actionTypes from '../constants/actionTypes'

export function showModal(modalType, data) {
  return { type: actionTypes.SHOW_MODAL, payload: { modalType, data } };
}

export function hideModal() {
  return { type: actionTypes.HIDE_MODAL };
}