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
import { Link } from 'react-router';
import './home.css'
import Footer from '../../components/Footer';



export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <div className="welcome">
          <div className="row container" style={{margin:"auto", marginTop: 30}}>
             <div className="col-sm-6">
            <img className="headImage" src="http://frapbot.kohze.com/other/people.png"/>
             </div>
             <div className="col-sm-6 textCard">
             <h1 className="headText"> What if </h1>
             <p>there was a platform to collect and compare spatial proteomics datasets.
               A database that offers a user friendly interface that is still accessible by programming languages such as R.</p>
             <button className="headButton"> Get Started </button>
           </div>
          </div>
        </div>
        <div className="greyBG">
          <div className="row container" style={{margin:"auto", marginTop: 30}}>
            <div className="col-sm-6 bottomCard">
            <table>
              <tbody>
              <tr>
                <td><img
                src="https://static2.sharepointonline.com/files/fabric/assets/brand-icons/document/png/xlsx_32x1.png"/>
                </td>
                <td> <b> Connecting Research </b> <br/> While reproducable research in the proteomics field prospers,
                we see an opportunity to better connect spatial proteomics data to accelerate the rate of scientific findings.  </td>
              </tr>
              <tr>
                <td><img
                  src="https://static2.sharepointonline.com/files/fabric/assets/brand-icons/document/png/xlsx_32x1.png"/>
                </td>
                <td> <b> Data Science </b> <br/> We see spatial proteomics datasets as scarce scientific good, that can reveal scientificly relevant information beyond
                initial findings. Applying the newest machine learning algorithms to explore new leads is only one of its use cases.   </td>
              </tr>
              <tr>
                <td><img
                  src="https://static2.sharepointonline.com/files/fabric/assets/brand-icons/document/png/xlsx_32x1.png"/>
                </td>
                <td> <b> Accessability </b> <br/> With the pRoloc package, we provide a sophisticated solution to analyse spatial data. SpatialMaps is fully connected to the R environment
                while providing a simplyfied and straigh forward solution to access and analyse a variety of proteomics datasets. </td>
              </tr>
              </tbody>
            </table>
            </div>
            <div className="col-sm-6">
              <img className="headImage" src="http://frapbot.kohze.com/other/welcome_people.png"/>
            </div>
          </div>

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
            <div className="col-sm-6">
              <img className="headImage" src="http://frapbot.kohze.com/other/welcome_first.png"/>
            </div>
          </div>
        </div>
      <Footer />
      </div>
    );
  }
}
