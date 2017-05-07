
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
  width   : 1800,
  height  : 500,
  padding : 30,
};

export class DataView extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      test1: "123",
      data: [],
      data2: [],
    }
  }
  //loading scatterplot data from firebase
  componentDidMount(){
    var data = [];
    firebase.database().ref('data/' + this.props.params.uid + '/fSet').once("value", (snapshot) => {
          let data = snapshot.val();
          this.setState({
            data
          })
    });
  }

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
        <div className="" >
        <ScatterPlot {...this.state} {...styles} />
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
