/*
 *
 * Datasets
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import makeSelectDatasets from './selectors';
import messages from './messages';
import DataChild from './dataChilds.js';
import * as firebase from 'firebase';
import './datasets.css'

export class Datasets extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      productallid: [],
    }
  }

  componentDidMount(){
    var productallid = [];
    firebase.database().ref('meta').orderByChild('tissue').on("child_added", (snapshot) => {
          let product = snapshot.val();
          // console.log(product,'snapshot.val()');
          productallid.push({
            id: snapshot.getKey(),
            Description: product.Description,
            author: product.author,
            contact: product.contact,
            email: product.email,
            lab: product.lab,
            operator: product.operator,
            species: product.species,
            tissue: product.tissue,
            title:product.title,
            varName: product.varName,
          });
    });
    this.setState({
      productallid
    })
  }

  render() {

    var DataSetItem = this.state.productallid.map((detail)=>
     <DataChild key={'dataChild'+detail.id} item={detail} />
    );

    var flexTiles = <div className="flexTiles"> {DataSetItem} </div>;

    return (
      <div>
        <Helmet
          title="Datasets"
          meta={[
            { name: 'description', content: 'Description of Datasets' },
          ]}
        />
        {flexTiles}
      </div>
    );
  }
}

Datasets.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  Datasets: makeSelectDatasets(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Datasets);
