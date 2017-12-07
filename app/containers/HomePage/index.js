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
        <div className="welcomeHome">
          <div className="row container" style={{margin:"auto", marginTop: 40}}>
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
        
        </div>
    );
  }
}
