
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
import {
  DetailsList,
  DetailsListLayoutMode,
  Selection
} from 'office-ui-fabric-react/lib/DetailsList';
import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection';

var Dimensions = require('react-dimensions');

const styles = {
  width   : 1800,
  height  : 500,
  padding : 30,
};



let _columns = [
  {
    key: 'column1',
    name: 'Colors',
    fieldName: 'Colors',
    minWidth: 100,
    isResizable: true
  },
  {
    key: 'column2',
    name: 'Markers',
    fieldName: 'Markers',
    minWidth: 100,
    isResizable: true
  },
  {
    key: 'column3',
    name: 'PCA1',
    fieldName: 'PCA1',
    minWidth: 100,
    isResizable: true
  },
  {
    key: 'column4',
    name: 'PCA2',
    fieldName: 'PCA2',
    minWidth: 100,
    isResizable: true
  },
];

export class DataView extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  constructor(props, context) {
    super(props, context);
    this.Viewer = null;
    this.state = {
      test1: "123",
      data: [],
      data2: [],
      loading: true,
      radius: 4,
      dispUnknown: true,
      labels: false,
    };
  }

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
            data
          })
    })
  };

    // @keydown( 'enter' ) // or specify `which` code directly, in this case 13
    //   submit( event ) {
    //     // do something, or not, with the keydown event, maybe event.preventDefault()
    //     this.Viewer.setTool("pan");
    //     //this.setState({tool: fitSelection(})
    //   }
    // }


  render() {
    let _items2 = [
      {
             key: 1,
             name: 'Item ' + 1,
             value: 1,
             values: 3
      },
      {
             key: 2,
             name: 'Item ' + 2,
             value: 2,
             values: 3
      },
      {
             key: 3,
             name: 'Item ' + 3,
             value: 3,
             values: 3
      },
    ];

    const data = this.state.data

    const table = <div> <TextField
          label='Filter by name:'
        />
        <MarqueeSelection selection={ this._selection }>
          <DetailsList
            items={ data }
            columns={ _columns }
            setKey='set'
            layoutMode={ DetailsListLayoutMode.fixedColumns }
            selection={ this._selection }
            selectionPreservedOnEmptyClick={ true }
            onItemInvoked={ (item) => alert(`Item invoked: ${item.name}`) }
          />
        </MarqueeSelection>
        </div>;

    const Query =  <h2> {this.props.params.uid}</h2>;

    const d3Plot =  <div className="scatterContainer" >
                      <ReactSVGPanZoom
                        style={{}}
                        width={1800} height={500} ref={Viewer => this.Viewer = Viewer}
                        onClick={event => console.log('click', event.x, event.y, event.originalEvent)}
                        onMouseMove={event => console.log('move', event.x, event.y)}
                        SVGBackground="white"
                        background="white"
                        detectWheel={true}
                        // detectAutoPan={false}
                        miniatureWidth={50}
                        toolbarPosition={"none"}
                        tool={"auto"}
                        detectAutoPan={false}
                        >
                        <svg width={1800} height={500}>
                          <ScatterPlot {...this.state} {...styles}  />
                        </svg>
                    </ReactSVGPanZoom>
                  </div>

    const d3Loader =  <div>
                        <Spinner size={SpinnerSize.large} />
                      </div>;

    const d3Container = this.loading == true ? d3Loader : d3Plot;



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
          <div className="buttons first">
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
              onChange={ labels => this.setState({ labels }) }
        />
        </div>
        <div className="toggle">
            <Toggle
             label='Hide Unknown'
             onAriaLabel='This toggle is checked. Press to uncheck.'
             offAriaLabel='This toggle is unchecked. Press to check.'
             onText='On'
             offText='Off'
             onChange={ dispUnknown => this.setState({ dispUnknown }) }
            />
       </div>
       <div className="buttons last">
           <DefaultButton
               description='Opens the Sample Dialog'
               text='Comments'
           />
      </div>
      <div className="headerPlaceholder">
        <p> Placeholder </p>
      </div>
      <div className="choiceGroup">
        <div className="choiceChild">
          <p> Profile </p>
        </div>
      </div>
      <div className="choiceGroup">
        <div className="choiceChild">
          <p> T-SNE </p>
        </div>
      </div>
      <div className="choiceGroup">
        <div className="choiceChild">
          <p> PCA </p>
        </div>
      </div>
      <div className="headerPlaceholder">
        <p> Placeholder </p>
      </div>
      </div>
      <div className="mainPlot">
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
