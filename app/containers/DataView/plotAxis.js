import React from 'react';

const renderCircles = (props) => {
  return (coords, index) => {

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

    var output = <g className="circleText" key={index+0.2}>
                    <path {...circleProps} onClick={() => props.SetActiveKey(index, coords.id)}/>
                 </g>;

    return output;
  };
};

export default (props) => {
  return <g>{ props.data.map(renderCircles(props)) }</g>
}
