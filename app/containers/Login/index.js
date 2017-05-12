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
import './login.css'


export class Profile extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      login: true,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleSubmit = (type) => {
    return () => {
      const email = this.email.value;
      const pw = this.password.value;
      if (type === 'login') {
        firebase.auth().signInWithEmailAndPassword(email, pw).catch(function(error) {
          this.setState({ error: error.message });
        }).then(() => {
          event.preventDefault(); // prevent full page reload
          // change current location without full page reload
          browserHistory.push(`/`);
          });
      } else {
        firebase.auth().createUserWithEmailAndPassword(email, pw).then(() => {
        }).catch((error) => this.setState({ error: error.message })).then(() => {
          event.preventDefault(); // prevent full page reload
          // change current location without full page reload
          browserHistory.push(`/`);
            });
      }
    }
  }

  render() {

    var textMsg = this.state.login == true ? <p> Login </p> : <p> Register </p>;
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
        <Pivot>
          <PivotItem linkText='Login'    onClick={() => this.setState({ login : true })} />
          <PivotItem linkText='Register' onClick={() => this.setState({ login : false })}/>
        </Pivot>
        {textMsg}
        <button onClick={this.googleLogin('google')}> Log in with Google </button>
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
