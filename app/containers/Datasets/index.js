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
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import './datasets.css';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { DefaultButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';


export class Datasets extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      msnsets: [],
      keyMatches: [],
      loading: true,
      searchTerm: this.props.params.search ? this.props.params.search : '',
    }
  }

  componentDidMount(){
    var msnsets = [];
    firebase.database().ref('meta').on("child_added", (snapshot) => {
          let set = snapshot.val();
          msnsets.push({
            id: snapshot.getKey(),
            description: set.Description,
            author: set.author,
            contact: set.contact,
            email: set.email,
            lab: set.lab,
            operator: set.operator,
            species: set.species,
            tissue: set.tissue,
            title:set.title,
            varName: set.varName,
          })

          this.setState({
            msnsets : msnsets,
            loading: false,
          })
    })
    var keySet = [];
    if(this.state.searchTerm) {
    firebase.database().ref('keys/' + this.state.searchTerm).on("child_added", (snapshot) => {
      if(snapshot.exists()) {
        let keyNames = snapshot.val();
        keySet.push({
          matchedKeys: keyNames.key.name
          })
          console.log("exists");
        }
        this.setState({
          keyMatches : matchedKeys
        })
        })
    } else {
      this.setState({keyMatches : null})
    }

  };

  render() {

    const DataSetItem = this.state.msnsets.map((detail) =>
      <DataChild key={'dataChild'+detail.id} item={detail} searchTerm={this.state.searchTerm} />
    );

    const loader =  <div className="loader">
                      <Spinner size={SpinnerSize.large} />
                    </div>;

    const flexTiles = <div> {DataSetItem} </div>;
    const itemContainer = this.state.loading == true ? loader : flexTiles;
    const keyContainer = <div> works </div>;

    return (
      <div>
        <Helmet
          title="Datasets"
          meta={[
            { name: 'description', content: 'Description of Datasets' },
          ]}
        />
      <div className="headBar row container">
        <div className="searchBox col-sm-6">
          <SearchBox
            onChange={ (newValue) => this.setState({searchTerm : newValue}) }
          />
        </div>
        <div className="topButtons col-sm-2 col-sm-offset-4">
          <button onClick={() => console.log(this.state.keyMatches)}> show keyMatches </button>
        </div>
        {this.state.keyMatches && keyContainer}
        {itemContainer}
      </div>
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
