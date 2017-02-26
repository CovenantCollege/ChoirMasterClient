import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getToken } from '../selectors/user'
import { getModalType } from '../selectors/modal'
import * as modalTypes from '../constants/modalTypes'

import AddOrganizationModal from '../components/AddOrganizationModal'
import AddSingerModal from '../components/AddSingerModal'
import AddChoirModal from '../components/AddChoirModal'
import DeleteSingerModal from '../components/DeleteSingerModal'
import ChangePasswordModal from '../components/ChangePasswordModal'

export class ModalContainer extends Component {

  render() {
    switch(this.props.modalType) {
      case modalTypes.ADD_ORGANIZATION_MODAL:
        return <AddOrganizationModal />;
      case modalTypes.ADD_SINGER_MODAL:
        return <AddSingerModal />;
      case modalTypes.ADD_CHOIR_MODAL:
        return <AddChoirModal />;
      case modalTypes.DELETE_SINGER_MODAL:
        return <DeleteSingerModal />;
      case modalTypes.CHANGE_PASSWORD_MODAL:
        return <ChangePasswordModal />;
      default:
        return null;
    }
  }
}

export default connect(
  state => ({
    token: getToken(state),
    modalType: getModalType(state)
  })
)(ModalContainer);