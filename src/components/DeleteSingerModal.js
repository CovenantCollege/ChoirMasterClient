import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Modal } from 'react-bootstrap'
import { deleteSingerFromOrganization, closeDeleteSingerModal } from '../actions/singers'
import { getToken } from '../selectors/user'
import { shouldShowModal, getModalData } from '../selectors/modal'
import { getOrgId } from '../selectors/path'
import { hideModal } from '../actions/modal'

export class DeleteSingerModal extends Component {
  render() {
    return (
      <Modal show={this.props.showModal}>
        <Modal.Header>
          <Modal.Title>Delete Singer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            Are you sure you want to delete singer "{this.props.modalData.singerName}?"
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="danger" onClick={() => {
            this.props.dispatch(hideModal());
            this.props.dispatch(deleteSingerFromOrganization(this.props.token, this.props.orgId, this.props.modalData.singerId))
          }}>
            Delete
          </Button>
          <Button onClick={() => this.props.dispatch(hideModal())}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default connect(
  state => ({
    token: getToken(state),
    showModal: shouldShowModal(state),
    modalData: getModalData(state),
    orgId: getOrgId(state)
  })
)(DeleteSingerModal);