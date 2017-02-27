import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Alert, Button, Table } from 'react-bootstrap'
import { fetchOrganizationsIfNeeded } from '../actions/organizations'
import { fetchSingersIfNeeded } from '../actions/singers'
import { editChoir, clearEditChoirFailed } from '../actions/choirs'
import { changePage } from '../actions/page'
import { isAuthenticated, getToken } from '../selectors/user'
import { getSelectedOrganization } from '../selectors/organizations'
import { getSelectedChoir } from '../selectors/choirs'
import { editChoirFailed } from '../selectors/failedRequests'

export class ChoirPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
      selected: undefined
    };

    this.fetchDataIfNeeded = this.fetchDataIfNeeded.bind(this);
    this.initCheckboxes = this.initCheckboxes.bind(this);
    this.updateCheckboxes = this.updateCheckboxes.bind(this);
    this.startEditing = this.startEditing.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
  }

  initCheckboxes(selectedOrganization, selectedChoir) {
    let selected = [];
    selectedOrganization.singers.forEach(singer => {
      if(selectedChoir.singers.find(choirSinger => choirSinger.singerId === singer.singerId ? true : false)) {
        selected.push(singer.singerId);
      }
    });
    this.setState({ selected });
  }

  updateCheckboxes(singerId, isSelected) {
    if(!isSelected) {
      let selected = this.state.selected;
      selected.splice(selected.indexOf(singerId), 1);
      this.setState({ selected });
    } else {
      let selected = this.state.selected;
      selected.push(singerId);
      this.setState({ selected });
    }
  }

  fetchDataIfNeeded() {
    this.props.dispatch(fetchOrganizationsIfNeeded(this.props.token));
    if(!(this.props.selectedChoir === undefined)) {
      this.props.dispatch(fetchSingersIfNeeded(this.props.token, this.props.orgId, this.props.choirId));
    }
  }
  
  startEditing() {
    this.setState({ isEditing: true });
    this.props.dispatch(clearEditChoirFailed());
  }

  saveChanges() {
    this.props.dispatch(editChoir(this.props.token, this.props.orgId, this.props.choirId, this.state.selected));
    this.setState({ isEditing: false });
  }

  componentWillMount() {
    this.fetchDataIfNeeded();
  }

  componentWillUpdate(nextProps, nextState) {
    if(nextState.selected === undefined && !(nextProps.selectedChoir === undefined) && !(nextProps.selectedChoir.singers === undefined)) {
      this.initCheckboxes(nextProps.selectedOrganization, nextProps.selectedChoir);
    }
  }

  componentDidUpdate() {
    this.fetchDataIfNeeded();
  }

  render() {
    if (!this.props.isAuthenticated) {
      this.props.dispatch(changePage(''));
      return null;
    }
    if (this.props.selectedOrganization === undefined || this.props.selectedChoir === undefined) {
      return null;
    }

    let singers = [];
    let header = null;
    if(this.props.selectedChoir.singers) {
      if (this.state.isEditing) {
        singers = this.props.selectedOrganization.singers.map(singer => {
          return (
            <tr key={singer.singerId}>
              <td>
                <input type="checkbox" checked={this.state.selected ? this.state.selected.find(singerId => singerId === singer.singerId) : false}
                    onChange={e => this.updateCheckboxes(singer.singerId, e.target.checked)} />
              </td>
              <td>{singer.name}</td>
              <td>{singer.height}</td>
              <td>{singer.voice}</td>
            </tr>
          );
        });
        header = (
          <tr>
            <th>Selected</th>
            <th>Name</th>
            <th>Height</th>
            <th>Voice</th>
          </tr>
        );
      } else {
        singers = this.props.selectedChoir.singers.map(singer => {
          return (
            <tr key={singer.singerId}>
              <td>{singer.name}</td>
              <td>{singer.height}</td>
              <td>{singer.voice}</td>
            </tr>
          );
        });
        header = (
          <tr>
            <th>Name</th>
            <th>Height</th>
            <th>Voice</th>
          </tr>
        );
      }
    }

    return (
      <div className="container margined-children">
        {
          this.props.editChoirFailed ?
            (
              <Alert bsStyle="danger">
                <strong>Error!</strong> We were unable to update the choir.
              </Alert>
            ) : null
        }
        <h2>
          {this.props.selectedChoir.name}
        </h2>
        <Button onClick={() => changePage('/organizations/' + this.props.selectedOrganization.orgId)}>
          {this.props.selectedOrganization.name}
        </Button>
        <form>
          <Table striped bordered condensed hover>
            <thead>
              {header}
            </thead>
            <tbody>
              {singers}
            </tbody>
          </Table>
        </form>
        <Button bsStyle={this.state.isEditing ? 'success' : 'primary'} onClick={() => {
          this.state.isEditing ? this.saveChanges() : this.startEditing()
        }}>{this.state.isEditing ? 'Save changes' : 'Edit choir'}</Button>
      </div>
    );
  }
}

export default connect(
  (state, props) => {
    const orgId = parseInt(props.params.orgId, 10);
    const choirId = parseInt(props.params.choirId, 10);
    const selectedChoir = getSelectedChoir(state, orgId, choirId);
    return {
      isAuthenticated: isAuthenticated(state),
      token: getToken(state),
      selectedOrganization: getSelectedOrganization(state, orgId),
      selectedChoir,
      orgId,
      choirId,
      editChoirFailed: editChoirFailed(state)
    };
  }
)(ChoirPage);