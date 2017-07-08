import React from 'react';

const renderCircles = (props) => {
  return (coords, index) => {
    // conditional statements inside variables to select certain elements
    // conditional for selected key
    const markSelected = index == props.activeKey ? "rgba(0,0,0,0.3)" : "none";
    //show/hide points with "unknown" markers
    const colorSpace = props.colorSelect == '' ? coords.Colors : props.colScale(coords[props.colorSelect]);
    const toggleUnknown = props.dispUnknown == true ? "rgba(100,100,100,0.1)" : "none";
    const colorUnknown = coords.markers == "unknown" && props.labels != true ? toggleUnknown : colorSpace;
    //radius
    const radiusVar = props.radiusSelect == '' ? props.radius : props.radius * props.radiusScale(coords[props.radiusSelect]);
    //transparency
    const transpVar = props.transpSelect == '' ? 0.9 : props.transparencyScale(coords[props.transpSelect]);
    //attach accession id
    const textVar = coords.id ;
    //not used at the moment - activate to add a stroke circle around each unknown point
    const strokeVar = coords.markers == "unknown" ? "rgba(100,100,100,0)" : "none" ;
    //x,y coordinates
    const xPOS = props.xScale(coords.PCA1);
    const yPOS = props.yScale(coords.PCA2);

    //filterInput - filtering based on the filterInput
    //const filterVar = coords['ProteinDescription'].toLowerCase().indexOf(props.filterInput.toLowerCase()) !== -1;


    //col rendering
    const circleProps = {
      cx: xPOS,
      cy: yPOS,
      r: radiusVar,
      fill: colorUnknown,
      opacity: transpVar,
      stroke: markSelected,
      strokeWidth: props.radius/3,
      key: index,
      //hoover defined in css
    };

    const textProps = {
      x: xPOS,
      y: yPOS - radiusVar*1.33,
      textAnchor: "middle",
      //index + number to generate a unique key
      key: index+0.1
    };

    var output = markSelected == "none" ? <circle {...circleProps} onClick={() => props.SetActiveKey(index, coords.id)}/>
                                           : <g className="circleText" key={index+0.2}>
                                          <circle {...circleProps} onClick={() => props.SetActiveKey(index, coords.id)}/>
                                          <text style={{fontSize: props.radius }}{...textProps}> {textVar} </text>
                                          </g>;

    return output;
  };
};

export default (props) => {
  return <g>{ props.data.map(renderCircles(props)) }</g>
}
