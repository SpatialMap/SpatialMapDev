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
                        <div className="row container" style={{margin:"auto"}}>
                            <div className="col-sm-12 textCardHome" style={{textAlign: 'center', margin: 'auto'}}>
                               <div className="col-sm-12 fadeInPicture headDescription">
                                <p className="headTextHeader fadeInPicture"> Spatial Cell Atlas </p>
                                <p className="headText fadeInPicture"> Upload, Analyse and Share </p>
                                 <img className="headImageHome imageFadeIn"
                                 src="http://prabakaran.kohze.com/images/header-image-dark.png"/>
                                <div className="col-sm-12 fadeInPicture">
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
                      </div>
                      <img className="bottom-right SmallImage" src="https://www.girton.cam.ac.uk/wp-content/themes/wp-girton/assets/img/universitycambridgelogo.png" />
                    </div>;

    return (
      content
    );
  }
}
