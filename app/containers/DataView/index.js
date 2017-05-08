
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
// import * as V from 'victory';
// import { VictoryScatter } from 'victory';
// import { VictoryChart } from 'victory';
// import { VictoryZoomContainer } from 'victory';
import * as firebase from 'firebase';
import './dataView.css';
import ScatterPlot from './scatter.js';
import {ReactSVGPanZoom} from 'react-svg-pan-zoom';
import keydown, { Keys } from 'react-keydown';
var Dimensions = require('react-dimensions');

const styles = {
  width   : 1800,
  height  : 500,
  padding : 30,
};

export class DataView extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  constructor(props, context) {
    super(props, context);
    this.Viewer = null;
    this.state = {
      test1: "123",
      data: [],
      data2: [],
    }
  }

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

    const Query =  <h2> {this.props.params.uid}</h2>;
    const data = this.state.data
    // const data = this.state.data;
    return (
      <div>
        <Helmet
          title="DataView"
          meta={[
            { name: 'description', content: 'Description of DataView' },
          ]}
        />
        <div className="info">
        <p> header info placeholder </p>
        </div>
        <div className="scatterContainer" >
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
          >
          <svg width={1000} height={500}>
            <ScatterPlot {...this.state} {...styles}  />
          </svg>
        </ReactSVGPanZoom>

        <div className="table">
        <p> table placeholder </p>
        </div>
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
