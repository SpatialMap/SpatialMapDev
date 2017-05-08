import React from 'react';

const renderCircles = (props) => {
  return (coords, index) => {
    var indexRad = index == 15 ? 10 : 2;
    // conditional statements inside variables to select certain elements
    var colorVar = coords.Markers == "unknown" ? "rgba(100,100,100,0.1)" : coords.Colors ;
    var textVar = coords.Markers == "unknown" ? "" : coords.Markers ;
    var strokeVar = coords.Markers == "unknown" ? "rgba(100,100,100,0)" : "none" ;
    //x,y coordinates
    var xPOS = props.xScale(coords.PCA1);
    var yPOS = props.yScale(coords.PCA2);
    const circleProps = {
      cx: xPOS,
      cy: yPOS,
      fill: colorVar,
      stroke: strokeVar,
      key: index
      //radius defined in css
      //hoover defined in css
    };

    const textProps = {
      x: xPOS,
      y: yPOS,
      //index + number to generate a unique key
      key: index+0.1
      //textsize defined in css
    };

    return <g className="circleText" key={index+0.2}> <circle {...circleProps} /> <text {...textProps}> {textVar} </text> </g>;
  };
};

export default (props) => {
  return <g >{ props.data.map(renderCircles(props)) }</g>
}
