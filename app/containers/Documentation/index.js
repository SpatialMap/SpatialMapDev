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

    let docURL = '';
    switch(this.props.params.id) {
     case "SpatialMaps":
         docURL = "http://frapbot.kohze.com/SpatialMaps/human.jpg";
         break;
     case "pRoloc":
         docURL = "https://bioconductor.org/packages/release/bioc/vignettes/pRoloc/inst/doc/pRoloc-tutorial.pdf";
         break;
     case "API":
         docURL = "http://frapbot.kohze.com/SpatialMaps/arabidopsis.jpg";
         break;
     case "MSnbase":
         docURL = "https://bioconductor.org/packages/release/bioc/vignettes/MSnbase/inst/doc/MSnbase-development.html";
         break;
     case "DataStorage":
         docURL = "http://frapbot.kohze.com/SpatialMaps/drosophila.jpg";
         break;
     case "Accounts":
         docURL = "http://frapbot.kohze.com/SpatialMaps/drosophila.jpg";
         break;
     default:
         docURL = "http://frapbot.kohze.com/SpatialMaps/placeholder.jpg";
         break;
    }

    const iframeContainer = docURL && <iframe className="iframe" frameBorder="0" src={docURL} />;

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
            {iframeContainer}
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
