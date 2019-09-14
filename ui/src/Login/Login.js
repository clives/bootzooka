import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import {userLogin} from '../Actions/Actions';
import { connect } from 'react-redux'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: {
        loginOrEmail: '',
        password: '',
      },
      touchedControls:  {
        loginOrEmail: false,
        password: false,
      },
    };
  }

  handleSubmit = async event => {
    event.preventDefault();
      const { loginOrEmail, password } = this.state.values;
      this.props.userLogin(loginOrEmail, password);
  }

  handleValueChange(key, value) {
    this.setState(state => ({ ...state, values: { ...state.values, [key]: value } }));
  }

  handleBlur(inputName) {
    this.setState(state => ({ ...state, touchedControls: { ...state.touchedControls, [inputName]: true } }));
  }

  isValid() {
    const { loginOrEmail, password } = this.state.values;
    return loginOrEmail.length > 0 && password.length > 0;
  }

  render() {
    return (
      this.props.isLoggedIn ? <Redirect to="/main" />
      :  <div className="Login">
          <h4>Please sign in</h4>
          <form className="CommonForm" onSubmit={this.handleSubmit}>
            <input type="text" name="loginOrEmail" placeholder="Login or email"
              onChange={({ target }) => this.handleValueChange('loginOrEmail', target.value)}
              onBlur={() => this.handleBlur('loginOrEmail')} />
            { this.state.touchedControls.loginOrEmail && this.state.values.loginOrEmail.length < 1 ? <p className="validation-message">login/email is required!</p> : null }
            <input type="password" name="password" placeholder="Password"
              onChange={({ target }) => this.handleValueChange('password', target.value)}
              onBlur={() => this.handleBlur('password')} />
            { this.state.touchedControls.password && this.state.values.password.length < 1 ? <p className="validation-message">password is required!</p> : null }
            <Link to="/recover-lost-password">Forgot password?</Link>
            <input type="submit" value="Sign in" className="button-primary" disabled={!this.isValid()} />
          </form>
        </div>
    );
  }
}


export const mapStateToProps = (state) => ({
})

const mapDispatchToProps = {
  userLogin: userLogin
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
