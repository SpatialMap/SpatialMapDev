/*
 *
 * About
 *
 */

import React, { PropTypes }            from 'react';
import { connect }                     from 'react-redux';
import Helmet                          from 'react-helmet';
import { FormattedMessage }            from 'react-intl';
import { createStructuredSelector }    from 'reselect';
import makeSelectAbout                 from './selectors';
import messages                        from './messages';
import { Link }                        from 'react-router';
import { CompoundButton, IButtonProps} from 'office-ui-fabric-react/lib/Button';
import { Label }                       from 'office-ui-fabric-react/lib/Label';
import Footer                          from '../../components/Footer';
import './about.css';

export class About extends React.Component {
  render() {
    return (
      <div>
        <Helmet
          title="About"
          meta={[
            { name: 'description', content: 'SpatialMaps - About' },
          ]}
        />
        <div>
          <div className="welcome">
            <div className="row container" style={{margin:"auto", marginTop: 30}}>
              <div className="col-sm-6 textCard">
               <h1 className="headText" style={{paddingBottom: 10}}> About </h1>
               <p>We created a platform to accelerate the dissemination of spatial proteomic datasets and thereby  
                  improve scientific collaborations. SpatialMaps is a actively developed platform and we expect many features soon to be released.
                </p>
               </div>
               <div className="col-sm-6">
                <img className="headImageVideo" src="https://firebasestorage.googleapis.com/v0/b/spatialmap-1b08e.appspot.com/o/img%2Fvideo-placeholder.png?alt=media&token=262d830b-f648-4661-9b5c-cdccbd23c13a"/>
               </div>
            </div>
          </div>

          <div className="greyBG">
              <div className="row container" style={{margin:"auto"}}>
             <div className="col-sm-6">
            <img className="headImageSmall" src="https://firebasestorage.googleapis.com/v0/b/spatialmap-1b08e.appspot.com/o/img%2FIdeaAbout.png?alt=media&token=0eca211c-2edf-430a-ac96-e700c3648785"/>
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
            <div className="col-sm-6" style={{marginTop: 15}}>
              <img className="headImageSmall" src="https://firebasestorage.googleapis.com/v0/b/spatialmap-1b08e.appspot.com/o/img%2FtechnologyAbout.png?alt=media&token=e420f35e-0e4a-4707-8b21-f74dc311372c"/>
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
          <div className="greyBG">
          <div className="row container features" style={{margin:"auto", textAlign: 'left'}}>
            <div className="col-sm-3">
              <b>Open Souce</b> <br/> SpatialMaps is open source, easily editable and adjustable to specific 
                research needs and currently actively developed.
            </div>
            <div className="col-sm-3">
              <b>Connecting Research</b> <br/> 
                we see an opportunity to improve the spatial proteomics data connectivity to accelerate the 
                rate of scientific findings.
            </div>
            <div className="col-sm-3">
              <b>Accessability</b> <br/> pRoloc, a sophisticated solution to analyse spatial data and 
                   is fully connected to the SpatialMaps platform.
            </div>
            <div className="col-sm-3">
              <b>Data Science</b> <br/> Spatial proteomics datasets are a scarce scientific good that can reveal 
                relevant information beyond initial findings.
            </div>
            
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
