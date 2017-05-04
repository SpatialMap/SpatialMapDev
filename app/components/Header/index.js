/**
*
* Header
*
*/
import React from 'react';
// import styled from 'styled-components';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import './main.css';
import * as firebase from 'firebase';
import { browserHistory } from 'react-router';


function Header() {

  function logout() {
     firebase.auth().signOut();
     console.log("logged out");
     browserHistory.push(`/`);
   }

  var loggedIn = (null !== firebase.auth().currentUser);


  const profileloggedin = false;
  const Try = profileloggedin ? <div> this is a test </div> : <div> not logged in </div>
  return (
    <div className="navBar">
      <Link className="navItem" to="/"> home </Link>
      <Link className="navItem" to="/about"> about </Link>
      <Link className="navItem" to="/datasets"> datasets </Link>
      <Link className="navItem" to="/dataView/-KjEMjNMw4y2kxZJkoWh"> dataView </Link>
      <Link className="navItem" to="/profile"> profile </Link>
      <Link className="navItem" to="/login"> login </Link>
      <button className="navItem" onClick={logout.bind(this)}> Logout </button>
    </div>
  );
}

Header.propTypes = {

};

export default Header;
