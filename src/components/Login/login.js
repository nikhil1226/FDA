import React from 'react';
import { connect } from 'react-redux';
import { hashHistory, Link } from 'react-router';
import './login.scss';
import { SvgiEqarpHub } from '../SVGIcons';
import { userLogin, checkNovartisUser } from './../../actions/LoginActions';

class Login extends React.Component {
  static get contextTypes() {
    return {
      router: React.PropTypes.object.isRequired
    };
  }
  constructor(props) {
    super(props);
    this.state = {
      login: {
        userName: '',
        password: ''
      },
      errorMessage: {
        userName: '',
        password: ''
      },
      showPasswordColumn: true,
      isAuthendicated: false
    };
  }

  componentWillMount() {
    const { hostname, hash } = window.location;
    if (hostname === 'localhost' || hostname === 'mcbitss.dyndns.biz') {
      this.setState({ showPasswordColumn: false });
    } else if (hash === '#/?pwd=1') {
      this.setState({ showPasswordColumn: true });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.Login.isAuthendicated === true && localStorage.getItem('isAuthenticated')) {
      this.context.router.push('/home');
    }
  }

  updateCredentials = (value, name) => {
    const loginCredentials = this.state.login;
    const errorMsg = this.state.errorMessage;
    loginCredentials[name] = value;
    errorMsg[name] = '';
    this.setState({ login: loginCredentials, errorMessage: errorMsg });
  }

  validateCredentials = () => {
    const { showPasswordColumn, login, errorMessage } = this.state;
    const errMsg = errorMessage;
    if (login.userName === '') {
      errMsg.userName = 'Please enter user name';
    }
    if (login.password === '' && showPasswordColumn) {
      errMsg.password = 'Please enter password';
    }

    if (errMsg.userName === '' && errMsg.password === '') {
      this.submitLogin();
    } else {
      this.setState({ errorMessage: errMsg });
    }
  }

  submitLogin = () => {
    console.log('submitLogin()');
    const { showPasswordColumn, login } = this.state;
    if (showPasswordColumn) {
      this.props.dispatch(checkNovartisUser(login));
    } else {
      this.props.dispatch(userLogin(login));
    }
  }

  render() {
    const { login, showPasswordColumn, errorMessage } = this.state;
    const { isAuthendicated, loginMessage } = this.props.Login;
    return (
      <div>
        <div className="intro">
          <div className="intro-col intro-col--title">
            <img className="intro-chart" src="../public/dist/img/log-in/intro-chart.png" alt="" />
          </div>
          <div className="intro-col intro-col--form">
            <div className="log-in">
              <div className="log-in-container">
                <div className="log-in-logo">
                  <SvgiEqarpHub />
                </div>
                <form action="#" className="log-in-form">
                  <div className="form-field">
                    <label htmlFor="log-in-user">User ID</label>
                    <input
                      className="log-in-input"
                      type="text" value={login.userName}
                      onChange={(e => this.updateCredentials(e.target.value, 'userName'))}
                      name="userName"
                      id="userName"
                    />
                  </div>
                  <div>
                    <label className="errorMessage">
                      {errorMessage.userName !== '' && errorMessage.userName}
                    </label>
                  </div>
                  {showPasswordColumn && <div className="form-field">
                    <label htmlFor="log-in-user">Password</label>
                    <input
                      className="log-in-input"
                      type="password"
                      value={login.password}
                      onChange={(e => this.updateCredentials(e.target.value, 'password'))}
                      name="password"
                      id="password"
                    />
                  </div>}
                  <div>
                    <label className="errorMessage">
                      { (isAuthendicated === false && loginMessage)
                      || (errorMessage.password !== '' && errorMessage.password)
                      }</label>
                  </div>
                  <div className="form-field">
                    <input
                      className="log-in-submit"
                      type="button"
                      onClick={this.validateCredentials}
                      value="Log in"
                    />
                  </div>
                  <div>
                    <Link to="NewUser">
                      <label>New User ?</label></Link>
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
  return { Login: state.login };
}

export default connect(mapStateToProps)(Login);

