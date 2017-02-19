import * as userActions from '../actions/user'
import * as organizationsActions from '../actions/organizations'
import * as singersActions from '../actions/singers'
import * as pageActions from '../actions/page'
import * as actionTypes from '../constants/actionTypes'

describe('actions', () => {
  describe('user.js', () => {
    it('creates an action to login a user', () => {
      const token = 'tokan';
      const email = 'email';
      const payload = {
        token,
        email
      };
      const expectedAction = {
        type: actionTypes.LOGIN_REQUESTED,
        payload
      };
      expect(userActions.loginUser(token, email)).toEqual(expectedAction);
    });

    it('creates an action to logout a user', () => {
      const expectedAction = {
        type: actionTypes.LOGOUT_REQUESTED
      };
      expect(userActions.logoutUser()).toEqual(expectedAction);
    });

    it('creates an action to fail authentication', () => {
      const expectedAction = {
        type: actionTypes.AUTHENTICATION_FAILED
      };
      expect(userActions.failAuthentication()).toEqual(expectedAction);
    });
  });

  describe('organizations.js', () => {
    it('creates an action to open a modal for adding an organization', () => {
      const expectedAction = {
        type: actionTypes.ADD_ORGANIZATION_MODAL_OPENED
      };
      expect(organizationsActions.openAddOrganizationModal()).toEqual(expectedAction);
    });

    it('creates an action to close a modal for adding an organization', () => {
      const expectedAction = {
        type: actionTypes.ADD_ORGANIZATION_MODAL_CLOSED
      };
      expect(organizationsActions.closeAddOrganizationModal()).toEqual(expectedAction);
    });

    it('creates an action to select an organization', () => {
      const orgId = 0;
      const expectedAction = {
        type: actionTypes.ORGANIZATION_SELECTED,
        payload: { orgId }
      };
      expect(organizationsActions.selectOrganization(orgId)).toEqual(expectedAction);
    });

    it('creates an action to load an organization', () => {
      const organization = {
        orgId: 0,
        name: '',
        singers: []
      };
      const expectedAction = {
        type: actionTypes.ORGANIZATION_ADDED,
        payload: { organization }
      };
      expect(organizationsActions.loadOrganization(organization)).toEqual(expectedAction);
    });

    it('creates an action to load organizations', () => {
      const organizations = [
        {
          orgId: 0,
          name: 'org0',
          singers: []
        },
        {
          orgId: 1,
          name: 'organization 1',
          singers: [
            {
              name: 'name',
              height: 67,
              voice: 'soprano1',
              orgId: 1,
              singerId: 0
            }
          ]
        }
      ];
      const expectedAction = {
        type: actionTypes.ORGANIZATIONS_LOADED,
        payload: { organizations }
      };
      expect(organizationsActions.loadOrganizations(organizations)).toEqual(expectedAction);
    });

    it('creates an action to fail adding an organization', () => {
      const error = {
        error: 'lol this is an error'
      };
      const expectedAction = {
        type: actionTypes.ADD_ORGANIZATION_FAILED,
        payload: { error }
      };
      expect(organizationsActions.failAddOrganization(error)).toEqual(expectedAction);
    });

    it('creates an action to clear failed adding an organization', () => {
      const expectedAction = {
        type: actionTypes.ADD_ORGANIZATION_FAILED_CLEARED
      };
      expect(organizationsActions.clearAddOrganizationFailed()).toEqual(expectedAction);
    });
  });

  describe('singer.js', () => {
    it('creates an action to open a modal for adding a singer', () => {
      const expectedAction = {
        type: actionTypes.ADD_SINGER_MODAL_OPENED
      };
      expect(singersActions.openAddSingerModal()).toEqual(expectedAction);
    });

    it('creates an action to close a modal for adding a singer', () => {
      const expectedAction = {
        type: actionTypes.ADD_SINGER_MODAL_CLOSED
      };
      expect(singersActions.closeAddSingerModal()).toEqual(expectedAction);
    });

    it('creates an action to load a singer', () => {
      const singer = {
        name: 'name',
        height: 67,
        voice: 'soprano1',
        orgId: 1,
        singerId: 0
      };
      const expectedAction = {
        type: actionTypes.SINGER_ADDED,
        payload: { singer }
      };
      expect(singersActions.loadSinger(singer)).toEqual(expectedAction);
    });

    it('creates an action to load singers', () => {
      const singers = [
        {
          name: 'name',
          height: 67,
          voice: 'soprano1',
          orgId: 0,
          singerId: 0
        },
        {
          name: 'another name',
          height: 89,
          voice: 'bass2',
          orgId: 0,
          singerId: 1
        }
      ];
      const expectedAction = {
        type: actionTypes.SINGERS_LOADED,
        payload: { singers }
      };
      expect(singersActions.loadSingers(singers)).toEqual(expectedAction);
    });

    it('creates an action to fail adding a singer', () => {
      const error = {
        error: 'lol this is an error'
      };
      const expectedAction = {
        type: actionTypes.ADD_SINGER_FAILED,
        payload: { error }
      };
      expect(singersActions.failAddSinger(error)).toEqual(expectedAction);
    });

    it('creates an action to clear failed adding a singer', () => {
      const expectedAction = {
        type: actionTypes.ADD_SINGER_FAILED_CLEARED
      };
      expect(singersActions.clearAddSingerFailed()).toEqual(expectedAction);
    });
  });

  describe('page.js', () => {
    it('creates an action to change page and clear all failed request errors', () => {
      const page = '';
      const expectedAction = {
        type: actionTypes.FAILED_REQUESTS_CLEARED
      };
      expect(pageActions.changePage(page)).toEqual(expectedAction);
    })
  });
});