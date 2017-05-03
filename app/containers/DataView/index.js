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
import * as V from 'victory';
import { VictoryScatter } from 'victory';
import { VictoryChart } from 'victory';
import { VictoryZoomContainer } from 'victory';
import * as firebase from 'firebase';
import './dataView.css';

export class DataView extends React.Component {
  // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.state = {
      dataset: [],
      test1: "123",
    }
  }

  componentDidMount(){
    var dataset = [];
    firebase.database().ref('data/' + this.props.params.uid + '/pcaData').once("value", (snapshot) => {
          let dataset = snapshot.val();
          this.setState({
            dataset
          })
    });

  }
  render() {
    console.log(this.state.dataset);
    const Query =  <h2> {this.props.params.uid}</h2>;
    const data2 = this.state.dataset;
    console.log({data2});
    return (
      <div>
        <Helmet
          title="DataView"
          meta={[
            { name: 'description', content: 'Description of DataView' },
          ]}
        />
        <div className="mainPlot">
        <VictoryChart className="mainPlot" standalone={false} containerComponent={<VictoryZoomContainer  style={{width: 800, height: 800}} standalone={true}  />}
        >
        <VictoryScatter
        standalone={false}
        data={data2}
        x="PCA1"
        y="PCA2"
        events={[
  {
    target: "data",
    eventHandlers: {
      onClick: () => {
        return [
          {
            mutation: (props) => {
              return {
                style: Object.assign({}, props.style, {fill: "orange"})
              };
            }
          }, {
            target: "labels",
            mutation: () => {
              return {text: "works"};
            },
            callback: () => {
              console.log("I happen after setState");
            }
          }
        ];
      }
    }
  }
 ]}
      />
      </VictoryChart>

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
