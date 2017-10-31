/*
 *
 * DataView
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import makeSelectDataView from './selectors';
import messages from './messages';
import ReactDOM from 'react-dom';
import * as firebase from 'firebase';
import './dataView.css';
import ScatterPlot from './scatter.js';
import { ReactSVGPanZoom } from 'react-svg-pan-zoom';
import keydown, { Keys } from 'react-keydown';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { Slider } from 'office-ui-fabric-react/lib/Slider';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { CompoundButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';
import { ChoiceGroup, IChoiceGroupOption } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { DetailsList, DetailsListLayoutMode, Selection, CheckboxVisibility, buildColumns,
         IColumn, ConstrainMode, ColumnActionsMode } from 'office-ui-fabric-react/lib/DetailsList';
import { IContextualMenuProps, IContextualMenuItem, DirectionalHint,
         ContextualMenu } from 'office-ui-fabric-react/lib/ContextualMenu';
import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection';
import { Callout } from 'office-ui-fabric-react/lib/Callout';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
var ParallelCoordinatesComponent=require('react-parallel-coordinates');
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';


var Dimensions = require('react-dimensions');

export class DataView extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  constructor(props, context) {
    super(props, context);
    this.Viewer = null;
    this.state = {
      width: window.innerWidth,
      height: window.innerHeight,
      data: [],
      filteredData: [],
      filteredProfile: [],
      metaData: [],
      markerClasses: [],
      markerToggle: [],
      profileToggle: [],
      rndKey: '',
      exprsSet: [],
      filterInput: '',
      profileOutput:[],
      profileColumns:[],
      loading: true,
      plotHeight: 500,
      radius: 4,
      dispUnknown: true,
      labels: false,
      activeKey: [],
      activePeptideID: '',
      brushedData: [],
      showUniProt: false,
      plotPCA: true,
      plotTSNE: false,
      plotProfile: true,
      colorSelect: [''],
      radiusSelect: [''],
      transpSelect: [''],
      sortedBy: '',
      sortedAscending: true,
      showDownload: false,
      showToolBar: 'none',
      plotTool: 'auto',
      showColumnPopup: false,
      nameColumnPopup: '',
      showProfileDataColumn: false,
      showComments: false,
      showProfileFilter: false,
      showMetaData: false
    };
  }

  //function that resets the state functions to its original state
  resetAll(){
    this.setState({
        rndKey: '',
        filterInput: '',
        radius: 4,
        dispUnknown: true,
        labels: false,
        brushedData: [],
        showUniProt: false,
        plotPCA: true,
        plotTSNE: false,
        plotProfile: true,
        colorSelect: [''],
        radiusSelect: [''],
        transpSelect: [''],
        sortedBy: '',
        showToolBar: 'none',
        plotTool: 'auto',
      })
  };

  //function defines which peptide is highlighted
  setActiveKey(index, activePeptide) {
    this.setState({activeKey: index});
    this.setState({activePeptideID: activePeptide});
  };

  togglePlotHeight(){
    this.state.plotHeight == 500 ? this.setState({plotHeight: this.state.height - 150}) :
                                   this.setState({plotHeight: 500});
    this.setState({plotPCA : true});
  }

  setActiveColor(reset = false){
    !reset ? this.setState({colorSelect: this.state.nameColumnPopup}):
                                   this.setState({colorSelect : ['']});
  };

  setActiveRadius(reset = false){
    !reset ? this.setState({radiusSelect: this.state.nameColumnPopup}):
                                    this.setState({radiusSelect : ['']});
  };

  setActiveTransp(reset = false){
    !reset ? this.setState({transpSelect: this.state.nameColumnPopup}):
                                    this.setState({transpSelect: ['']});
  };

  switchPlotTools(reset = false){
    !reset ? this.setState({showToolBar: 'right', plotTool: ''}):
                                   this.setState({showToolBar: 'none',  plotTool: 'auto'});
  };

  toggleProfileColumn(reset = false){
    !reset ? this.setState({showProfileDataColumn: !this.state.showProfileDataColumn}):
                                   this.setState({showProfileDataColumn: false});
  };

  //adds or deletes organelle names from array to show/hide those
  addToggleMarkerArray(marker){
    let tempMarkerToggle = this.state.markerToggle;
    tempMarkerToggle.push(marker);
    return(tempMarkerToggle);
  };

  deleteToggleMarkerArray(marker){
    let tempMarkerToggle = this.state.markerToggle;
    tempMarkerToggle = tempMarkerToggle.filter(item => item !== marker);
    return(tempMarkerToggle);
  };

  toggleMarkers(marker){
    this.state.markerToggle.includes(marker.obj) ?
             this.setState({markerToggle: this.deleteToggleMarkerArray(marker.obj)}):
             this.setState({markerToggle: this.addToggleMarkerArray(marker.obj)});
    this.setState({filteredData: this.state.data.filter((dataRow) => {return !this.state.markerToggle.includes(dataRow.markers)})});
  };

  legendColor(marker){
    let coloredBorder = {borderStyle: "solid", borderTopColor: "#ff0000"};
    let whiteBorder = {borderStyle: "solid", borderTopColor: "#f4f4f4"};
    return this.state.markerToggle.includes(marker.obj) ? whiteBorder : coloredBorder;
  }

  //add or delete profile column
  addToggleProfileColumnArray(column){
    let tempMarkerToggle = this.state.profileToggle;
    tempMarkerToggle.push(column);
    return(tempMarkerToggle);
  };

  deleteToggleProfileColumnArray(column){
    let tempMarkerToggle = this.state.profileToggle;
    tempMarkerToggle = tempMarkerToggle.filter(item => item !== column);
    return(tempMarkerToggle);
  };

  toggleMarkers(column){
    this.state.profileToggle.includes(column.obj) ?
             this.setState({profileToggle: this.deleteToggleProfileColumnArray(column.obj)}):
             this.setState({profileToggle: this.addToggleProfileColumnArray(column.obj)});
    this.setState({filteredProfile: this.state.profileColumns.filter((dataRow) => {return !this.state.profileToggle.includes(dataRow.markers)})});
  };

  //ordering function (called from colum header modal)
  setOrderBy(ascending = true){
    this.setState({sortedAscending : !this.state.sortedAscending});
    if(typeof Object.entries(this.state.filteredData)[0][1][this.state.nameColumnPopup] === "number"){
      this.setState({filteredData : this.state.filteredData.sort((a,b) => {
              return ascending ? a[this.state.nameColumnPopup] - b[this.state.nameColumnPopup]:
                                 b[this.state.nameColumnPopup] - a[this.state.nameColumnPopup];
         })
      })
    } else {
      this.setState({filteredData : this.state.filteredData.sort((a, b) => {
        return ascending ? a[this.state.nameColumnPopup].localeCompare(b[this.state.nameColumnPopup]):
                           b[this.state.nameColumnPopup].localeCompare(a[this.state.nameColumnPopup]);
        })
      })
    }
  };

  //svg zoom initialization
  componentDidMount() {
    this.Viewer.fitToViewer();
  }

  //loading the fSet data from firebase
  //the loading state is set to false once data is fetched
  componentDidMount(){
    var data = [];
    var exprsSet = [];
    firebase.database().ref('data/' + this.props.params.uid + '/fSet').once("value", (snapshot) => {
      let data = snapshot.val();
      this.setState({
        data: data,
        loading : false,
        filteredData: data.filter((dataRow) => {return !this.state.markerToggle.includes(dataRow.markers)}),
      });
    })

  //loading the meta data from firebase
  firebase.database().ref('meta/' + this.props.params.uid).once("value", (snapshot) => {
      let meta = snapshot.val();
      this.setState({
        metaData: meta,
        profileColumns: meta.profileColumns,
        markerClasses: meta.markerClasses,
      });
      this.setState({
        filteredMarkerClasses: meta.markerClasses.filter((dataRow) => {return !this.state.profileToggle.includes(dataRow.markers)})
      })
    })
  };

  render() {

    //styles defines the height and width of the plots
    const styles = {
      width   : this.state.width/((this.state.plotPCA + this.state.plotProfile + this.state.showUniProt)),
      height  : this.state.plotHeight,
      padding : 30,
    };

    //the scatter plot component
    const d3Plot =  <div className="scatterContainer">
                      <ReactSVGPanZoom
                        width = {styles.width}
                        height = {styles.height}
                        ref = {Viewer => this.Viewer = Viewer}
                        SVGBackground="white"
                        background="white"
                        detectWheel = {true}
                        miniaturePosition = {"none"}
                        toolbarPosition = {this.state.showToolBar}
                        tool = {this.state.plotTool}
                        detectAutoPan = {false}>
                        <svg width = {styles.width} height = {styles.height}>
                          <ScatterPlot {...this.state} {...styles} SetActiveKey={(index, activePeptide) => this.setActiveKey(index, activePeptide)} />
                        </svg>
                      </ReactSVGPanZoom>
                    </div>

    //the loader that occurs before the dataset is fetched
    const loader =  <div className="loader">
                        <Spinner size={SpinnerSize.large} />
                    </div>;

    //creating a json object that contains the column attributes for the parallels package
    var keyVar = {};
    const profileKeys2 = this.state.profileColumns && this.state.profileColumns.map(function(obj, index) {
        index == 0 ?
        keyVar[obj] = {type:"number", "tickValues":[0,0.2,0.4,0.6,0.8]} :
        keyVar[obj] = {type:"number", "tickValues":0};
      }
    );
    const dimensions = keyVar;

    //the uniprot routine - a simple iframe that combines a url with the peptideID
    const iframeLink = "http://www.uniprot.org/uniprot/" + this.state.activePeptideID;
    const uniProtContainer = this.state.showUniProt &&
                             <iframe
                                       height = {styles.height}
                                       width = {styles.width}
                                       frameBorder = "0"
                                       src = {iframeLink}
                             />;

    // the profile plot
    const profileContainer = this.state.plotProfile &&
                             <div className="scatterContainer">
                                      <ParallelCoordinatesComponent
                                          data = {this.state.filteredData}
                                          dimensions = {dimensions}
                                          width = {styles.width}
                                          height = {styles.height}
                                          highlights = {1}
                                          colourHightlight = {this.state.activePeptideID}
                                          colour = {function(d, dataHighlighted) {
                                                      if(d.id == dataHighlighted){
                                                        console.log("works");
                                                        return("#ff0000")
                                                      } else if(d.markers != "unknown") {
                                            						return(d.Colors)
                                            					} else {
                                            						return("rgba(0,0,0,0.1)")
                                            					}
                                            			}}
                                          onBrushEnd_data = {(out) => this.setState({data : out})}
                                       />
                             </div>;

    //loader or plot logic
    const d3Container = this.state.loading ? loader : this.state.plotPCA && d3Plot;

    //table colum JSON attributes
    const keyAggregate = this.state.loading ? [] : Object.keys(this.state.data[1]);
    var columnVar = [];
    for (var i = 1; i < keyAggregate.length; ++i) {
        keyAggregate[i] != "Colors"
        && keyAggregate[i]
        && !(this.state.profileColumns.indexOf(keyAggregate[i]) > -1 && !this.state.showProfileDataColumn)
        && keyAggregate[i] != "PCA1"
        && keyAggregate[i] != "PCA2"  ?
        columnVar.push({
                  "key": keyAggregate[i]+i,
                  "name" : keyAggregate[i],
                  "fieldName" : keyAggregate[i],
                  "isResizable" : true,
                  "isRowHeader" : true,
                  "minWidth" : (this.state.width - 150)/(keyAggregate.length-this.state.profileColumns.length),
                  "isSorted" : this.state.sortedBy == keyAggregate[i] ? true : false,
                  "isSortedDescending" : this.state.sortedAscending,
                  "onColumnClick" : (i,j) => this.setState({showColumnPopup: true, nameColumnPopup: j.fieldName}),
      }) : null ;
    }

    //extracts the markerClasses from the meta data and displays them as buttons
    let markerClasses = !this.state.loading && this.state.markerClasses.split(', ');
    const legendItems = markerClasses && markerClasses.map(obj =>
      <button className="lengendItems" style={this.legendColor({obj})}  onClick={() => this.toggleMarkers({obj})} key={obj.toString()}>{obj}</button>
    );
    let profileColumnsVar = this.state.profileColumns;
    const profileFilterButtons = profileColumnsVar && profileColumnsVar.map(obj =>
      <Checkbox
        label={obj}
        defaultChecked={ true }
        onChange={ this._onCheckboxChange }
      />
    );

    //the data table inclusive the bar above the table
    const table = <div className="tableCore">
                    <div className="belowMainPlot row">
                      <div className="col-sm-2">
                        <SearchBox
                          onSearch={ (newValue) => this.setState({filterInput: newValue}) }
                          onChange={(newValue) => newValue == '' && this.setState({filterInput: newValue}) }
                          style={{backgroundColor: '#f2e4d8'}} labelText='Filter'
                        />
                      </div>
                      <div className="col-sm-10">
                        <button className="heightToggle" onClick={() => this.togglePlotHeight()}> <i className="fa fa-arrows-v"></i></button>
                        <button className="heightToggle" onClick={() => this.switchPlotTools()}> <i className="fa fa-object-group"></i></button>
                        <button className="heightToggle" onClick={() => this.resetAll()}> <i className="fa fa-undo"></i></button>
                        <button className="heightToggle" onClick={() => this.toggleProfileColumn()}> <i className="fa fa-table"></i></button>
                        {legendItems}
                      </div>
                    </div>
                    <MarqueeSelection>
                      <DetailsList
                        items = {this.state.filteredData}
                        initialFocusedIndex = {1}
                        columns = {columnVar}
                        setKey = {this.state.activeKey}
                        canResizeColumns = {true}
                        constrainMode = {ConstrainMode.unconstrained}
                        layoutMode = {DetailsListLayoutMode.fixedColumns}
                        isLazyLoaded = {true}
                        columnActionsMode = {ColumnActionsMode.clickable}
                        checkboxVisibility = {CheckboxVisibility.hidden}
                        selectionPreservedOnEmptyClick = {true}
                        onActiveItemChanged = { (item, index) => this.setState({ activeKey : index }) }
                        />
                    </MarqueeSelection>
                  </div>;

    const metaDataContent = <div> test content </div>
    return (
      <div>
        <Helmet
          title="SpatialMaps - DataView"
          meta={[
            { name: 'description', content: 'Description of DataView' },
          ]}
        />

        {/*Top left buttons & sliders */}
        <div className="configBar">
          <div className="leftButtons first" onClick={() => this.setState({showComments : true})}>Comments </div>
          <div className="leftButtons first" onClick={() => this.setState({showProfileFilter : !this.state.showProfileFilter})}>Profile Filter</div>
          <div className="leftButtons" onClick={() => this.setState({showDownload : true})}>Download </div>
          <div className="leftButtons" onClick={() => this.setState({showMetaData : !this.state.showMetaData})}>Meta Data</div>
        <div className="slider">
          <Slider
            label = 'Scatter Point Size'
            min = {0.5}
            max = {10}
            step = {0.5}
            defaultValue = {4}
            onChange = {radius => this.setState({ radius }) }
            showValue = {false}
          />
        </div>
        <div className="toggle">
           <Toggle
            label = 'Color Unknown'
            onAriaLabel = 'This toggle is checked. Press to uncheck.'
            offAriaLabel = 'This toggle is unchecked. Press to check.'
            onText = 'On'
            offText = 'Off'
            onChange = { () => this.setState({ labels : !this.state.labels }) }
        />
        </div>
        <div className="toggle">
          <Toggle
           label = 'Hide Unknown'
           onAriaLabel = 'This toggle is checked. Press to uncheck.'
           offAriaLabel = 'This toggle is unchecked. Press to check.'
           onText = 'On'
           offText = 'Off'
           onChange = { () => this.setState({ dispUnknown : !this.state.dispUnknown }) }
          />
        </div>

        {/*Top right buttons */}
        <div className="choiceChild"  onClick={ () => this.setState({ showUniProt : !this.state.showUniProt }) }>
          UniProt
        </div>
        <div className="choiceChild"  onClick={ () => this.setState({ plotProfile : !this.state.plotProfile }) }>
          Profile
        </div>
        {/*}<div className="choiceChild" onClick={ () => this.setState({ plotTSNE : !this.state.plotTSNE }) }>
          T-SNE
        </div>
        */}
        <div className="choiceChild" onClick={ () => this.setState({ plotPCA : !this.state.plotPCA }) }>
          PCA
        </div>
      </div>

      {/* The modal showing on colum header click */}
      <Dialog
        isOpen={ this.state.showColumnPopup }
        type={ DialogType.normal }
        onDismiss={() => this.setState({showColumnPopup : !this.state.showColumnPopup})}
        title='Column Options'
        isBlocking={ false }
        containerClassName='ms-dialogMainOverride'>
        <p style={{textAlign: 'center'}}> Use the column to display additional data in the plot with
          the help of modifiers
        </p>
        <div className="modChoice"  onClick={() => this.setActiveColor()}>
          Color
        </div>
        <div className="modChoice"  onClick={() => this.setActiveRadius()}>
          Radius
        </div>
        <div className="modChoice"  onClick={() => this.setActiveTransp()}>
          Transparency
        </div>
        <div className="modChoice" onClick={() => this.setOrderBy(this.state.sortedAscending)}>
          Sort Table by Column
        </div>
      </Dialog>

      {/* side modal for comment section */}
      <Panel
          isBlocking={ false }
          isOpen={ this.state.showComments }
          isLightDismiss={ true }
          onDismiss={ () => this.setState({ showComments: false }) }
          type={ PanelType.smallFixedNear }
          headerText='Comments'
          closeButtonAriaLabel='Close'
        >
          <span className='ms-font-m'>adding disqus commenting plugin here</span>
      </Panel>

      <Panel
          isBlocking={ false }
          isOpen={ this.state.showProfileFilter }
          isLightDismiss={ true }
          onDismiss={ () => this.setState({ showProfileFilter: false }) }
          type={ PanelType.smallFixedFar }
          headerText='Profile Plot Columns'
          closeButtonAriaLabel='Close'
        >
        <span className='ms-font-m'></span>

        {profileFilterButtons}

      </Panel>

      {/* download modal */}
      <Dialog
        isOpen={ this.state.showDownload }
        type={ DialogType.largeHeader }
        onDismiss={() => this.setState({showDownload : !this.state.showDownload})}
        title='Dataset Download'
        isBlocking={ false }
        containerClassName='ms-dialogMainOverride'>
        <p style={{textAlign: 'center'}}> Load the dataset object directly into R</p>
        <div className="codeBox">
          <code className="RCode"> library(pRolocdata) <br/> object = download("{this.props.params.uid}") </code>
        </div>
      </Dialog>

      {/* metadata or plot logic */}
      {this.state.showMetaData ?
        <div className="mainPlot" style={{height: this.state.plotHeight}}>
          {metaDataContent}
      </div>
      :
      <div className="mainPlot" style={{height: this.state.plotHeight}}>
        {profileContainer}
        {d3Container}
        {uniProtContainer}
      </div>
      }
      <div className="table">
          {table}
      </div>
      </div>
    );
  }
}

DataView.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  DataView: makeSelectDataView(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DataView);
