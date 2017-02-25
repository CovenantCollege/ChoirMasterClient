import * as actionTypes from '../constants/actionTypes'

export function showModal(modalType) {
  return { type: actionTypes.SHOW_MODAL, payload: { modalType } };
}

export function hideModal() {
  return { type: actionTypes.HIDE_MODAL };
}