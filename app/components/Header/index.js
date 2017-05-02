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
  return (
    <div className="navBar">
      <Link to="/"> home </Link>
      <Link to="/profile"> profile </Link>
      <Link to="/about"> login </Link>
    </div>
  );
}

Header.propTypes = {

};

export default Header;
