/*
 *
 * Documentation
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import './documentation.css'

export class Documentation extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet
          title="Documentation"
          meta={[
            { name: 'description', content: 'Description of Documentation' },
          ]}
        />

        <div className="row" style={{margin: 'auto', width: '100%'}}>
          <div className="mainContent">
           <iframe className="iframe" frameBorder="0" src="http://bioconductor.org/packages/release/bioc/vignettes/pRolocGUI/inst/doc/pRolocGUI.html" />
          </div>
        </div>
      </div>
    );
  }
}

Documentation.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(null, mapDispatchToProps)(Documentation);
