import fetch from 'isomorphic-fetch';
import config from '../configuration';
import { hashHistory } from 'react-router'

export function openAddOrganizationModal() {
  return { type: 'ADD_ORGANIZATION_MODAL_OPENED' };
}

export function closeAddOrganizationModal() {
  return { type: 'ADD_ORGANIZATION_MODAL_CLOSED' };
}

export function selectOrganization(orgId) {
  hashHistory.push('organizations/' + orgId);
  return { type: 'ORGANIZATION_SELECTED', payload: { orgId }};
}

export function loadOrganization(organization) {
  return { type: 'ORGANIZATION_ADDED', payload: { organization }};
}

export function loadOrganizations(organizations) {
  return { type: 'ORGANIZATIONS_LOADED', payload: { organizations }};
}

export function addOrganization(organization) {
  return async dispatch => {
    let response = await fetch(config.baseApiUrl + '/organizations', {
      method: 'POST',
      headers: {
        'Authorization': 'jwt ' + localStorage.getItem('token'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'name': organization.name
      })
    });
    let json = await response.json();
    dispatch(loadOrganization(json));
  }
}

export function fetchOrganizations() {
  return async dispatch => {
    let response = await fetch(config.baseApiUrl + '/organizations', {
      method: 'GET',
      headers: {
        'Authorization': 'jwt ' + localStorage.getItem('token'),
        'Content-Type': 'application/json'
      }
    });
    let json = await response.json();
    dispatch(loadOrganizations(json));
    /*dispatch(loadOrganizations([
      {
        orgId: 0,
        name: 'Covenant College',
        singers:
        [
          {
            singerId: 0,
            name: "Josh Humpherys",
            height: 67,
            voice: "Tenor 1",
            orgId: 0
          }
        ]
      },
      {
        orgId: 1,
        name: 'Christ Reformed Baptist Church'
      },
      {
        orgId: 2,
        name: 'LMPC'
      },
      {
        orgId: 3,
        name: 'Transportation and Security Administration'
      },
      {
        orgId: 4,
        name: 'Generic choir'
      },
      {
        orgId: 5,
        name: 'asdfasdfasdfafsd'
      },
      {
        orgId: 6,
        name: 'running out of names'
      }
    ]));*/
  }
}