import React from 'react';

const renderCircles = (props) => {
  return (coords, index) => {
    // conditional statements inside variables to select certain elements
    // conditional for selected key
    const markSelected = index == props.activeKey ? "black" : "none";
    //show/hide points with "unknown" markers
    const toggleUnknown = props.dispUnknown == true ? "rgba(100,100,100,0.1)" : "none";
    const colorVar = coords.markers == "unknown" ? toggleUnknown : coords.Colors ;
    //attach markername if not "unknown"
    const textVar = coords.markers == "unknown" ? "" : coords.markers ;
    //not used at the moment - activate to add a stroke circle around each unknown point
    const strokeVar = coords.markers == "unknown" ? "rgba(100,100,100,0)" : "none" ;
    //x,y coordinates
    const xPOS = props.xScale(coords.PCA1);
    const yPOS = props.yScale(coords.PCA2);
    const circleProps = {
      cx: xPOS,
      cy: yPOS,
      r: props.radius,
      fill: colorVar,
      stroke: markSelected,
      strokeWidth: props.radius/3,
      key: index
      //hoover defined in css
    };

    const textProps = {
      x: xPOS,
      y: yPOS,
      //index + number to generate a unique key
      key: index+0.1
      //textsize defined in css
    };

    var output = props.labels == false ? <circle {...circleProps} />
                                           : <g className="circleText" key={index+0.2}>
                                          <circle {...circleProps} />
                                          <text {...textProps}> {textVar} </text>
                                          </g>;

    return output;
  };
};

export default (props) => {
  return <g>{ props.data.map(renderCircles(props)) }</g>
}
