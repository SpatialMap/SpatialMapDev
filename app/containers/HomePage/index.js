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
var ParallelCoordinatesComponent=require('react-parallel-coordinates')


export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const One = "Welcome to SpatialMaps";
    var foods = [
      {name: "Asparagus", protein: 2.2, calcium: 0.024, sodium: 0.002},
      {name: "Butter", protein: 0.85, calcium: 0.024, sodium: 0.714},
      {name: "Coffeecake", protein: 6.8, calcium: 0.054, sodium: 0.351},
      {name: "Pork", protein: 28.5, calcium: 0.016, sodium: 0.056},
      {name: "Provolone", protein: 25.58, calcium: 0.756, sodium: 0.876},
      {name: "Provolone2", protein: 25.58, calcium: 0.756, sodium: 0.876}
    ];

    var dimensions = {
    	"name":
    		{
    			orient: 'left',
    			type: 'string',
    			tickPadding: 10,
    		},
    	"protein": {type:"number"},
    	"calcium": {type:"number"},
      "sodium": {type:"number"}
    };

    return (
      <div>
        <div className="welcome">
          <h1> {One} </h1>
        </div>
        <div className="greyBG tileHeight">
          <p> </p>
          <ParallelCoordinatesComponent dimensions={dimensions}
                                        data={foods}
                                        rotateLabels={true}
                                        height={400}
                                        width={1200} />
        </div>
        <div className="footer">

        </div>
      </div>
    );
  }
}
