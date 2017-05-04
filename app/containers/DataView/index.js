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

const styles = {
  width   : 500,
  height  : 300,
  padding : 30,
};

// The number of data points for the chart.
const numDataPoints = 50;

// A function that returns a random number from 0 to 1000
const randomNum     = () => Math.floor(Math.random() * 1000);

// A function that creates an array of 50 elements of (x, y) coordinates.
const randomDataSet = () => {
  return Array.apply(null, {length: 50}).map(() => [randomNum(), randomNum()]);
}

export class DataView extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      dataset: [],
      test1: "123",
      data: randomDataSet(),
    }
  }

  randomizeData() {
    this.setState({ data: randomDataSet() });
  }

  componentDidMount(){
    var dataset = [];
    firebase.database().ref('data/' + this.props.params.uid + '/fSet').once("value", (snapshot) => {
          let dataset = snapshot.val();
          this.setState({
            dataset
          })
    });

  }
  render() {
    const Query =  <h2> {this.props.params.uid}</h2>;
    const data2 = this.state.dataset;
    return (
      <div>
        <Helmet
          title="DataView"
          meta={[
            { name: 'description', content: 'Description of DataView' },
          ]}
        />
        <h1> d3.js plots </h1>
        <ScatterPlot {...this.state} {...styles} />
         <div className="controls">
          <button className="btn randomize" onClick={() => this.randomizeData()}>
            Randomize Data
          </button>
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
