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
import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection';
import { Callout } from 'office-ui-fabric-react/lib/Callout';

var Dimensions = require('react-dimensions');

export class DataView extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  constructor(props, context) {
    super(props, context);
    this.Viewer = null;
    this.state = {
      data: [],
      loading: true,
      radius: 4,
      dispUnknown: true,
      labels: false,
      activeKey: [],
      activeField: "PCA",
      plotPCA: true,
      plotTSNE: true,
      plotProfile: false,
      colorSelect: ['PSMs'],
    };
  }

  setActiveKey(index) {
      return this.setState({activeKey: index});
  };

  //svg zoom initialization
  componentDidMount() {
    this.Viewer.fitToViewer();
  }

  //loading scatterplot data from firebase
  componentDidMount(){
    var data = [];
    firebase.database().ref('data/' + this.props.params.uid + '/fSet').once("value", (snapshot) => {
          let data = snapshot.val();
          this.setState({
            data,
            loading : false
          });
    })
  };



    //  @keydown( 'enter' ) // or specify `which` code directly, in this case 13
    //    submit( event ) {
    //      // do something, or not, with the keydown event, maybe event.preventDefault()
    //      this.Viewer.setTool("pan");
    //      //this.setState({tool: fitSelection(})
    //    }
    // / }

  render() {


    const styles = {
      width   : 1900/2.1,
      height  : 500,
      padding : 30,
    };

    const data = this.state.data;

    const d3Plot =  <div className="scatterContainer">
                      <ReactSVGPanZoom
                        width={styles.width} height={styles.height} ref={Viewer => this.Viewer = Viewer}
                        onClick={event => console.log('click', event.x, event.y, event.originalEvent)}
                        onMouseMove={event => console.log('move', event.x, event.y)}
                        SVGBackground="white"
                        background="white"
                        detectWheel={true}
                        miniaturePosition = {"none"}
                        toolbarPosition={"none"}
                        tool={"auto"}
                        detectAutoPan={false}
                        >
                        <svg width={styles.width} height={styles.height}>
                          <ScatterPlot {...this.state} {...styles} SetActiveKey={(index) => this.setActiveKey(index)} />
                        </svg>
                    </ReactSVGPanZoom>
                  </div>

    const loader =  <div className="loader">
                        <Spinner size={SpinnerSize.large} label='dataset' />
                      </div>;

    const d3Container = this.state.loading == true ? loader : d3Plot;

    const keyAggregate = this.state.loading == true ? [] : Object.keys(data[1]);
    var columnVar = [];
    for (var i = 1; i < keyAggregate.length; ++i) {
        keyAggregate[i] != "Colors" && keyAggregate[i] != "PCA1" && keyAggregate[i] != "PCA2"  ?
        columnVar.push({
                  "key": keyAggregate[i]+i ,
                  "name" : keyAggregate[i] ,
                  "fieldName" : keyAggregate[i],
                  "isResizable" : true,
                  "minWidth" : 1600/keyAggregate.length,
                  "isGrouped" : true,

      }) : null ;
    }

    const table = <div className="tableCore">
                    <TextField placeholder='Search'/>
                    <MarqueeSelection>
                      <DetailsList
                        items={data}
                        columns={columnVar}
                        canResizeColumns = {true}
                        constrainMode = {ConstrainMode.unconstrained}
                        layoutMode={DetailsListLayoutMode.fixedColumns}
                        isLazyLoaded = {true}
                        columnActionsMode = {ColumnActionsMode.hasDropdown}
                        checkboxVisibility = {CheckboxVisibility.hidden}
                        selectionPreservedOnEmptyClick={true}
                        onItemInvoked={ (item, index) => this.setState({ activeKey : index }) }
                      />
                    </MarqueeSelection>
                  </div>;

    // const data = this.state.data;
    return (
      <div>
        <Helmet
          title="DataView"
          meta={[
            { name: 'description', content: 'Description of DataView' },
          ]}
        />

        <div className="configBar">
          <div className="buttons first"
          >
            <DefaultButton
                description='Opens the Sample Dialog'
                text='Citation'
            />
          </div>
          <div className="buttons">
            <DefaultButton
                description='Opens the Sample Dialog'
                text='Download'
            />
          </div>
          <div className="buttons">
            <DefaultButton
                description='Opens the Sample Dialog'
                text='Meta Data'
            />
         </div>
         <div className="slider">
            <Slider
              label='Scatter Point Size'
              min={ 0.5 }
              max={ 8 }
              step={ 0.5 }
              defaultValue={ 4 }
              onChange={ radius => this.setState({ radius }) }
              showValue={ false }
            />
         </div>
         <div className="toggle">
             <Toggle
              label='Display Labels'
              onAriaLabel='This toggle is checked. Press to uncheck.'
              offAriaLabel='This toggle is unchecked. Press to check.'
              onText='On'
              offText='Off'
              onChange={ () => this.setState({ labels : !this.state.labels }) }
        />
        </div>
        <div className="toggle">
            <Toggle
             label='Hide Unknown'
             onAriaLabel='This toggle is checked. Press to uncheck.'
             offAriaLabel='This toggle is unchecked. Press to check.'
             onText='On'
             offText='Off'
             onChange={ () => this.setState({ dispUnknown : !this.state.dispUnknown }) }
            />
       </div>
       <div className="buttons last">
           <DefaultButton
               description='Opens the Sample Dialog'
               text='Comments'
           />
      </div>
      <div className="choiceGroup">
        <div className="choiceChild"  onClick={() => this.setActiveKey()}>
         Profile
        </div>
      </div>
      <div className="choiceGroup" >
        <div className="choiceChild" onClick={ () => this.setState({ plotTSNE : !this.state.plotTSNE }) }>
         T-SNE
        </div>
      </div>
      <div className="choiceGroup">
        <div className="choiceChild" onClick={ () => this.setState({ plotPCA : !this.state.plotPCA }) }>
         PCA
        </div>
      </div>

      </div>
      <div className="mainPlot">
          {d3Container}
          {d3Container}
      </div>
      <div className="table">
          {table}
      </div>
      </div>
      )
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
