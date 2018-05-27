import React from 'react';
import d3 from 'd3';

export default class Label extends React.Component {

  render() {
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
              <text style={{fontSize: 12}}{...xLabelProps}> PCA2 </text>
              <text style={{fontSize: 12}}{...yLabelProps}> PCA1 </text>
            </g>
  }
}
