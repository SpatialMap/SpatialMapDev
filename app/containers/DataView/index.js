/*
 *
 * DataView
 *
 */

import React, { PropTypes }                 from 'react';
import { connect }                          from 'react-redux';
import Helmet                               from 'react-helmet';
import { FormattedMessage }                 from 'react-intl';
import { createStructuredSelector }         from 'reselect';
import makeSelectDataView                   from './selectors';
import messages                             from './messages';
import ReactDOM                             from 'react-dom';
import * as firebase                        from 'firebase';
import './dataView.css';
import ScatterPlot                          from './scatter.js';
import { ReactSVGPanZoom }                  from 'react-svg-pan-zoom';
import keydown, { Keys }                    from 'react-keydown';
import { PrimaryButton, DefaultButton }     from 'office-ui-fabric-react/lib/Button';
import { Spinner, SpinnerSize }             from 'office-ui-fabric-react/lib/Spinner';
import { Checkbox }                         from 'office-ui-fabric-react/lib/Checkbox';
import { Slider }                           from 'office-ui-fabric-react/lib/Slider';
import { Toggle }                           from 'office-ui-fabric-react/lib/Toggle';
import { Label }                            from 'office-ui-fabric-react/lib/Label';
import { CompoundButton, IButtonProps }     from 'office-ui-fabric-react/lib/Button';
import { ChoiceGroup, IChoiceGroupOption }  from 'office-ui-fabric-react/lib/ChoiceGroup';
import { autobind }                         from 'office-ui-fabric-react/lib/Utilities';
import { TextField }                        from 'office-ui-fabric-react/lib/TextField';
import { DetailsList, DetailsListLayoutMode,
         Selection, CheckboxVisibility,
         buildColumns, IColumn,
         ConstrainMode, ColumnActionsMode } from 'office-ui-fabric-react/lib/DetailsList';
import { IContextualMenuProps, IContextualMenuItem,
          DirectionalHint, ContextualMenu } from 'office-ui-fabric-react/lib/ContextualMenu';
import { MarqueeSelection }                 from 'office-ui-fabric-react/lib/MarqueeSelection';
import { Callout }                          from 'office-ui-fabric-react/lib/Callout';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { SearchBox }                        from 'office-ui-fabric-react/lib/SearchBox';
import { Panel, PanelType }                 from 'office-ui-fabric-react/lib/Panel';
import { ColorPicker } from 'office-ui-fabric-react/lib/ColorPicker';
export interface IBasicColorPickerExampleState { color: string; }

var ParallelCoordinatesComponent = require('react-parallel-coordinates');
var Dimensions                   = require('react-dimensions');

