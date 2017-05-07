import React from 'react';

const renderCircles = (props) => {
  return (coords, index) => {
    var indexRad = index == 15 ? 10 : 2;
    var color = coords.Markers == "unknown" ? "rgba(100,100,100,0.1)" : coords.Colors ;
    const circleProps = {
      cx: props.xScale(coords.PCA1),
      cy: props.yScale(coords.PCA2),
      r: 3,
      fill: color,
      key: index
    };
    return <circle {...circleProps} />;
  };
};

export default (props) => {
  return <g>{ props.data.map(renderCircles(props)) }</g>
}
