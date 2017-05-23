/**
*
* Footer
*
*/

import React from 'react';
import './footer.css';

class Footer extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="footer">
        <div className="container row footerContent">
          <div className="col-sm-4">
          Impressum
          </div>
          <div className="col-sm-4">
          Contact
          </div>
          <div className="col-sm-4">
          Terms & Policies
          </div>
        </div>
      </div>
    );
  }
}

Footer.propTypes = {

};

export default Footer;
