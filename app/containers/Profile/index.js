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
import "./profile.css"


export class Profile extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
  }

  render() {
    var user = firebase.auth().currentUser;
    if (user != null) {
       var email = user.email;
       var uid = user.uid;
       var name = user.displayName;
    } else {
       var email = "not logged in";
       var uid = "not logged in";
       var name = "not logged in";
    }
    return (
      <div>
        <Helmet
          title="Profile"
          meta={[
            { name: 'description', content: 'Description of Profile' },
          ]}
        />
        <div className="profileData">
           <h1> Profile </h1>
            Email: {email}
            <br/>
            UID : {uid}
            <br/>
            Name : {name}
        </div>
        <div className="uploadData">
          upload placeholder
        </div>
        <div className="myData">
          my datasets
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
