import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Alert, Button } from 'react-bootstrap'
import { changePage } from '../actions/page'
import { isAuthenticated, getToken, getEmail } from '../selectors/user'
import { showModal } from '../actions/modal'
import * as modalTypes from '../constants/modalTypes'
import { changePasswordFailed, getError } from '../selectors/failedRequests'
import { clearChangePasswordFailed } from '../actions/user'

export class SettingsPage extends Component {
  render() {
    if(!this.props.isAuthenticated) {
      this.props.dispatch(changePage(''));
      return null;
    }
    return (
      <div className="container">
        {
          this.props.changePasswordFailed ?
            (
              <Alert bsStyle="danger">
                <strong>Error!</strong> {this.props.error}
              </Alert>
            ) : null
        }
        <h2>
          {this.props.email}
        </h2>
        <Button onClick={() => {
          this.props.dispatch(clearChangePasswordFailed());
          this.props.dispatch(showModal(modalTypes.CHANGE_PASSWORD_MODAL));
        }}>
          Change password
        </Button>
      </div>
    );
  }
}

export default connect(
  state => ({
    isAuthenticated: isAuthenticated(state),
    token: getToken(state),
    email: getEmail(state),
    changePasswordFailed: changePasswordFailed(state),
    error: getError(state)
  })
)(SettingsPage);