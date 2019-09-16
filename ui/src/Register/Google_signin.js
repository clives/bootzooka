import React, {Component} from 'react';

const GOOGLE_BUTTON_ID = 'google-sign-in-button';

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

    onSuccess() {
      this.setState({
        isSignedIn: true
      })
    }

    //src: https://www.intricatecloud.io/2019/08/adding-google-sign-in-to-your-webapp-a-react-example/
    componentDidMount() {
      window.gapi.load('auth2', () => {
        this.auth2 = window.gapi.auth2.init({
          client_id: 'XXX.googleusercontent.com',
        })

        this.auth2.then(() => {
          this.setState({
            isSignedIn: this.auth2.isSignedIn.get(),
          });
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

export default SignIn;

