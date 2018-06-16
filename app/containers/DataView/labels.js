import React from 'react';
import d3 from 'd3';

export default class Label extends React.Component {

  render(props) {
    const yLabelProps = {
      x           : -40,
      y           : 40,
      textAnchor  : "middle",
      key         : "yLabel",
      transform   : "rotate(-90)"
    };

    const xLabelProps = {
      x           : "93%",
      y           : "93%",
      textAnchor  : "middle",
      key         : "xLabel"
    };

    return <g className="label" ref="label">
              <text style={{fontSize: 12}}{...xLabelProps}> {this.props.axisOne} </text>
              <text style={{fontSize: 12}}{...yLabelProps}> {this.props.axisTwo} </text>
            </g>
  }
}
