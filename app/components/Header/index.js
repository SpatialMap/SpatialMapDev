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

import { Modal } from 'office-ui-fabric-react/lib/Modal';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { ChoiceGroup } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';

import uploadModal from './uploadModal';

function Header() {

  function logout() {
     firebase.auth().signOut();
     console.log("logged out");
     browserHistory.push(`/`);
  }

  var loggedIn = (null !== firebase.auth().currentUser);

  const profileloggedin = false;
  return (
    <div className="navBar">
      <div className="row container" style={{margin: 'auto'}}>
        <div className="logo col-sm-3"> SpatialMaps </div>
        <SearchBox className="search col-sm-4"
          onChange={ (newValue) => console.log('SearchBox onChange fired: ' + newValue) }
          onSearch={ (newValue) => console.log('SearchBox onSearch fired: ' + newValue) }
        />
        <span className="col-sm-5">
        <Link className="navItem" to="/"> home </Link>
        <Link className="navItem" to="/about"> about </Link>
        <Link className="navItem" to="/datasets"> datasets </Link>

        {loggedIn ? <span>
        <Link className="navItem" to="/profile"> profile </Link>
        <button className="navItem" onClick={logout.bind(this)}> Logout </button>
        </span> : <Link className="navItem" to="/login"> login </Link>}
        </span>
      </div>
    </div>
  );
}

Header.propTypes = {

};

export default Header;
