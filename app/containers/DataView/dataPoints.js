import React from 'react';

const renderCircles = (props) => {
  return (coords, index) => {
    // conditional statements to select certain elements:
    const markSelected             = coords.id == props.activePeptideID ? "rgba(0,0,0,0.3)" : "none";
    const colorSpace               = props.colorSelect == '' ? coords.Colors : props.colScale(coords[props.colorSelect]);
    const legendOrganelleSelection = !props.markerToggle.includes(coords[props.markerColumn]) ? colorSpace : "none";
    // delete true (placeholder for old labels)
    const colorFill                = coords[props.markerColumn] == "unknown" && true != false ? props.colorUnknown : legendOrganelleSelection;
    const radiusVar                = props.radiusSelect == '' ? props.radius : props.radius * props.radiusScale(coords[props.radiusSelect]);
    const transpVar                = props.transpSelect == '' ? 0.9 : props.transparencyScale(coords[props.transpSelect]);
    const textVar                  = coords.id;
    const strokeVar                = coords[props.markerColumn] == "unknown" ? "rgba(100,100,100,0)" : "none" ;
    const xPOS                     = props.xScale(coords[props.axisOne]);
    const yPOS                     = props.yScale(coords[props.axisTwo]);

    const circleProps = {
      cx          : xPOS,
      cy          : yPOS,
      r           : radiusVar,
      fill        : colorFill,
      opacity     : transpVar,
      stroke      : markSelected,
      strokeWidth : props.radius/3,
      key         : index,
    };

    const textProps = {
      x           : xPOS,
      y           : yPOS - radiusVar*1.33,
      textAnchor  : "middle",
      key         : index+0.1
    };

    var output = markSelected == "none" ? <circle {...circleProps} onClick={() => props.SetActiveKey(coords.id)}/>
                                        : <g key={index+0.2}>
                                             <circle {...circleProps} onClick={() => props.SetActiveKey(coords.id)}/>
                                             <text style={{fontSize: props.radius*props.textSize}}{...textProps}> {textVar} </text>
                                          </g>;

    return output;
  };
};

export default (props) => {
  return <g>{props.filteredData.map(renderCircles(props))}</g>
}
