/*
 *
 * Profile
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import makeSelectProfile from './selectors';
import * as firebase from 'firebase';
import { browserHistory } from 'react-router';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import { PrimaryButton, IButtonProps, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import './login.css';


export class Profile extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      switch: "Login",
      error: false,
      email: "",
      password: "",
      password2: "",
    };
  }

  googleLogin = (type) =>{
     return () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function(result) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          // ...
        }).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        }).then(() => {
          event.preventDefault(); // prevent full page reload
          // change current location without full page reload
          browserHistory.push(`/`);
        });
    }
  }

  pwReset = (type) =>{
  return () => {
    const email = this.state.email;
    var auth = firebase.auth();
    auth.sendPasswordResetEmail(email).then(function() {
      // Email sent.
      console.log('email send out')
    }, function(error) {
      // An error happened.
      });
    }
  }

  handleSubmit = (type) => {
    return () => {
      const email = this.state.email;
      const pw = this.state.password;
      if (type === 'Login') {
        firebase.auth().signInWithEmailAndPassword(email, pw).catch(function(error) {
          this.setState({ error: error.message });
        }).then(() => {
          browserHistory.push(`/`);
          });
      } else {
        firebase.auth().createUserWithEmailAndPassword(email, pw).then(() => {
        }).catch((error) => this.setState({ error: error.message })).then(() => {
          browserHistory.push(`/`);
        });
      }
    }
  }

  render() {

    const registerContent = <div> <TextField placeholder='Email' onChanged={(value) => this.setState({email : value})} />
                                <TextField placeholder='Password'  onChanged={(value) => this.setState({password : value})}/>
                                <TextField placeholder='Password'  onChanged={(value) => this.setState({password : value})}/>
                                <PrimaryButton className="buttons"
                                  text='Create Account'
                                  onClick={ this.handleSubmit("CreateUserAccount") }
                                />
                         </div>;

    const loginContent = <div> <TextField placeholder='Email' onChanged={(value) => this.setState({email : value})} />
                                <TextField placeholder='Password' type='password' onChanged={(value) => this.setState({password : value})}/>
                                <PrimaryButton className="buttons"
                                  text='login'
                                  onClick={ this.handleSubmit("Login") }
                                />
                                <DefaultButton className="buttons"
                                  text='reset password'
                                  type= "hero"
                                  onClick={ this.pwReset("resett") }
                                />
                         </div>;

    const textMsg = this.state.switch == "Login" ? loginContent : registerContent;

    console.log(this.state.login);

    return (
    <div>
        <Helmet
          title="Profile"
          meta={[
            { name: 'description', content: 'Description of Profile' },
          ]}
        />
      <div className="mainContent">
        <Pivot onLinkClick={ (PivotItem) => this.setState({ switch : PivotItem.props.linkText })}>
          <PivotItem linkText='Login'   />
          <PivotItem linkText='Register'/>
        </Pivot>
        <div className="inputArea">
          <div className="inputInnerField">

        {textMsg}
      </div>
        </div>
        <button onClick={this.googleLogin('google')}> Google </button>
        <button onClick={this.googleLogin('google')}> Github </button>
        <button onClick={this.googleLogin('google')}> Facebook </button>
      </div>
    </div>
    );
  }
}

Profile.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  Profile: makeSelectProfile(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
