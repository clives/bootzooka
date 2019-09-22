import React, {Component} from 'react';
import { connect } from 'react-redux';
import {userLoggedIn, userLoggedInWithGoogle} from '../Actions/Actions';

const GOOGLE_BUTTON_ID = 'google-sign-in-button';
const AUTH_SERVICE_NAME= 'google'

class SignIn extends Component {

    /*
        componentDidMount() {
            window.gapi.load('auth2', () => {
                window.gapi.auth2.init({
                client_id: '916742357497-o99psqoc143vsqi93udn95e4c0r6o26a.apps.googleusercontent.com'
            }
            ).then(() => {
                window.gapi.signin2.render('my-signIn', {
                'scope': 'profile email',
                'width': 250,
                'height': 50,
                'longtitle': false,
                'theme': 'dark',
                'onsuccess': this.onSuccess,
                'onfailure': this.onFailure
                })
            }) 
            })    
        
    }*/

    onSuccess(googleUser) {
      console.log("onSuccess")
      console.log("basicProfile:"+googleUser.getBasicProfile());
      this.props.userLoggedIn(AUTH_SERVICE_NAME)      
    }

    //src: https://www.intricatecloud.io/2019/08/adding-google-sign-in-to-your-webapp-a-react-example/
    componentDidMount() {
      window.gapi.load('auth2', () => {
        this.auth2 = window.gapi.auth2.init({
          client_id: '916742357497-o99psqoc143vsqi93udn95e4c0r6o26a.apps.googleusercontent.com',
        })

        this.auth2.then((token) => {
          console.log("token google:"+token)

          //https://developers.google.com/identity/sign-in/web/reference
          const googleUser = window.gapi.auth2.getAuthInstance().currentUser.get()

          

          if( this.auth2.isSignedIn.get() ){

            const profile = googleUser.getBasicProfile();
            const id_token = googleUser.getAuthResponse().id_token;
            const uniqueGogoleId = googleUser.getId()

            this.props.userLoggedInWithGoogle(uniqueGogoleId)
          }
           // this.props.userLoggedIn(AUTH_SERVICE_NAME);
        });
    
        var opts = {
          width: 200,
          height: 50,
          onSuccess: this.onSuccess.bind(this),
        }

        window.gapi.load('signin2', function() {
          // render a sign in button
          // using this method will show Signed In if the user is already signed in
          
          
          window.gapi.signin2.render(GOOGLE_BUTTON_ID, opts)
        })
      })
}
render = () => (<div id={GOOGLE_BUTTON_ID}> google </div>)
}

export const mapStateToProps = (state) => ({  
})

const mapDispatchToProps = {
  userLoggedIn: userLoggedIn,
  userLoggedInWithGoogle: userLoggedInWithGoogle
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);

