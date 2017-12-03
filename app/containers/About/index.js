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
import { CompoundButton, IButtonProps} from 'office-ui-fabric-react/lib/Button';
import { Label } from 'office-ui-fabric-react/lib/Label';
import './about.css';
import Footer from '../../components/Footer';


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
              <div className="row container" style={{margin:"auto"}}>
             <div className="col-sm-6">
            <img className="headImage" src="http://frapbot.kohze.com/other/people.png"/>
             </div>
             <div className="col-sm-6 bottomCard">
             <h2 className="bottomText"> Idea & Foundation </h2>
             <p>After the creation of pRoloc and pRolocdata, SpatialMaps is an integral part of the pRoloc environment.
             While the pRoloc universe was yet a purely R based frameworks, SpatialMaps lowers the treshhold for non-coding scientists to efficiently compare datasets.</p>
           </div>
          </div>

          <div className="row container" style={{margin:"auto", marginTop: 30}}>
            <div className="col-sm-6 bottomCard">
            <h2 className="bottomText"> Technology </h2>
            <p>The SpatialMaps platform is based on Google Firebase as secure cloud database and react.js. </p>
              <p>Combining the cloud database with pRolocdata biocoductor package, we offer the opportunity access
                datasets both via R scripts as well as via the user friendly SpatialMaps web platform.</p>
            </div>
            <div className="col-sm-6" style={{marginTop: 30}}>
              <img className="headImage" src="http://frapbot.kohze.com/other/welcome_first.png"/>
            </div>
          </div>

          </div>
           <div className="exampleDiv">
            <h1 style={{color: 'white', marginLeft: -25}}> Some examples </h1>
            <div style={{paddingTop: 20}}>
            <Link to={'/dataView/-Km13xp504HfeCFElQFO'} style={{padding: 3}}>
              <CompoundButton
              primary={ true }
              description='Species: Mouse; Tissue: Cell'
              checked={ false }
              >
              E14TG2aR
              </CompoundButton>
            </Link>
            <Link to={'/dataView/-Km144gKiFJyqGtSmTNA'} style={{padding: 3}}>
              <CompoundButton
              primary={ true }
              description='Species: Homo Sapiens; Tissue: Cell'
              checked={ false }
              >
              HEK293T2011
              </CompoundButton>
            </Link>
            <Link to={'dataView/-Km15TaqOpK8NiRU3oJj'} style={{padding: 3}}>
              <CompoundButton
              primary={ true }
              description='Species: Mouse; Tissue: Stem Cell'
              checked={ false }
              >
              HyperLOPIT2015ms3r1
              </CompoundButton>
            </Link>
            </div>
          </div>

        </div>
        <Footer />
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
