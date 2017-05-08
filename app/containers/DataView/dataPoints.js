import React from 'react';

const renderCircles = (props) => {
  return (coords, index) => {
    var indexRad = index == 15 ? 10 : 2;
    var colorVar = coords.Markers == "unknown" ? "rgba(100,100,100,0.1)" : coords.Colors ;
    var strokeVar = coords.Markers == "unknown" ? "rgba(100,100,100,0)" : "none" ;
    const circleProps = {
      cx: props.xScale(coords.PCA1),
      cy: props.yScale(coords.PCA2),
      r: 3,
      fill: colorVar,
      stroke: strokeVar,
      key: index
    };
    return <circle {...circleProps} />;
  };
};

export default (props) => {
  return <g onMouseEnter={console.log("test")}>{ props.data.map(renderCircles(props)) }</g>
}
