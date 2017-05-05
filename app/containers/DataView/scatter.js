import React        from 'react';
import d3           from 'd3';
import DataCircles  from './dataPoints.js';

const xMax   = (data)  => d3.max(data, (d) => d.PCA1);
const xMin   = (data)  => d3.min(data, (d) => d.PCA1);

const yMax   = (data)  => d3.max(data, (d) => d.PCA2);
const yMin   = (data)  => d3.min(data, (d) => d.PCA2);

const xScale = (props) => {
  return d3.scale.linear()
    .domain([xMin(props.data), xMax(props.data)])
    .range([props.padding, props.width - props.padding * 2]);
};

const yScale = (props) => {
  return d3.scale.linear()
    .domain([yMin(props.data), yMax(props.data)])
    .range([props.height - props.padding, props.padding]);
};

export default (props) => {
  const scales = { xScale: xScale(props), yScale: yScale(props) };
  return <svg width={props.width} height={props.height}>
    <DataCircles {...props} {...scales} />
  </svg>
};
