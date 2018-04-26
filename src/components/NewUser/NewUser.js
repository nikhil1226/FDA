import React from 'react';
import { connect } from 'react-redux';
import { hashHistory, Link } from 'react-router';
import ReactSuperSelect from 'react-super-select';
import { SvgiEqarpHub } from '../SVGIcons';

import './NewUser.scss';
import {
  getAllApplicationHeader,
  updateApplicationHeaderData,
  getAllLevelLists,
  updateUserFormApprover,
  updateUserSiteData,
  updateGlobalApproverData,
  updateUserRoleData,
  updateUserLevelData,
  updateUserFormDescription,
  updateUserFormUserID,
  createNewUser,
  userLdapAuthenticate
} from './../../actions/UserManagerActions';

class NewUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLevel: false
    };
  }
  componentWillMount() {
    this.props.dispatch(userLdapAuthenticate());
    this.props.dispatch(getAllApplicationHeader());
  }

  updateApplicationHeader = value => {
    if (typeof value !== 'undefined') {
      this.props.dispatch(updateApplicationHeaderData(value.applicationRecordId));
      const isGlobal = 0;
      this.props.dispatch(getAllLevelLists(value.applicationRecordId, isGlobal));
      this.setState({ applicationErrorText: '', selectedLevel: false });
    }
  }

  updateLevel = value => {
    if (typeof value !== 'undefined') {
      if (value.level === 'Global') {
        this.setState({ selectedLevel: true });
      } else {
        this.setState({ selectedLevel: false });
      }
      this.props.dispatch(updateUserLevelData(value.level));
      this.setState({ levelErrorText: '' });
    }
  }

  updateRole = value => {
    if (typeof value !== 'undefined') {
      this.props.dispatch(updateUserRoleData(value.roleRecordId));
      if (this.state.selectedLevel) {
        this.props.dispatch(updateGlobalApproverData(value.roleRecordId));
      }
      this.setState({ roleErrorText: '' });
    }
  }

  updateSite = value => {
    if (typeof value !== 'undefined') {
      this.props.dispatch(updateUserSiteData(value.ObjectValue));
      this.setState({ siteErrorText: '', approverErrorText: '' });
    }
  }

  updateApprover = value => {
    if (typeof value !== 'undefined') {
      this.props.dispatch(
        updateUserFormApprover(
          value
        )
      );
      this.setState({ approverErrorText: '' });
    }
  }

  updateDescriptionText = event => {
    this.props.dispatch(
      updateUserFormDescription(
        event.target.value
      )
    );
    this.setState({ descriptionErrorText: '' });
  }

  updateUserId = event => {
    this.props.dispatch(
      updateUserFormUserID(
        event.target.value
      )
    );
    this.setState({ userIdErrorText: '' });
  }

  saveUser = () => {
    this.validateUserForm();
  }

  validateUserForm = () => {
    const errorText = [];
    const { userCreateFormData } = this.props.userManager;
    const {
      applicationId, level, siteId, approverId,
      description, roleRecordId, userId, isGlobal
    } = userCreateFormData;

    const { descriptionErrorText, siteErrorText, approverErrorText } = this.state;
    let isError = false;
    if (userId === '') {
      isError = true;
      this.setState((prevState, props) => ({ userIdErrorText: 'User ID is mandatory' }));
    } else {
      this.setState((prevState, props) => ({ userIdErrorText: '' }));
    }
    if (applicationId === '') {
      isError = true;
      this.setState((prevState, props) => ({ applicationErrorText: 'Application is mandatory' }));
    } else {
      this.setState((prevState, props) => ({ applicationErrorText: '' }));
    }
    if (level === '') {
      isError = true;
      this.setState((prevState, props) => ({ levelErrorText: 'Level is mandatory' }));
    } else {
      this.setState((prevState, props) => ({ levelErrorText: '' }));
    }
    if (description === '') {
      isError = true;
      this.setState((prevState, props) => ({ descriptionErrorText: 'Description is mandatory' }));
    } else {
      this.setState((prevState, props) => ({ descriptionErrorText: '' }));
    }
    if (siteId === '' && !isGlobal) {
      isError = true;
      this.setState((prevState, props) => ({ siteErrorText: 'site is mandatory' }));
    } else {
      this.setState((prevState, props) => ({ siteErrorText: '' }));
    }
    if (roleRecordId === '') {
      isError = true;
      this.setState((prevState, props) => ({ roleErrorText: 'Role is mandatory' }));
    } else {
      this.setState((prevState, props) => ({ roleErrorText: '' }));
    }
    if (approverId === '') {
      isError = true;
      this.setState((prevState, props) => ({ approverErrorText: 'Approver is mandatory' }));
    } else {
      this.setState((prevState, props) => ({ approverErrorText: '' }));
    }

    if (!isError) {
      this.props.dispatch(createNewUser(this.props.userManager.userCreateFormData));
    }
  }

  render() {
    const {
      userCreateFormData, applicationHeaders, levelList,
      roleList, sitesList, approverList
    } = this.props.userManager;
    const { description, userId, successMsg } = userCreateFormData;

    const {
      levelErrorText, applicationErrorText, siteErrorText,
      roleErrorText, approverErrorText, descriptionErrorText,
      userIdErrorText
    } = this.state;

    return (
      <div>
        <div className="intro">
          <div className="intro-col intro-col--title intro-col-newuser">
            <img className="intro-chart" src="../public/dist/img/log-in/intro-chart.png" alt="" />
          </div>
          <div className="intro-col intro-col--form intro-col-newuser">
            <div className="log-in">
              <div className="log-in-container">
                <div className="log-in-logo">
                  <SvgiEqarpHub />
                </div>
                <form action="#" className="log-in-form">
                  <div className="form-field">
                    <label className="succMsg" htmlFor="log-in-user">{successMsg !== '' ? successMsg : ''}</label>
                  </div>
                  <div className="form-field">
                    <label htmlFor="log-in-user">UserID</label>
                    <input
                      className="log-in-input"
                      type="text"
                      errorText={descriptionErrorText}
                      onChange={this.updateUserId}
                      value={userId}
                    />
                    <p className="danger">{userIdErrorText !== '' ? userIdErrorText : ''}</p>
                  </div>

                  <div className="form-field">
                    <label htmlFor="log-in-user">Application</label>
                    <ReactSuperSelect
                      placeholder="Select Application"
                      dataSource={applicationHeaders}
                      optionValueKey="applicationRecordId"
                      optionLabelKey="applicationName"
                      onChange={this.updateApplicationHeader}
                      clearSelectedValueOnDataSourceChange={!false}
                      customClass="metrcisSelected"
                      clearable={false}
                    />
                    <p className="danger">{applicationErrorText !== '' ? applicationErrorText : ''}</p>
                  </div>
                  <div className="form-field">
                    <label htmlFor="log-in-user">Level</label>
                    <ReactSuperSelect
                      placeholder="Select Level"
                      dataSource={levelList}
                      optionValueKey="level"
                      optionLabelKey="level"
                      clearSelectedValueOnDataSourceChange={!false}
                      onChange={this.updateLevel}
                      clearable={false}
                    />
                    <p className="danger">{levelErrorText !== '' ? levelErrorText : ''}</p>
                  </div>
                  <div className="form-field">
                    <label htmlFor="log-in-user">Role</label>
                    <ReactSuperSelect
                      placeholder="Select Role"
                      dataSource={roleList}
                      optionValueKey="roleRecordId"
                      optionLabelKey="roleName"
                      clearSelectedValueOnDataSourceChange={!false}
                      onChange={this.updateRole}
                      clearable={false}
                    />
                    <p className="danger">{roleErrorText !== '' ? roleErrorText : ''}</p>
                  </div>
                  {!this.state.selectedLevel &&
                  <div className="form-field">
                    <label htmlFor="log-in-user">Site</label>
                    <ReactSuperSelect
                      placeholder="Select Site"
                      dataSource={sitesList}
                      optionValueKey="ObjectValue"
                      optionLabelKey="siteValue"
                      clearable={false}
                      clearSelectedValueOnDataSourceChange={!false}
                      onChange={this.updateSite}
                    />
                    <p className="danger">{siteErrorText !== '' ? siteErrorText : ''}</p>
                  </div>}
                  <div className="form-field">
                    <label htmlFor="log-in-user">Approver</label>
                    <ReactSuperSelect
                      placeholder="Select Approver"
                      dataSource={approverList}
                      optionValueKey="userId"
                      optionLabelKey="userName"
                      clearable={false}
                      clearSelectedValueOnDataSourceChange={!false}
                      onChange={this.updateApprover}
                    />
                    <p className="danger"> { approverErrorText !== '' ? approverErrorText : '' } </p>
                  </div>
                  <div className="form-field">
                    <label htmlFor="log-in-user">Description</label>
                    <input
                      className="log-in-input"
                      type="text"
                      errorText={descriptionErrorText}
                      onChange={this.updateDescriptionText}
                      value={description}
                    />
                    <p className="danger"> { descriptionErrorText !== '' ? descriptionErrorText : '' } </p>
                  </div>
                  <div className="form-field">
                    <input className="log-in-submit" onClick={this.saveUser} type="button" value="APPLY" />
                  </div>
                  <div>
                    <Link to="/">
                      <label>Back to Login</label></Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { uploadManager: state.uploadManager, userManager: state.userManager };
}

export default connect(mapStateToProps)(NewUser);

