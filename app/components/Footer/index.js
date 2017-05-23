/**
*
* Footer
*
*/

import React from 'react';
import './footer.css';
import { browserHistory } from 'react-router';

class Footer extends React.Component { // eslint-disable-line react/prefer-stateless-function

  render() {

    return (
      <div className="footer">
        <div className="container row footerContent" style={{margin: 'auto'}}>
            <div className="col-sm-3">
              Impressum
            </div>
            <div className="col-sm-3">
              Contact
            </div>
            <div className="col-sm-3">
              Terms & Policies
            </div>
            <div className="col-sm-3">
              Funding
            </div>
        </div>
      </div>
    );
  }
}

Footer.propTypes = {

};

export default Footer;
