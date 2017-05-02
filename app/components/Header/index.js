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

function Header() {
  return (
    <div>
      <Link to="/"> home </Link>
      <Link to="/profile"> profile </Link>
      <Link to="/about"> login </Link>
    </div>
  );
}

Header.propTypes = {

};

export default Header;
