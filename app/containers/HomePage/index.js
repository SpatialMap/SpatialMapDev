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
import './home.css'


export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const One = "Welcome to SpatialMaps";


    return (
      <div>
        <div className="welcome">
          <div className="row container" style={{margin:"auto", marginTop: 30}}>
             <div className="col-sm-6">
            <img className="headImage" src="http://frapbot.kohze.com/other/people.png"/>
             </div>
             <div className="col-sm-6 textCard">
             <h1 className="headText"> What if </h1>
             <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
             tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero
               takimata sanctus est Lorem.</p>
             <button className="headButton"> get started </button>
           </div>
          </div>
        </div>

        <div className="greyBG">
          <div className="row container" style={{margin:"auto", marginTop: 30}}>
            <div className="col-sm-6 bottomCard">
            <h2 className="bottomText"> The problem </h2>
            <table>
              <tbody>
              <tr>
                <td><img
                src="https://static2.sharepointonline.com/files/fabric/assets/brand-icons/document/png/xlsx_32x1.png"/>
                </td>
                <td>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                tempor invidunt ut labore et dolore magna aliquyam erat,</td>
              </tr>
              <tr>
              <td><img
              src="https://static2.sharepointonline.com/files/fabric/assets/brand-icons/document/png/xlsx_32x1.png"/>
              </td>
                <td>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                tempor invidunt ut labore et dolore magna aliquyam erat,</td>
              </tr>
              <tr>
              <td><img
              src="https://static2.sharepointonline.com/files/fabric/assets/brand-icons/document/png/xlsx_32x1.png"/>
              </td>
                <td>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                tempor invidunt ut labore et dolore magna aliquyam erat,</td>
              </tr>
              </tbody>
            </table>
            </div>
            <div className="col-sm-6">
              <img className="headImage" src="http://frapbot.kohze.com/other/welcome_people.png"/>
            </div>
          </div>

          <div className="row container" style={{margin:"auto", marginTop: 30}}>
             <div className="col-sm-6">
            <img className="headImage" src="http://frapbot.kohze.com/other/people.png"/>
             </div>
             <div className="col-sm-6 bottomCard">
             <h2 className="bottomText"> Idea & Foundation </h2>
             <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
             tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero
               takimata sanctus est Lorem.</p>
           </div>
          </div>

          <div className="row container" style={{margin:"auto", marginTop: 30}}>
            <div className="col-sm-6 bottomCard">
            <h2 className="bottomText"> Technology </h2>
            <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
            tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero
              takimata sanctus est Lorem.</p>
              <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
              tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero
                takimata sanctus est Lorem.</p>
            </div>
            <div className="col-sm-6">
              <img className="headImage" src="http://frapbot.kohze.com/other/welcome_first.png"/>
            </div>
          </div>
        </div>

        <div className="container row continueBar">
          <button className="continueButton"> About </button>
          <button className="continueButton"> Datasets </button>
          <button className="continueButton"> Login/Register </button>
        </div>

      </div>
    );
  }
}
