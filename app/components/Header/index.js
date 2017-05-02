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

function Header() {
  const profileloggedin = false;
  const Try = profileloggedin ? <div> this is a test </div> : <div> not logged in </div>
  return (
    <div className="navBar">
      <Link className="navItem" to="/"> home </Link>
      <Link className="navItem" to="/about"> about </Link>
      <Link className="navItem" to="/datasets"> datasets </Link>
      <Link className="navItem" to="/dataView"> dataView </Link>
      <Link className="navItem" to="/profile"> profile </Link>
      <Link className="navItem" to="/login"> login </Link>
    </div>
  );
}

Header.propTypes = {

};

export default Header;
