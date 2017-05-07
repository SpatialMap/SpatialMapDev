import React from 'react';

const renderCircles = (props) => {
  return (coords, index) => {
    const circleProps = {
      cx: props.xScale(coords.PCA1),
      cy: props.yScale(coords.PCA2),
      r: 2,
      fill: coords.Colors,
      key: index
    };
    return <circle {...circleProps} />;
  };
};

export default (props) => {
  return <g>{ props.data.map(renderCircles(props)) }</g>
}
