import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { validateEmail, validateLogin, validatePassword } from '../validation/validation';
import { connect } from 'react-redux'
import { registerUser } from '../Actions/Actions';
import GoogleSignIn from './Google_signin'

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: {
        login: '',
        email: '',
        password: '',
        repeatedPassword: ''
      },
      touchedControls: {
        login: false,
        email: false,
        password: false,
        repeatedPassword: false
      },
      isRegistered: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();
    try {
      const { login, email, password } = this.state.values;
      this.props.registerUser(login, email, password);
      // TODO save the apiKey in localStorage; read it in the UserService/axios request transformer?
      // remvoe it from localStorage on logout
      //this.setState({ isRegistered: true });
     // this.props.notifySuccess('Successfully registered.');
    } catch (error) {
     //  this.props.notifyError('Could not resgister new user!');
      console.error(error);
    }
  }

  handleValueChange(key, value) {
    this.setState(state => ({ ...state, values: { ...state.values, [key]: value } }));
  }

  handleBlur(inputName) {
    this.setState(state => ({ ...state, touchedControls: { ...state.touchedControls, [inputName]: true } }));
  }

  getLoginErrors() {
    return this.state.touchedControls.login ? validateLogin(this.state.values.login) : [];
  }

  getEmailErrors() {
    return this.state.touchedControls.email ? validateEmail(this.state.values.email) : [];
  }

  getPasswordErrors(inputName) {
    return this.state.touchedControls[inputName] ? validatePassword(this.state.values[inputName]) : [];
  }

  passwordEntriesMatch() {
    return this.state.values.password === this.state.values.repeatedPassword;
  }

  isValid () {
    const { email, password, repeatedPassword, login } = this.state.values;
    return validateLogin(login).length === 0
    && validateEmail(email).length === 0
    && validatePassword(password).length === 0
    && validatePassword(repeatedPassword).length === 0
    && this.passwordEntriesMatch();
  }

  render () {
    return (
      this.props.isRegistered ? <Redirect to="/login" />
      : <div className="Register">
          <h4>Please Register</h4>
          <form className="CommonForm" onSubmit={this.handleSubmit}>
            <input type="text" name="login" placeholder="Login"
              onChange={({ target }) => this.handleValueChange('login', target.value)}
              onBlur={() => this.handleBlur('login')} />
            { this.getLoginErrors().map((errorMsg, idx) => <p className="validation-message" key={idx}>{errorMsg}</p>) }
            <input type="email" name="email" placeholder="Email address"
              onChange={({ target }) => this.handleValueChange('email', target.value)}
              onBlur={() => this.handleBlur('email')} />
            { this.getEmailErrors().map((errorMsg, idx) => <p className="validation-message" key={idx}>{errorMsg}</p>) }
            <input type="password" name="password" placeholder="Password"
              onChange={({ target }) => this.handleValueChange('password', target.value)}
              onBlur={() => this.handleBlur('password')} />
            { this.getPasswordErrors('password').map((errorMsg, idx) => <p className="validation-message" key={idx}>{errorMsg}</p>) }
            <input type="password" name="repeatedPassword" placeholder="Repeat password"
              onChange={({ target }) => this.handleValueChange('repeatedPassword', target.value)}
              onBlur={() => this.handleBlur('repeatedPassword')} />
            { this.getPasswordErrors('repeatedPassword').map((errorMsg, idx) => <p className="validation-message" key={idx}>{errorMsg}</p>) }
            { this.state.touchedControls.repeatedPassword && !this.passwordEntriesMatch() ? <p className="validation-message">passwords don't match!</p> : null }
            <input type="submit" value="Register" className="button-primary" disabled={!this.isValid()} />
          </form>

          <GoogleSignIn/>
        </div>
    );
  }
}

export const mapStateToProps = (state) => ({
    apiKey: state.apiKey,
    isRegistered: state.isRegistered
})

const mapDispatchToProps = {
  registerUser: registerUser
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
