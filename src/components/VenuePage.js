import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Alert, Button, FormControl, FormGroup, Glyphicon, Table } from 'react-bootstrap'
import { fetchOrganizationsIfNeeded } from '../actions/organizations'
import { addPerformance } from '../actions/performances'
import { changePage } from '../actions/page'
import { isAuthenticated, getToken } from '../selectors/user'
import { getSelectedOrganization } from '../selectors/organizations'
import { getSelectedVenue } from '../selectors/venues'
import { getPerformances } from '../selectors/performances'
import dateformat from 'dateformat'

export class VenuePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
      dateInput: '',
      descriptionInput: '',
      dateInputInvalid: false,
      selected: []
    };

    this.fetchDataIfNeeded = this.fetchDataIfNeeded.bind(this);
    this.updateCheckboxes = this.updateCheckboxes.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
  }

  updateCheckboxes(choirId, isSelected) {
    if(!isSelected) {
      let selected = this.state.selected;
      selected.splice(selected.indexOf(choirId), 1);
      this.setState({ selected });
    } else {
      let selected = this.state.selected;
      selected.push(choirId);
      this.setState({ selected });
    }
  }

  saveChanges() {
    if(this.state.dateInput === '') {
      this.setState({ dateInputInvalid: true });
    } else {
      this.props.dispatch(addPerformance(this.props.token, this.props.orgId, this.props.venueId, {
        date: this.state.dateInput,
        description: this.state.descriptionInput,
        selected: this.state.selected
      }));
      this.setState({ isEditing: false, dateInputInvalid: false, dateInput: '', descriptionInput: '' });
    }
  }

  fetchDataIfNeeded() {
    this.props.dispatch(fetchOrganizationsIfNeeded(this.props.token));
  }

  componentWillMount() {
    this.fetchDataIfNeeded();
  }

  componentDidUpdate() {
    this.fetchDataIfNeeded();
  }

  render() {
    if (!this.props.isAuthenticated) {
      this.props.dispatch(changePage(''));
      return null;
    }
    if (this.props.selectedOrganization === undefined || this.props.selectedVenue === undefined) {
      return null;
    }

    // Viewing performances components
    let performancesHeader;
    let performancesTable;
    let addPerformanceButton;

    // Adding performance components
    let choirSelectionHeader;
    let choirSelectionTable;
    let savePerformanceButton;
    let performanceDateInput;
    let performanceDescriptionInput;

    if(this.state.isEditing) {
      choirSelectionHeader = <h3>Choirs</h3>;
      let choirs = this.props.selectedOrganization.choirs.map(choir => {
        return (
          <tr key={choir.choirId}>
            <td>
              <input type="checkbox" checked={this.state.selected ? this.state.selected.find(choirId => choirId === choir.choirId) : false}
                     onChange={e => this.updateCheckboxes(choir.choirId, e.target.checked)} />
            </td>
            <td>{choir.name}</td>
          </tr>
        );
      });
      choirSelectionTable = (
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>Selected</th>
              <th>Choir</th>
            </tr>
          </thead>
          <tbody>
            {choirs}
          </tbody>
        </Table>
      );
      savePerformanceButton = (
        <Button bsStyle="success" onClick={() => this.saveChanges()}>
          Save Performance
        </Button>
      );
      performanceDateInput = (
        <FormGroup validationState={this.state.dateInputInvalid ? 'error' : null}>
          <h3>Date</h3>
          <FormControl
            type="date"
            placeholder="Enter date"
            onChange={e => this.setState({ dateInput: e.target.value })}
            onKeyDown={this.onKeyDown}
            id="dateInput"
          />
          <FormControl.Feedback />
        </FormGroup>
      );
      performanceDescriptionInput = (
        <FormGroup>
          <h3>Date</h3>
          <FormControl
            type="text"
            placeholder="Enter description"
            onChange={e => this.setState({ descriptionInput: e.target.value })}
            onKeyDown={this.onKeyDown}
            id="descriptionInput"
          />
          <FormControl.Feedback />
        </FormGroup>
      );
    } else {
      performancesHeader = <h3>Performances</h3>;
      let performances = [];
      if(this.props.performances) {
        performances = this.props.performances.sort((a, b) => new Date(a.date) - new Date(b.date)).map(performance => {
          return (
            <tr key={performance.performanceId}>
              <td>{dateformat(performance.date, "mmmm d, yyyy")}</td>
              <td>{performance.description}</td>
              <td>
                <Button bsSize="xsmall" onClick={() => {
                  this.props.dispatch(changePage('organizations/' + this.props.selectedOrganization.orgId + '/performances/' + performance.performanceId))
                }}>View</Button>
              </td>
            </tr>
          );
        });
      }
      performancesTable = (
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            {performances}
          </tbody>
        </Table>
      );
      addPerformanceButton = (
        <Button bsStyle="success" onClick={() => this.setState({ isEditing: true })}>
          <Glyphicon glyph="plus" /> Add Performance
        </Button>
      );
    }

    if(this.props.selectedVenue) {
      return (
        <div className="container margined-children">
          <h2>
            {this.props.selectedVenue.name}
          </h2>
          <Button onClick={() => this.props.dispatch(changePage('/organizations/' + this.props.selectedOrganization.orgId))}>
            {this.props.selectedOrganization.name}
          </Button>
          {
            this.state.dateInputInvalid ? (
              <Alert bsStyle="danger">
                <strong>Error!</strong> Date cannot be left blank.
              </Alert>
            ): null
          }
          {performancesHeader}
          {performancesTable}
          {addPerformanceButton}
          {performanceDateInput}
          {performanceDescriptionInput}
          {choirSelectionHeader}
          {choirSelectionTable}
          {savePerformanceButton}
        </div>
      );
    } else {
      return null;
    }
  }
}

export default connect(
  (state, props) => {
    const orgId = parseInt(props.params.orgId, 10);
    const venueId = parseInt(props.params.venueId, 10);
    const selectedVenue = getSelectedVenue(state, orgId, venueId);
    return {
      isAuthenticated: isAuthenticated(state),
      token: getToken(state),
      selectedOrganization: getSelectedOrganization(state, orgId),
      performances: getPerformances(state, orgId, venueId),
      selectedVenue,
      orgId,
      venueId
    };
  }
)(VenuePage);