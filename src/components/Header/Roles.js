import React, { Component, PropTypes } from 'react';
import { hashHistory } from 'react-router';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import _map from 'lodash/map';

class Role extends Component {
  static get contextTypes() {
    return {
      router: React.PropTypes.object.isRequired
    };
  }

  componentWillMount() {
    this.hanldeRoleChange(localStorage.getItem('roleName'), 0);
  }

  hanldeRoleChange = (value, redirect = 1) => {
    let rolevalue = 'GPC';
    switch (value) {
      case 'Global Plan Coordinator':
        rolevalue = 'GPC';
        break;
      case 'Site Plan Coordinator':
        rolevalue = 'SPC';
        break;
      case 'Site Plan Reviewer':
        rolevalue = 'SPR';
        break;
      case 'Author':
        rolevalue = 'MPA';
        break;
      case 'Site Reviewer':
        rolevalue = 'SR';
        break;
      case 'Site QA Reviewer':
        rolevalue = 'SQAR';
        break;
      case 'Site Manager':
        rolevalue = 'SM';
        break;
      case 'Global Manager':
        rolevalue = 'GBM';
        break;
      case 'Global Reviewer':
        rolevalue = 'GBR';
        break;
      case 'Upload Author-Global':
        rolevalue = 'Author';
        break;
      case 'Upload Reviewer-Global':
        rolevalue = 'Approver';
        break;
      case 'Upload Author-Site':
        rolevalue = 'Author';
        break;
      case 'Upload Reviewer-Site':
        rolevalue = 'Approver';
        break;
      case 'EQARP Upload Author - Global':
        rolevalue = 'Author';
        break;
      case 'EQARP Upload Reviewer - Global':
        rolevalue = 'Approver';
        break;
      case 'EQARP Upload Reviewer - Site':
        rolevalue = 'Author';
        break;
      case 'EQARP Upload Author - Site':
        rolevalue = 'Approver';
        break;
      default:
        break;
    }
    localStorage.setItem('role', rolevalue);
    localStorage.setItem('roleName', value);
    if (redirect) {
      this.context.router.push('/home');
    }
  }

  render() {
    return (
      <RadioButtonGroup
        name="status"
        className="roleList"
        defaultSelected={localStorage.getItem('roleName') || 'Global Plan Coordinator'}
      >
        {_map(this.props.usrRoles, (role, i) => (
          <RadioButton
            className="RoleName"
            value={role.roleName}
            onClick={() => this.hanldeRoleChange(role.roleName)}
            label={role.roleName}
          />
        ))}
      </RadioButtonGroup>
    );
  }
}

export default Role;
