/*
 *
 * About
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import makeSelectAbout from './selectors';
import messages from './messages';
import { Link } from 'react-router';
import './about.css';

export class About extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet
          title="About"
          meta={[
            { name: 'description', content: 'Description of About' },
          ]}
        />
        <div>
          <div className="welcome">
            <div className="row container" style={{margin:"auto", marginTop: 30}}>
               <div className="col-sm-6">
              <img className="headImage" src="http://www.newtbdrugs.org/sites/default/files/default_images/video-placeholder.png"/>
               </div>
               <div className="col-sm-6 textCard">
               <h1 className="headText" style={{paddingBottom: 10}}> About </h1>
               <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
               tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero
                 takimata sanctus est Lorem.</p>
             </div>
            </div>
          </div>

          <div className="greyBG">

            <div className="row container" style={{margin:"auto", marginTop: 30, textAlign: 'left'}}>
            <h2 className="bottomText"> The Environment </h2>
               <div className="col-sm-6">
               <img src="http://frapbot.kohze.com/other/people.png"/>
               <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                  tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero
                  eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
                  takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
                  consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
                  dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo
                  duo dolores et ea rebum. Stet clita kasd gubergren, no sea.</p>
             </div>
             <div className="col-sm-6">
             <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero
                eos et accusam et justo duo dolores et ea rebum. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero
                eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
                takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
                consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
                dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo
                duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
                ipsum dolor sit amet.</p>
             </div>
             <div className="col-sm-6">
             <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero
                eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
                takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
                consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
                dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo
                duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
                ipsum dolor sit amet.</p>
           </div>
           </div>

            <div className="row container" style={{margin:"auto", marginTop: 30, textAlign: 'left'}}>
            <h2 className="bottomText"> R and SpatialMaps </h2>
               <div className="col-sm-6">
               <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                  tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero
                  eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
                  takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
                  consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
                  dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo
                  duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
                  ipsum dolor sit amet.</p>
             </div>

             <div className="col-sm-6">
             <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero
                eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
                takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
                consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
                dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo
                duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
                ipsum dolor sit amet.</p>
           </div>
           </div>

           <div className="row container" style={{margin:"auto", marginTop: 30, marginBottom: 30, textAlign: 'left'}}>
           <h2 className="bottomText"> Collaboration and Open Data </h2>
              <div className="col-sm-6">
              <p> Stet clita kasd gubergren, no sea
                 takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
                 consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
                 dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo
                 duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
                 ipsum dolor sit amet. </p> <p>
                 Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                 tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero
                 eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
                 takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
                 consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
                 dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo
                 duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
                 ipsum dolor sit amet.</p>
            </div>
            <div className="col-sm-6">

            </div>
            <div className="col-sm-6">
            <img className="headImage" style={{padding: 0}} src="http://frapbot.kohze.com/other/welcome_first.png"/>


          </div>
          </div>


          </div>

          <div className="container row continueBar">
          <Link to="/"><button className="continueButton"> Home </button> </Link>
          <Link to="/datasets"><button className="continueButton"> Datasets </button> </Link>
          <Link to="/login"><button className="continueButton"> Login/Register </button> </Link>
          </div>

        </div>
      </div>
    );
  }
}

About.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  About: makeSelectAbout(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(About);
