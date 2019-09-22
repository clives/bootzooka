import { hot } from 'react-hot-loader/root'
import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import Login from './Login/Login';
import NavBar from './NavBar/NavBar';
import NotFound from './NotFound/NotFound';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';
import RecoverLostPassword from './RecoverLostPassword/RecoverLostPassword';
import Register from './Register/Register';
import Spinner from './Spinner/Spinner';
import Welcome from './Welcome/Welcome';
import withForkMe from './ForkMe/ForkMe';
import Highstock from './Highstock/Highstock';
import ProfileDetails from './ProfileDetails/ProfileDetails';
import PasswordDetails from './PasswordDetails/PasswordDetails';
import SecretMain from './SecretMain/SecretMain';
import Footer from './Footer/Footer';
import PasswordReset from './PasswordReset/PasswordReset';
import {updateIsLoadingAuthInfo, userLogout, resetUserLoginInfo, setApiKey,getCurrentUser, clearNotifications} from './Actions/Actions';
import PrivateRoute from 'react-private-route'

class App extends Component {
  constructor(props) {
    super(props);

    this.notifySuccess = this.notifySuccess.bind(this);
    this.notifyError = this.notifyError.bind(this);
  }

  async componentDidMount() {
    const apiKey = window.localStorage.getItem('apiKey');

    if (apiKey) {
     // try {

      this.props.getCurrentUser( apiKey);
      /*
        const { data: user } = await this.props.userService.getCurrentUser(apiKey);
        this.props.updateIsLoadingAuthInfo(false);
        this.props.setApiKey( apiKey,user );
      } catch (err) {
        window.console.error(err);
        window.localStorage.removeItem('apiKey');
        this.props.updateIsLoadingAuthInfo(false);
      }*/
    }
    this.props.updateIsLoadingAuthInfo(false);
  }
  updateUserInfo({ email, login }) {
  }

  async onLoggedIn(apiKey) {
    try {
      const { data: user } = await this.props.userService.getCurrentUser(apiKey);
      window.localStorage.setItem('apiKey', apiKey);
      this.setState({ apiKey, isLoggedIn: true, user });
    } catch (err) {
      window.console.error(err);
    }
  }

  logout() {
    this.props.userLogout();
  }

  notifySuccess(msg) {
    toast.success(msg);
  }

  notifyError(msg) {
    toast.error(msg);
  }

  componentDidUpdate(){
    this.props.clearNotifications();
  }

  render() {
    const { passwordService, userService, versionService, apiKey, isLoadingAuthInfo, isLoggedIn, user } = this.props;

    if( this.props.notifyError ){
      toast.error(this.props.notifyError);
    }
    if( this.props.notifySuccess ){
      toast.success(this.props.notifySuccess);
    }

    return (
      isLoadingAuthInfo ? <Spinner />
      : <div className="App">
          <NavBar isLoggedIn={isLoggedIn} user={user} logout={this.logout.bind(this)} />
          <div className="Main">
            <Switch>
              <Route exact path="/" render={() => withForkMe(<Welcome />)} />
              <ProtectedRoute isLoggedIn={isLoggedIn} path="/main" component={SecretMain} />
              <ProtectedRoute isLoggedIn={isLoggedIn} path="/Highstockprivate" component={Highstock} />

              <Route path="/Highstock" render={() => withForkMe(
                <Highstock/>
                )} />

              <ProtectedRoute isLoggedIn={isLoggedIn} path="/profile" render={() => withForkMe(
                <div>
                  <ProfileDetails apiKey={apiKey} user={user} userService={userService}
                    onUserUpdated={this.updateUserInfo.bind(this)} />
                  <PasswordDetails apiKey={apiKey} userService={userService} />
                </div>
              )} />
              <Route path="/login" render={() => withForkMe(
                <Login userService={userService} onLoggedIn={this.onLoggedIn.bind(this)}  isLoggedIn={isLoggedIn} />
                )} />
              <Route path="/register" render={() => withForkMe(
                <Register userService={userService}/>
                )} />
              <Route path="/recover-lost-password" render={() => withForkMe(
                <RecoverLostPassword passwordService={passwordService}/>
                )} />
              <Route path="/password-reset" render={({ location }) => withForkMe(
                <PasswordReset passwordService={passwordService} queryParamsString={location.search}/>
              )} />
              <Route render={() => withForkMe(<NotFound />)} />
            </Switch>
          </div>
          <Footer versionService={versionService} />
          <ToastContainer />
        </div>
    );
  }
}

export const mapStateToProps = (state) => ({
    apiKey: state.apiKey,
    isLoadingAuthInfo: state.isLoadingAuthInfo,
    isLoggedIn: state.isLoggedIn,
    user: state.user,
    notifyError: state.notify_error,
    notifySuccess: state.notify_success
})

const mapDispatchToProps = {
  updateIsLoadingAuthInfo: updateIsLoadingAuthInfo,
  resetUserLoginInfo: resetUserLoginInfo,
  setApiKey: setApiKey,
  getCurrentUser: getCurrentUser,
  clearNotifications: clearNotifications,
  userLogout: userLogout
};

export default hot(withRouter(connect(mapStateToProps, mapDispatchToProps)(App)));
