import React from 'react';

const renderCircles = (props) => {
  return (coords, index) => {
    var indexRad = index == 15 ? 10 : 2;
    // conditional statements inside variables to select certain elements
    var colorVarVisible = coords.Markers == "unknown" ? "rgba(100,100,100,0.1)" : coords.Colors ;
    var colorVarHidden = coords.Markers == "unknown" ? "none" : coords.Colors ;
    var colorVar = props.dispUnknown == true ? colorVarVisible : colorVarHidden;
    var textVar = coords.Markers == "unknown" ? "" : coords.Markers ;
    var strokeVar = coords.Markers == "unknown" ? "rgba(100,100,100,0)" : "none" ;
    //x,y coordinates
    var xPOS = props.xScale(coords.PCA1);
    var yPOS = props.yScale(coords.PCA2);
    const circleProps = {
      cx: xPOS,
      cy: yPOS,
      r: props.radius,
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

    var boolTest = props.labels;

    var output = boolTest == false ? <g className="circleText" key={index+0.2}>
                                              <circle {...circleProps} />
                                          </g> : <g className="circleText" key={index+0.2}>
                                          <circle {...circleProps} />
                                          <text {...textProps}> {textVar} </text>
                                          </g>;

    return output;
  };
};

export default (props) => {
  return <g >{ props.data.map(renderCircles(props)) }</g>
}
