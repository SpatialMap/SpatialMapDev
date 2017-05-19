/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import './home.css'


export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const One = "Welcome to SpatialMaps";


    return (
      <div>
        <div className="welcome">
          <h1> {One} </h1>
        </div>
        <div className="greyBG tileHeight">
          <p> </p>

        </div>
        <div className="footer">

        </div>
      </div>
    );
  }
}
