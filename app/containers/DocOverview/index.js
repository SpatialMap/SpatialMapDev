/*
 *
 * DocOverview
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import './docOverview.css';
import { Link } from 'react-router';


export class DocOverview extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const check = false;
    const box1 = check ? <div> <p> box1</p></div> :  <div> <p> box2</p></div>;
    return (
      <div>
        <Helmet
          title="Documentation"
          meta={[
            { name: 'description', content: 'Description of DocOverview' },
          ]}
        />

      <div className='row container ' style={{margin: 'auto'}}>
          <h1> Documentation </h1>
          <p className='textContainer'> Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
           tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero
           eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
           takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
           consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
           et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo
           duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
           Lorem ipsum dolor sit amet.</p>
        </div>

        <div className='tileContainer row container' style={{margin: 'auto'}}>
          <div className="tile">
            <img className="icon" src="http://frapbot.kohze.com/SpatialMaps/SpatialMaps_f3.png" />
            <h2>SpatialMaps</h2>
            <ul className="leftPadding">
              <Link><li> Get Started </li></Link>
              <Link><li> Examples </li></Link>
              <Link><li> References </li></Link>
            </ul>
          </div>
          <div className="tile">
            <img className="icon" src="https://github.com/Bioconductor/BiocStickers/raw/master/pRoloc/pRoloc.png" />
            <h2>pRoloc</h2>
            <ul className="leftPadding">
              <Link to="/documentation/pRoloc"><li> Get Started </li></Link>
              <Link><li> Examples </li></Link>
              <Link><li> References </li></Link>
              <a href="http://bioconductor.org/packages/release/bioc/html/pRoloc.html"><li> Bioconductor Page </li></a>
            </ul>
          </div>
          <div className="tile">
            <img className="icon" src="https://github.com/Bioconductor/BiocStickers/raw/master/MSnbase/MSnbase.png" />
            <h2>MSnbase</h2>
            <ul className="leftPadding">
              <Link to="/documentation/MSnbase"><li> Get Started </li></Link>
              <Link><li> Examples </li></Link>
              <Link><li> References </li></Link>
              <a href="https://bioconductor.org/packages/release/bioc/html/MSnbase.html"><li> Bioconductor Page </li></a>
            </ul>
          </div>
          <div className="tile">
            <img className="icon" src="https://github.com/Bioconductor/BiocStickers/raw/master/pRoloc/pRolocdata.png" />
            <h2>API</h2>
            <ul className="leftPadding">
              <Link><li> Get Started </li></Link>
              <Link><li> Examples </li></Link>
              <Link><li> Security </li></Link>
              <Link><li> References </li></Link>
            </ul>
          </div>
          <div className="tile">
            <img className="icon" src="http://www.iconhot.com/icon/png/devine/256/circle-2-1.png" />
            <h2>Data Storage</h2>
            <ul className="leftPadding">
              <Link><li> Get Started </li></Link>
              <Link><li> Examples </li></Link>
              <Link><li> References </li></Link>
            </ul>
          </div>
          <div className="tile">
            <img className="icon" src="http://www.iconhot.com/icon/png/devine/256/circle-2-1.png" />
            <h2>Accounts</h2>
            <ul className="leftPadding">
              <Link><li> Get Started </li></Link>
              <Link><li> Examples </li></Link>
              <Link><li> Security </li></Link>
              <Link><li> References </li></Link>
            </ul>
          </div>
        </div>

      </div>
    );
  }
}

DocOverview.propTypes = {
  dispatch: PropTypes.func.isRequired,
};


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(null, mapDispatchToProps)(DocOverview);
