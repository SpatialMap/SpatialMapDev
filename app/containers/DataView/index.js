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
      metaData: [],
      rndKey: '',
      exprsSet: [],
      filterInput: '',
      profileOutput:[],
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
      showComments: false,
      showMetaData: false,
    };
  }

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

  setActiveKey(index, activePeptide) {
    this.setState({activeKey: index});
    this.setState({activePeptideID: activePeptide});
  };

  togglePlotHeight(){
    this.state.plotHeight == 500 ? this.setState({plotHeight: 820}) :
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
  }

  setOrderBy(ascending = true){
    this.setState({sortedAscending : !this.state.sortedAscending});
    if(typeof Object.entries(this.state.data)[0][1][this.state.nameColumnPopup] === "number"){
      this.setState({data : this.state.data.sort((a,b) => {
              return ascending ? a[this.state.nameColumnPopup] - b[this.state.nameColumnPopup]:
                                 b[this.state.nameColumnPopup] - a[this.state.nameColumnPopup];
         })
      })
    } else {
      this.setState({data : this.state.data.sort((a, b) => {
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

  //loading scatterplot data from firebase
  componentDidMount(){
    var data = [];
    var exprsSet = [];
    firebase.database().ref('data/' + this.props.params.uid + '/fSet').once("value", (snapshot) => {
      let data = snapshot.val();
      this.setState({
        data: data,
        loading : false,
      });
    })

    firebase.database().ref('meta/' + this.props.params.uid).once("value", (snapshot) => {
      let meta = snapshot.val();
      this.setState({
        metaData: meta,
        profileColumns: meta.profileColumns
      });
    })
  };

  render() {

    const styles = {
      width   : this.state.width/((this.state.plotPCA + this.state.plotProfile + this.state.showUniProt)),
      height  : this.state.plotHeight,
      padding : 30,
    };

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

    const loader =  <div className="loader">
                        <Spinner size={SpinnerSize.large} />
                    </div>;

    var keyVar = {};
    const profileKeys2 = this.state.profileColumns && this.state.profileColumns.map(function(obj) {
        keyVar[obj] = {type:"number", "tickValues":[0,0.5,1]};
      }
    );

    const dimensions = keyVar;

    const iframeLink = "http://www.uniprot.org/uniprot/" + this.state.activePeptideID;
    const uniProtContainer = this.state.showUniProt &&
                             <iframe
                                       height = {styles.height}
                                       width = {styles.width}
                                       frameBorder = "0"
                                       src = {iframeLink}
                             />;

    const profileContainer = this.state.plotProfile &&
                             <div className="scatterContainer">
                                      <ParallelCoordinatesComponent
                                          data = {this.state.data}
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

    const d3Container = this.state.loading ? loader : this.state.plotPCA && d3Plot;
    const keyAggregate = this.state.loading ? [] : Object.keys(this.state.data[1]);
    var columnVar = [];
    for (var i = 1; i < keyAggregate.length; ++i) {
        keyAggregate[i] != "Colors" && keyAggregate[i] != "PCA1" && keyAggregate[i] != "PCA2"  ?
        columnVar.push({
                  "key": keyAggregate[i]+i,
                  "name" : keyAggregate[i],
                  "fieldName" : keyAggregate[i],
                  "isResizable" : true,
                  "isRowHeader" : true,
                  "minWidth" : (this.state.width - 300)/keyAggregate.length,
                  "isSorted" : this.state.sortedBy == keyAggregate[i] ? true : false,
                  "isSortedDescending" : this.state.sortedAscending,
                  "onColumnClick" : (i,j) => this.setState({showColumnPopup: true, nameColumnPopup: j.fieldName}),
      }) : null ;
    }

    let arr = Object.values(this.state.data).map((k) => this.state.data[k]);
    const uniqueFactors =  arr.filter((x, i, a) => a.indexOf(x) == i);
    console.log(arr);
    let fillContent = ['placeholder'];
    const legendItems = fillContent.map((number) =>
      <button className="lengendItems" key={number.toString()}>{number}</button>
    );

    const table = <div className="tableCore">
                    <div className="belowMainPlot row">
                      <div className="col-sm-3">
                        <SearchBox
                          onSearch={ (newValue) => this.setState({filterInput: newValue}) }
                          onChange={(newValue) => newValue == '' && this.setState({filterInput: newValue}) }
                          style={{backgroundColor: '#f2e4d8'}} labelText='Filter'
                        />
                      </div>
                      <div className="col-sm-9">
                        <button className="heightToggle" onClick={() => this.togglePlotHeight()}> <i className="fa fa-arrows-v"></i></button>
                        <button className="heightToggle" onClick={() => this.switchPlotTools()}> <i className="fa fa-object-group"></i></button>
                        <button className="heightToggle" onClick={() => this.resetAll()}> <i className="fa fa-undo"></i></button>

                        {legendItems}
                      </div>
                    </div>
                    <MarqueeSelection>
                      <DetailsList
                        items = {this.state.data}
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
    return (
      <div>

        <Helmet
          title="DataView"
          meta={[
            { name: 'description', content: 'Description of DataView' },
          ]}
        />

        <div className="configBar">
          <div className="leftButtons first" onClick={() => this.setState({showComments : true})}>Comments </div>
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


        <div className="choiceChild"  onClick={ () => this.setState({ showUniProt : !this.state.showUniProt }) }>
            UniProt
        </div>
        <div className="choiceChild"  onClick={ () => this.setState({ plotProfile : !this.state.plotProfile }) }>
          Profile
        </div>
        <div className="choiceChild" onClick={ () => this.setState({ plotTSNE : !this.state.plotTSNE }) }>
          T-SNE
        </div>
        <div className="choiceChild" onClick={ () => this.setState({ plotPCA : !this.state.plotPCA }) }>
          PCA
        </div>
      </div>

      <Dialog
        isOpen={ this.state.showColumnPopup }
        type={ DialogType.normal }
        onDismiss={() => this.setState({showColumnPopup : !this.state.showColumnPopup})}
        title='Column Options'
        isBlocking={ false }
        containerClassName='ms-dialogMainOverride'>
        <p style={{textAlign: 'center'}}> Use the column to display additional data in the plot with the help of modifiers</p>

        <div className="modChoice"  onClick={() => this.this.state.tActiveColor()}>
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

      <Dialog
        isOpen={ this.state.showDownload }
        type={ DialogType.largeHeader }
        onDismiss={() => this.setState({showDownload : !this.state.showDownload})}
        title='Dataset Download'
        isBlocking={ false }
        containerClassName='ms-dialogMainOverride'>
        <p style={{textAlign: 'center'}}> Load the dataset object directly into R or download the source file</p>
        <div className="codeBox">
          <code className="RCode"> library(pRolocdata) <br/> object = pRolocdata("{this.props.params.uid}") </code>
        </div>
        <p style={{textAlign: 'center'}}> <b> OR </b> </p>
        <div className="sourceDownloadButtons">
          <DefaultButton text='.RData' />
          <DefaultButton text='.RDS' />
          <DefaultButton text='.CSV' />
        </div>
      </Dialog>
      {this.state.showMetaData ?
        <div className="mainPlot" style={{height: this.state.plotHeight}}>
          MetaDataPlaceholder
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