export class DataView extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  constructor(props, context) {
    super(props, context);
    this.Viewer = null;
    this.state  = {
      width                 : window.innerWidth,
      height                : window.innerHeight,
      data                  : [],
      filteredData          : [],
      filteredProfile       : [],
      metaData              : [],
      markerClasses         : [],
      markerToggle          : [],
      profileToggle         : [],
      profileOutput         : [],
      profileColumns        : [],
      loading               : true,
      plotHeight            : window.innerHeight/2,
      radius                : 4,
      textSize              : 3,
      dispUnknown           : true,
      colorUnknown          : "rgba(100,100,100,0.1)",
      activeKey             : [],
      activePeptideID       : '',
      showUniProt           : false,
      showComparison        : false,
      plotPCA               : true,
      plot3D                : false,
      plotProfile           : true,
      colorSelect           : [''],
      radiusSelect          : [''],
      transpSelect          : [''],
      sortedBy              : '',
      sortedAscending       : true,
      showToolBar           : 'none',
      plotTool              : 'auto',
      showColumnPopup       : false,
      showPlotConfigPopup   : false,
      nameColumnPopup       : '',
      showProfileDataColumn : false,
      showProfileFilter     : false,
      showMoreEntries       : false,
      profileFiltering      : false,
      showMetaDataPopup     : false,
    };
  }

  //function that resets the state functions to its original state
  resetAll(){
    this.setState({
        radius              : 4,
        textSize            : 3,
        dispUnknown         : true,
        colorUnknown        : "rgba(100,100,100,0.1)",
        showUniProt         : false,
        plotPCA             : true,
        plotProfile         : true,
        plot3D              : false,
        profileFiltering    : false,
        colorSelect         : [''],
        radiusSelect        : [''],
        transpSelect        : [''],
        sortedBy            : '',
        filteredData        : this.state.data,
        showToolBar         : 'none',
        plotTool            : 'auto',
      })
  };

  //refresh ScatterPlot
  refreshPlot() {
    this.setState({radius: this.state.radius});
    console.log("refresh check");
  };

  //function defines which peptide is highlighted
  setActiveKey(index, activePeptide) {
    this.setState({activeKey: index});
    this.setState({activePeptideID: activePeptide});
  };

  togglePlotHeight(){
    this.state.plotHeight == window.innerHeight/2 ? this.setState({plotHeight: this.state.height - 125}) :
                                   this.setState({plotHeight: window.innerHeight/2});
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
    !reset ? this.setState({showToolBar: 'left', plotTool: ''}):
             this.setState({showToolBar: 'none',  plotTool: 'auto'});
  };

  toggleProfileColumn(reset = false){
    !reset ? this.setState({showProfileDataColumn: !this.state.showProfileDataColumn}):
             this.setState({showProfileDataColumn: false});
  };

  convertArrayOfObjectsToCSV(args) {
        var result, ctr, keys, columnDelimiter, lineDelimiter, data;

        data = args.data || null;
        if (data == null || !data.length) {
            return null;
        }

        columnDelimiter = args.columnDelimiter || ',';
        lineDelimiter = args.lineDelimiter || '\n';

        keys = Object.keys(data[0]);

        result = '';
        result += keys.join(columnDelimiter);
        result += lineDelimiter;

        data.forEach(function(item) {
            ctr = 0;
            keys.forEach(function(key) {
                if (ctr > 0) result += columnDelimiter;

                result += item[key];
                ctr++;
            });
            result += lineDelimiter;
        });

        return result;
    }

  downloadCSV() {
        var data, filename, link;

        var csv = this.convertArrayOfObjectsToCSV({
            data: this.state.filteredData
        });
        if (csv == null) return;

        filename = this.state.metaData.varName + '.csv';

        if (!csv.match(/^data:text\/csv/i)) {
            csv = 'data:text/csv;charset=utf-8,' + csv;
        }
        data = encodeURI(csv);

        link = document.createElement('a');
        link.setAttribute('href', data);
        link.setAttribute('download', filename);
        link.click();
    }

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

  //organelle legend buttons
  legendColor(marker, sidebar){
    let legendColor   = this.state.data.find((dataRow) => dataRow.markers == marker.obj) && this.state.data.find((dataRow) => dataRow.markers == marker.obj).Colors;
    let coloredBorder = {borderStyle       : "solid",
                         borderWidth       : "3px",
                         borderBottomColor : "#f4f4f4",
                         borderRightColor  : "#f4f4f4",
                         borderLeftColor   : sidebar == true ? legendColor: "#f4f4f4",
                         borderTopColor    : sidebar == true ? "#f4f4f4"  : legendColor,
                         outline           : "none"};
    let whiteBorder   = {borderStyle       : "solid",
                         borderWidth       : "3px",
                         outline           : "none",
                         borderColor       : "#f4f4f4"};

    return this.state.markerToggle.includes(marker.obj) ? whiteBorder : coloredBorder;
  }

  //filter function
  //written as oneliner due to otherwise occuring synthax error
  dataFilter(input){
      input != "" ? this.setState({filteredData: this.state.data.filter((dataRow) => {return dataRow.GOannotation == input || dataRow.id == input || dataRow.markers == input || dataRow['Protein-Description'] == input})})
                  : this.setState({filteredData: this.state.data});
  }

  //toggle active/inactive button style
  activeButton(boleanVar){
    let active   = {backgroundColor: "#f4f4f4"};
    let inactive = {backgroundColor: "#f2e4d8"};
    return boleanVar == true? active : inactive;
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

  toggleColumn(column){
    this.state.profileToggle.includes(column.obj) ?
             this.setState({profileToggle: this.deleteToggleProfileColumnArray(column.obj)}):
             this.setState({profileToggle: this.addToggleProfileColumnArray(column.obj)});
    this.setState({filteredProfile: this.state.profileColumns.filter((dataRow) => {return !this.state.profileToggle.includes(dataRow.markers)})});
    console.log(this.state.filteredProfile);
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

  //update filteredData based on profilePlot selection
  updateFilteredData(input)  {
    input == this.state.filteredData ? null : this.setState({filteredData : input});
    console.log(input == this.state.filteredData);
  }

  //svg zoom initialization
  componentDidMount() {
    this.Viewer.fitToViewer();
  }

  //loading the fSet data from firebase
  //the loading state is set to false once data is fetched
  componentDidMount(){
    var data     = [];

    firebase.database().ref('data/' + this.props.params.uid + '/fSet').once("value", (snapshot) => {
      let data = snapshot.val();
      this.setState({
        data           : data,
        loading        : false,
        filteredData   : data.filter((dataRow) => {return !this.state.markerToggle.includes(dataRow.markers)}),
      });
    })

  //loading the meta data from firebase
  firebase.database().ref('meta/' + this.props.params.uid).once("value", (snapshot) => {
      let meta = snapshot.val();
      this.setState({
        metaData       : meta,
        profileColumns : meta.profileColumns,
        markerClasses  : meta.markerClasses,
      });
    })
  };

  render() {

    //styles defines the height and width of the plots
    const styles = {
      width   : this.state.width/((this.state.plotPCA + this.state.plotProfile + this.state.showUniProt)),
      height  : this.state.plotHeight,
      padding : 25,
    };

    //the dynamic plot CSS - adjusts based on number active tabs
    const plotCSS = {
        maxWidth: this.state.plotProfile + this.state.plotPCA + this.state.showUniProt == 1 ? '100%' : '50%',
        overflow: 'hidden',
        float: 'left',
    };

    //metaData entries
    const MetaVarName     =                                    <div> Name        : {this.state.metaData.varName}     </div>;
    const MetaLab         = this.state.metaData.lab         && <div> Lab         : {this.state.metaData.lab}         </div>;
    const MetaSpecies     = this.state.metaData.species     && <div> Species     : {this.state.metaData.species}     </div>;
    const MetaDescription = this.state.metaData.description && <div> Description : {this.state.metaData.description} </div>;
    const MetaTissue      = this.state.metaData.tissue      && <div> Tissue      : {this.state.metaData.tissue}      </div>;
    const MetaEmail       = this.state.metaData.email       && <div> Email       : {this.state.metaData.email}       </div>;
    const MetaContact     = this.state.metaData.contact     && <div> Contact     : {this.state.metaData.contact}     </div>;
    const MetaDataStamp   = this.state.metaData.dataStamp   && <div> Date        : {this.state.metaData.dataStamp}   </div>;
    const MetaAuthor      = this.state.metaData.author      && <div> Author      : {this.state.metaData.author}      </div>;

    const pubmedID        = this.state.metaData.pubMedIds ? <div> PubMed: {this.state.metaData.pubMedIds} </div> :
                                                            <div> PubMed:  </div>;

    const d3Plot =  <div style={plotCSS}>
                      <ReactSVGPanZoom
                        width             = {styles.width}
                        height            = {styles.height}
                        ref               = {Viewer => this.Viewer = Viewer}
                        SVGBackground     = "white"
                        background        = "white"
                        detectWheel       = {true}
                        miniaturePosition = {"none"}
                        toolbarPosition   = {this.state.showToolBar}
                        tool              = {this.state.plotTool}
                        detectAutoPan     = {false}>
                        <svg width        = {styles.width} height = {styles.height}>
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
    this.state.profileColumns && this.state.profileColumns.map(function(obj, index) {
        index == 0 ?
        keyVar[obj] = {type:"number", "tickValues": [0, 0.2, 0.4, 0.6, 0.8]} :
        keyVar[obj] = {type:"number", "tickValues": 0};
      }
    );
    const dimensions = keyVar;

    //the uniprot routine - a simple iframe that combines a url with the peptideID
    //x-frame same origin error due to uniprot changes
    const iframeLink = "http://www.uniprot.org/uniprot/" + this.state.activePeptideID;
    const uniProtContainer = this.state.showUniProt &&
                             <iframe
                                       style       = {plotCSS}
                                       height      = {styles.height}
                                       width       = {styles.width}
                                       frameBorder = "0"
                                       src         = {iframeLink}
                             />;

    // the profile plot
    const profileContainer = this.state.plotProfile &&
                             <div style = {plotCSS}>
                                      <ParallelCoordinatesComponent
                                          data             = {this.state.profileFiltering ? this.state.filteredData : this.state.data}
                                          dimensions       = {dimensions}
                                          width            = {styles.width}
                                          height           = {styles.height}
                                          highlights       = {1}
                                          colourHightlight = {this.state.activePeptideID}
                                          colour           = {function(d, dataHighlighted) {
                                                                if(d.id == dataHighlighted){
                                                                  return("#ff0000")
                                                                } else if(d.markers != "unknown") {
                                                      						return(d.Colors)
                                                      					} else {
                                                      						return("rgba(0, 0, 0, 0.1)")
                                                      					}
                                            			           }}
                                          onBrushEnd_data = {(out) => this.updateFilteredData(out)}
                                       />
                              </div>;

    //loader or plot logic
    const d3Container = this.state.loading ? loader : this.state.plotPCA && d3Plot;
    const plot3D = null;

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
                  "key"                : keyAggregate[i]+i,
                  "name"               : keyAggregate[i],
                  "fieldName"          : keyAggregate[i],
                  "isResizable"        : true,
                  "isRowHeader"        : true,
                  "minWidth"           : (this.state.width - 150)/(keyAggregate.length-this.state.profileColumns.length)+10,
                  "isSorted"           : this.state.sortedBy == keyAggregate[i] ? true : false,
                  "isSortedDescending" : this.state.sortedAscending,
                  "onColumnClick" : (i,j) => this.setState({showColumnPopup: true, nameColumnPopup: j.fieldName}),
      }) : null ;
    }

    //extracts the markerClasses from the meta data and displays them as buttons
    let markerClasses = !this.state.loading && this.state.markerClasses.toString().split(', ');
    const legendItems = markerClasses && markerClasses.map(obj =>
      <button className="legendItems" style={this.legendColor({obj}, false)} onClick={() => this.toggleMarkers({obj})} key={obj.toString()}>{obj}</button>
    );
    const legendItemsSidebar = markerClasses && markerClasses.map(obj =>
      <button className="legendItemsSidebar" style={this.legendColor({obj}, true)} onClick={() => this.toggleMarkers({obj})} key={obj.toString()}>{obj}</button>
    );

    let profileColumnsVar = this.state.profileColumns;
    const profileFilterButtons = profileColumnsVar && profileColumnsVar.map(obj =>
      <Checkbox
        key            = {'key' + obj}
        label          = {obj}
        defaultChecked = {true}
        onChange       = {this._onCheckboxChange}
      />
    );

    //the data table inclusive the bar above the table
    const table = <div className="tableCore">
                    <div className="belowMainPlot row">
                    <div className="col-sm-2 filterBox">
                      <SearchBox
                        style     = {{backgroundColor: '#f2e4d8'}}
                        labelText = 'Filter'
                        onChange  = {(newValue) => this.dataFilter(newValue)}
                      />
                    </div>
                      <div className="col-sm-10 noPadding divFadeIn">
                        <button className="optionToggle" onClick={() => this.togglePlotHeight()}> <i className="fa fa-arrows-v">    </i></button>
                        <button className="optionToggle" onClick={() => this.switchPlotTools()}>  <i className="fa fa-object-group"></i></button>
                        <button className="optionToggle" onClick={() => this.resetAll()}>         <i className="fa fa-undo">        </i></button>
                        <button className="optionToggle" onClick={() => this.downloadCSV()}>      <i className="fa fa-download">    </i></button>


                        {legendItems.length >= 5 &&
                         <button className="legendItems sidebarRight"
                                onClick={() => this.setState({showMoreEntries : !this.state.showMoreEntries})}>
                                More Entries
                          </button>
                        }
                        {legendItems}

                      </div>
                    </div>
                    <MarqueeSelection>
                      <DetailsList
                        items                           = {this.state.filteredData}
                        initialFocusedIndex             = {1}
                        columns                         = {columnVar}
                        setKey                          = {this.state.activeKey}
                        canResizeColumns                = {true}
                        constrainMode                   = {ConstrainMode.unconstrained}
                        layoutMode                      = {DetailsListLayoutMode.fixedColumns}
                        isLazyLoaded                    = {true}
                        columnActionsMode               = {ColumnActionsMode.clickable}
                        checkboxVisibility              = {CheckboxVisibility.hidden}
                        selectionPreservedOnEmptyClick  = {true}
                        onActiveItemChanged             = {(item, index) => this.setState({activeKey : index})}
                        />
                    </MarqueeSelection>
                  </div>;

    return (
    <div>
        <Helmet
          title = "SpatialMaps - DataView"
          meta  = {[ {name : 'description', content : 'The SpatialMaps data viewer'}, ]}
        />

        {/*Top left buttons & sliders */}
        <div className="configBar divFadeIn" style={{paddingLeft: 10}}>
          <div className="leftButtons first buttonFadeIn"
               style={this.activeButton(this.state.showProfileFilter)}
               onClick={() => this.setState({showProfileFilter : !this.state.showProfileFilter}) }>
               Profile Columns
          </div>
          <div className="leftButtons buttonFadeIn"
               style={this.activeButton(this.state.showPlotConfigPopup)}
               onClick={() => this.setState({showPlotConfigPopup : !this.state.showPlotConfigPopup})}>
               Options
          </div>
          <div className="leftButtons buttonFadeIn"
               style={this.activeButton(this.state.showMetaDataPopup)}
               onClick={() => this.setState({showMetaDataPopup : !this.state.showMetaDataPopup})}>
               Dataset
          </div>

          {/*Top right buttons */}
          {/* Comparison Prototype - inactive
          <div className="rightButtons"
               style={this.activeButton(this.state.showComparison)}
               onClick={() => this.setState({showComparison : !this.state.showComparison, plotProfile: false})}>
               Comparison
          </div>
          */}
          <div className="rightButtons buttonFadeIn"
               style={this.activeButton(this.state.showUniProt)}
               onClick={() => this.setState({showUniProt : !this.state.showUniProt, plotProfile: false})}>
               UniProt
          </div>
          <div className="rightButtons buttonFadeIn"
               style={this.activeButton(this.state.plotProfile)}
               onClick={() => this.setState({plotProfile : !this.state.plotProfile, showUniProt : false})}>
               Profile
          </div>
          <div className="rightButtons buttonFadeIn"
               style={this.activeButton(this.state.plot3D)}
               onClick={() => this.setState({plot3D : !this.state.plot3D})}>
               3D View
          </div>
          <div className="rightButtons buttonFadeIn"
               style={this.activeButton(this.state.plotPCA)}
               onClick={() => this.setState({plotPCA : !this.state.plotPCA})}>
               PCA
          </div>
        </div>

      {/* The modal showing on colum header click */}
      <Dialog
        className              = "modalFadeIn"
        isOpen                 = {this.state.showColumnPopup}
        type                   = {DialogType.normal}
        onDismiss              = {() => this.setState({showColumnPopup : !this.state.showColumnPopup})}
        title                  = 'Column Options'
        isBlocking             = {false}
        containerClassName     = 'ms-dialogMainOverride'>

        <p style={{textAlign: 'center'}}> Use the column to display additional data in the plot with the help of modifiers </p>
        <div className="modChoice" onClick={() => this.setActiveColor()}>  Color        </div>
        <div className="modChoice" onClick={() => this.setActiveRadius()}> Radius       </div>
        <div className="modChoice" onClick={() => this.setActiveTransp()}> Transparency </div>
        <div className="modChoice" onClick={() => this.setOrderBy(this.state.sortedAscending)}> Sort Table by Column </div>
      </Dialog>

      {/* The "option" panel */}
      <Panel
          isBlocking           = {false}
          isOpen               = {this.state.showPlotConfigPopup}
          isLightDismiss       = {true}
          onDismiss            = {() => this.setState({showPlotConfigPopup: false})}
          type                 = {PanelType.smallFixedFar}
          headerText           = 'Profile Options'
          closeButtonAriaLabel = 'Close'
        >
          <Slider
            label              = 'Scatter Point Size'
            min                = {0.5}
            max                = {10}
            step               = {0.5}
            defaultValue       = {4}
            onChange           = {radius => this.setState({radius})}
            showValue          = {false}
          />
          <Slider
            label              = 'Text Size'
            min                = {0.5}
            max                = {10}
            step               = {0.5}
            defaultValue       = {4}
            onChange           = {textSize => this.setState({textSize}) }
            showValue          = {false}
          />
          <Toggle
           label               = 'Show Profile Columns'
           checked             = {this.state.showProfileDataColumn}
           onAriaLabel         = 'This toggle is checked. Press to uncheck.'
           offAriaLabel        = 'This toggle is unchecked. Press to check.'
           onText              = 'On'
           offText             = 'Off'
           onChange            = {() => this.toggleProfileColumn()}
          />
          <Toggle
           label               = 'ProfilePlot filtering'
           checked             = {this.state.profileFiltering}
           onAriaLabel         = 'This toggle is checked. Press to uncheck.'
           offAriaLabel        = 'This toggle is unchecked. Press to check.'
           onText              = 'On'
           offText             = 'Off'
           onChange            = {() => this.setState({profileFiltering : !this.state.profileFiltering})}
          />
          <Toggle
           label               = 'Hide Unknown'
           checked             = {this.state.dispUnknown}
           onAriaLabel         = 'This toggle is checked. Press to uncheck.'
           offAriaLabel        = 'This toggle is unchecked. Press to check.'
           onText              = 'On'
           offText             = 'Off'
           onChange            = {() => this.setState({dispUnknown : !this.state.dispUnknown})}
          />

      </Panel>

      {/* The "Dataset" panel */}
      <Panel
          isBlocking           = {false}
          isOpen               = {this.state.showMetaDataPopup}
          isLightDismiss       = {true}
          onDismiss            = {() => this.setState({showMetaDataPopup: false})}
          type                 = {PanelType.smallFixedFar}
          headerText           = 'Dataset'
          closeButtonAriaLabel = 'Close'
      >
        <p> <b> Meta Data </b> </p>
        <table>
          <tbody>
          <tr> {MetaVarName}     </tr>
          <tr> {pubmedID}        </tr>
          <tr> {MetaDataStamp}   </tr>
          <tr> {MetaSpecies}     </tr>
          <tr> {MetaDescription} </tr>
          <tr> {MetaTissue}      </tr>
          </tbody>
        </table>

        <p> <b> Download </b> </p>
        <div className="codeBox">
          <code className="RCode">
            # with the pRoloc R package <br/>
            library(pRolocdata)         <br/>
            object = download("{this.props.params.uid}")
          </code>
        </div>
        <br/>

        <p> <b> Contact </b> </p>
        <table>
          <tbody>
          <tr> {MetaLab}         </tr>
          <tr> {MetaContact}     </tr>
          <tr> {MetaEmail}       </tr>
          <tr> {MetaAuthor}      </tr>
          </tbody>
        </table>
      </Panel>

      {/* The "Profile Column" panel */}
      <Panel
          isBlocking           = {false}
          isOpen               = {this.state.showProfileFilter}
          isLightDismiss       = {true}
          onDismiss            = {() => this.setState({showProfileFilter: false})}
          type                 = {PanelType.smallFixedFar}
          headerText           = 'Profile Plot Columns'
          closeButtonAriaLabel = 'Close'
      >

      {profileFilterButtons}
      </Panel>

      {/* The "show More entries" panel */}
      <Panel
          isBlocking           = {false}
          isOpen               = {this.state.showMoreEntries}
          isLightDismiss       = {true}
          onDismiss            = {() => this.setState({showMoreEntries: false})}
          type                 = {PanelType.custom}
          customWidth          = '220px'
          headerText           = 'Legend'
          closeButtonAriaLabel = 'Close'
      >
      <div style={{maxWidth: 120, overflow: "visible"}}>
      {legendItemsSidebar}
      </div>
      </Panel>

      {/* main plot */}
      <div className="mainPlot divFadeIn" style={{height: this.state.plotHeight}}>
        {d3Container}
        {plot3D}
        {profileContainer}
        {uniProtContainer}
      </div>

      {/* main table */}
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
