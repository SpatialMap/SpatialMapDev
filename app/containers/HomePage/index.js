import React                from 'react';
import { FormattedMessage } from 'react-intl';
import messages             from './messages';
import { Link }             from 'react-router';
import './home.css'
import Footer               from '../../components/Footer';

export default class HomePage extends React.PureComponent { 
  render() {
    return (
      <div>
        <div className="welcome">
          <div className="row container" style={{margin:"auto", marginTop: 30}}>
             <div className="col-sm-12">
              <img className="headImageHome" src="http://frapbot.kohze.com/SpatialMaps/worldMap.png"/>
             </div>
             <div className="col-sm-12 textCardHome" style={{textAlign: "center", margin: 'auto'}}>
             <h1 className="headText"> What if </h1>
             <div className="col-sm-6 col-sm-offset-3">
             <p>we had a global platform to collect and compare spatial proteomics datasets?
             <b> SpatialMaps </b> is a database with user friendly interface that is still accessible by programming languages such as R.</p>
             <Link to={'/about'}>
             <button className="headButton"> Learn More </button>
             </Link>
             </div>
           </div>
          </div>
        </div>
        <div className="greyBG">
          <div className="row container features" style={{margin:"auto", textAlign: 'left'}}>
            <div className="col-sm-3">
              <b>Open Souce</b> <br/> SpatialMaps is open source, easily editable and adjustable to researchers needs. 
            </div>
            <div className="col-sm-3">
              <b>Connecting Research</b> <br/> 
                we see an opportunity to improve the spatial proteomics data connectivity to accelerate the rate of scientific findings.
            </div>
            <div className="col-sm-3">
              <b>Accessability</b> <br/> pRoloc is a sophisticated solution to analyse spatial data and 
                   is fully connected to the SpatialMaps platform.
            </div>
            <div className="col-sm-3">
              <b>Data Science</b> <br/> Spatial proteomics datasets are a scarce scientific good that can reveal relevant information beyond
                initial findings.
            </div>
            
          </div>
        </div>
  
       <Footer />
      </div>
    );
  }
}
