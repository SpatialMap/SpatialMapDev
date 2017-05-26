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
import './header.css';
import * as firebase from 'firebase';
import { browserHistory } from 'react-router';

import { Modal } from 'office-ui-fabric-react/lib/Modal';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { ChoiceGroup } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';

function Header() {

  function logout() {
     firebase.auth().signOut();
     console.log("logged out");
     browserHistory.push(`/`);
  }

  var loggedIn = (null !== firebase.auth().currentUser);

  return (
    <div className="navBar">
      <div className="row container" style={{margin: 'auto'}}>
        <Link to="/"><div className="logo col-sm-3"> SpatialMaps </div></Link>
        <SearchBox className="search col-sm-4"
          onChange={ (newValue) => console.log('SearchBox onChange fired: ' + newValue) }
          onSearch={ (newValue) => console.log('SearchBox onSearch fired: ' + newValue) }
        />
        <div className="col-sm-5 rightNavItems">
        <Link className="navItem" to="/"> Home </Link>
        <Link className="navItem" to="/about"> About </Link>
        <Link className="navItem" to="/datasets"> Datasets </Link>
        <Link className="navItem" to="/overview"> Documentation </Link>
        <Link className="navItem" to="/documentation"> -doc- </Link>


        {loggedIn ? <span>
        <Link className="navItem" to="/profile"> Profile </Link>
        <Link className="navItem" onClick={logout.bind(this)}> Logout </Link>
        </span> : <Link className="navItem" to="/login"> Login </Link>}
        </div>
      </div>
    </div>
  );
}

Header.propTypes = {

};

export default Header;
