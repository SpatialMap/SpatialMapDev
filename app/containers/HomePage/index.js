import React                    from 'react';
import { FormattedMessage }     from 'react-intl';
import messages                 from './messages';
import { Link, browserHistory } from 'react-router';
import Footer                   from '../../components/Footer';
import { Spinner, SpinnerSize }        from 'office-ui-fabric-react/lib/Spinner';

import './home.css'

export default class HomePage extends React.PureComponent {
  render() {
    if(this.props.router.location.hash){
      browserHistory.push("/dataView/" + this.props.router.location.hash.replace('#',''));
    }

    const content = <div>
                      <div className="welcomeHome">
                        <div className="row container" style={{margin:"auto", marginTop: 40}}>
                            <div className="col-sm-12">
                            <div className="col-sm-12 textCardHome" style={{textAlign: "center", margin: 'auto'}}>
                             <h1 className="headText fadeInPicture"> What if </h1>
                             <div className="col-sm-6 col-sm-offset-3 fadeInPicture">
                              <p>there was a global platform to collect and compare spatial proteomics datasets?
                              <b> SpatialCellAtlas </b> is a database with user friendly interface that is still accessible by programming languages such as R.</p>
                            </div>
                            </div>
                             <img className="headImageHome imageFadeIn"
                               src="https://prabakaran-group.org/images/lungwort/header-image.png"/>
                            </div>
                            <div className="col-sm-12 textCardHome" style={{textAlign: "center", margin: 'auto'}}>
                             <div className="col-sm-6 col-sm-offset-3 fadeInPicture">
                              <Link to={'/about'}>
                                <button className="headButton fadeInPicture"> Learn More </button>
                              </Link>
                              <Link to={'/login'}>
                                <button className="headButton fadeInPicture"> Sign In </button>
                              </Link>
                             </div>
                            </div>
                        </div>
                      </div>
                    </div>;

    return (
      content
    );
  }
}
