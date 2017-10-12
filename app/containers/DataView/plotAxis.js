import React from 'react';

const renderCircles = (props) => {
  return (coords, index) => {

    const pathProps = {
      cx: xPOS,
      cy: yPOS,
      r: radiusVar,
      fill: colorUnknown,
      opacity: transpVar,
      stroke: markSelected,
      strokeWidth: props.radius/3,
      key: index,
    };

    var output = <g className="circleText" key={index+0.2}>
                    <path {...pathProps} onClick={() => props.SetActiveKey(index, coords.id)}/>
                 </g>;

    return output;
  };
};

export default (props) => {
  return <g>{ props.data.map(renderCircles(props)) }</g>
}
