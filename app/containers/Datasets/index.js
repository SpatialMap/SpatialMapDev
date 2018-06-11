/*
 *
 * Datasets
 *
 */

import React, { PropTypes }            from 'react';
import { connect }                     from 'react-redux';
import Helmet                          from 'react-helmet';
import { FormattedMessage }            from 'react-intl';
import { createStructuredSelector }    from 'reselect';
import makeSelectDatasets              from './selectors';
import messages                        from './messages';
import DataChild                       from './dataChilds.js';
import * as firebase                   from 'firebase';
import { Spinner, SpinnerSize }        from 'office-ui-fabric-react/lib/Spinner';
import './datasets.css';
import { SearchBox }                   from 'office-ui-fabric-react/lib/SearchBox';
import { DefaultButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';
import { Dropdown, IDropdown, DropdownMenuItemType, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';

export class Datasets extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      msnsets    : [],
      loading    : true,
      searchTerm : this.props.params.search ? this.props.params.search : '',
      organelle  : '',
      speTis     : ''
    }
  }

  componentDidMount(){
    var msnsets = [];
    firebase.database().ref('meta').on("child_added", (snapshot) => {
          let set = snapshot.val();
          msnsets.push({
            id          : snapshot.getKey(),
            description : set.Description,
            author      : set.author,
            contact     : set.contact,
            email       : set.email,
            lab         : set.lab,
            operator    : set.operator,
            species     : set.species,
            tissue      : set.tissue,
            title       : set.title,
            varName     : set.varName,
            public      : set.public,
            featureIds  : set.featureNames,
            organelles  : set.markerClasses
          })

          this.setState({
            msnsets     : msnsets,
            loading     : false,
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
          }
          })
        }
    };

    //dynamically creating species/tissue list:
    //temp1.map(x => {
    //arr.push(x.tissue.toString())
    //console.log(x.tissue.toString())
   //})


  render() {
    const DataSetItem = this.state.msnsets.map((detail) =>
      <DataChild key                = {'dataChild'+detail.id}
                 item               = {detail}
                 searchTerm         = {this.state.searchTerm}
                 organelleSelection = {this.state.organelle}
                 speTisSelection    = {this.state.speTis} />
    );

    const loader =  <div className="loader">
                      <Spinner size={SpinnerSize.large} />
                    </div>;

    const placeholder = <div> No entry found </div>;
    const flexTiles = <div> {DataSetItem} </div>;
    const itemContainer = this.state.loading == true ? loader : flexTiles;
    const DropdownSpeciesTissue = <Dropdown
                                    placeHolder="Species and Tissue"
                                    onChanged={(x,y) => this.setState({speTis : x.key})}
                                    options={[
                                      { key: '', text: '' },
                                      { key: 'Header2', text: 'Species', itemType: DropdownMenuItemType.Header },
                                      { key: 'Homo sapiens', text: 'Homo sapiens' },
                                      { key: 'Arabidopsis thaliana', text: 'Arabidopsis thaliana' },
                                      { key: 'Mouse', text: 'Mouse' },
                                      { key: 'Drosophila melanogaster', text: 'Drosophila melanogaster' },
                                      { key: 'Gallus gallus', text: 'Gallus gallus' },
                                      { key: 'divider_1', text: '-', itemType: DropdownMenuItemType.Divider },
                                      { key: 'Header3', text: 'Tissue', itemType: DropdownMenuItemType.Header },
                                      { key: 'Cell', text: 'Cell' },
                                      { key: 'Embryos', text: 'Embryos' },
                                      { key: 'Callus', text: 'Callus' }
                                    ]}
                                />;

    const dropdownOrganelle =  <Dropdown
                                  placeHolder="Organelle"
                                  onChanged={(x,y) => this.setState({organelle : x.key})}
                                  options={[
                                    { key: '', text: '' },
                                    { key: 'Cytosol', text: 'Cytosol' },
                                    { key: 'Endoplasmic Reticulum', text: 'Endoplasmic Reticulum' },
                                    { key: 'Lysosome', text: 'Lysosome' },
                                    { key: 'Nucleus', text: 'Nucleus' },
                                    { key: 'Golgi', text: 'Golgi' },
                                    { key: 'Plasma Membrane', text: 'Plasma Membrane' },
                                    { key: 'Proteasome', text: 'Proteasome' },
                                    { key: 'Ribosome 40S', text: 'Ribosome 40S' },
                                    { key: 'Ribosome 60S', text: 'Ribosome 60S' }
                                  ]}
                                />;

    return (
      <div>
          <Helmet
            title="Datasets"
            meta={[{name: 'description', content: 'Description of Datasets'},]}
          />
          <div className="headBar row container">
              <div className="searchBox col-sm-6">
                <SearchBox
                  onChange={(newValue) => this.setState({searchTerm : newValue})}
                  value={this.state.searchTerm}
                />
              </div>
            <div className="searchBox col-sm-3"> {DropdownSpeciesTissue} </div>
            <div className="searchBox col-sm-3"> {dropdownOrganelle}     </div>
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
