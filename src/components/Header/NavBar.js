import React from 'react';
import { connect } from 'react-redux';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import { Link } from 'react-router';
import { getAllNotifications } from '../../actions/GlobalActions';
import { doLogout } from '../../actions/LoginActions';
import BreadCrumb from './../BreadCrumb/BreadCrumb';
import Role from './Roles';

class Navbar extends React.Component {
  static get contextTypes() {
    return {
      router: React.PropTypes.object.isRequired
    };
  }

  componentWillMount() {
    this.props.dispatch(getAllNotifications());
  }

  handleRoleChange = (event) => {
    localStorage.setItem('role', event.target.value);
    this.context.router.push('/home');
  }

  showSchedule = (notification) => {
    this.context.router.push('/schedulehome');
  }

  logout = () => {
    this.props.dispatch(doLogout());
    this.context.router.push('/');
  }

  render() {
    const notifications = this.props.globals.notificationList.map(
      (notification, i) => (
        <li key="notification_{i}">
          <a onClick={() => this.showSchedule(notification)}>
            <div className="pull-left">
              <i className="fa fa-bell" aria-hidden="true" />
            </div>
            <h4>
              {notification.type}
            </h4>
            <p>{notification.title}</p>
          </a>
        </li>
      )
    );

    const applications = this.props.login.userInfo.applications.map((app, i) => (
      <div className="NavRoles" key="NavRoles_{i}">
        <h5>{app.applicationName}</h5>
        <Role usrRoles={app.Roles} />
      </div>
    ));

    return (
      <div>
        <div className="navbar">
          <div className="sidebar-logo-block">

            <a
              href="/#/home"
              className="sidebar-logo"
              title="EQARP HUB"
            >
              <img
                className="sidebar-logo-image"
                src="../public/dist/img/sidebar/sidebar-logo-white.svg"
                alt="EQARP HUB"
                title="EQARP HUB"
              />
            </a>

          </div>
          <ul className="navbar-actions">
            <li className="dropdown user user-menu">
              <a className="dropdown-toggle navbar-user" data-toggle="dropdown">
                <span className="hidden-xs navbar-name">{this.props.login.userInfo.name}</span>
                <div className="navbar-dropdown" />
              </a>
              <ul className="dropdown-menu">
                <li className="user-body">
                  <div className="padding-10 radioButtonSec">
                    { applications }
                  </div>
                </li>
              </ul>
            </li>
          </ul>
          <div className="navbar-actions-logout">
            <IconButton
              className="logoutIcon"
              tooltip="Logout"
              onClick={() => this.logout()}
            >
              <FontIcon className="fa fa-power-off icon-white" />
            </IconButton>
          </div>
        </div>
        <BreadCrumb location={this.props.location} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { globals: state.global, login: state.login };
}

export default connect(mapStateToProps)(Navbar);
