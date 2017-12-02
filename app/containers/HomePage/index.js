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
             <div className="col-sm-6">
            <img className="headImage" src="http://frapbot.kohze.com/SpatialMaps/worldMap.png"/>
             </div>
             <div className="col-sm-6 textCard">
             <h1 className="headText"> What if </h1>
             <p>we had a global platform to collect and compare spatial proteomics datasets?
               SpatialMaps is a database with user friendly interface that is still accessible by programming languages such as R.</p>
             <button className="headButton"> Get Started! </button>
           </div>
          </div>
        </div>
        <div className="greyBG">
          <div className="row container" style={{margin:"auto", marginTop: 30, textAlign: 'left'}}>
            <div className="col-sm-3">
              <b>Open Souce</b> <br/> SpatialMaps is open source, easily editable and adjustable to researchers needs. 
            </div>
            <div className="col-sm-3">
              <b>Connecting Research</b> <br/> 
                we see an opportunity to improve the spatial proteomics data connectivity to accelerate the rate of scientific findings.
            </div>
            <div className="col-sm-3">
              <b>Accessability</b> <br/> With the pRoloc package, we provide a sophisticated solution to analyse spatial data. 
                  SpatialMaps is fully connected to the R environment
            </div>
            <div className="col-sm-3">
              <b>Data Science</b> <br/> We see spatial proteomics datasets as scarce scientific good, that can reveal scientificly relevant information beyond
                initial findings. Applying the newest machine learning algorithms to explore new leads is only one of its use cases.
            </div>
            
          </div>
        </div>
      <Footer />
      </div>
    );
  }
}
