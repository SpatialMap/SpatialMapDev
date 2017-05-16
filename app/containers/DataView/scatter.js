import React from 'react';
import d3 from 'd3';
import DataCircles from './dataPoints.js';

//min max values
const xMax   = (data)  => d3.max(data, (d) => d.PCA1);
const xMin   = (data)  => d3.min(data, (d) => d.PCA1);

const yMax   = (data)  => d3.max(data, (d) => d.PCA2);
const yMin   = (data)  => d3.min(data, (d) => d.PCA2);

//color gradient
const colMin = function(data,props) {
  return d3.min(data, (d) => d[props.colorSelect]);
};

const colMax = function(data,props) {
  return d3.max(data, (d) => d[props.colorSelect]);
};

//scaling dimensions
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

//scaling gradient
const colScale = (props) => {
  return d3.scale.linear()
         .domain([colMin(props.data, props),colMax(props.data, props)])
         .range(["blue","red"]);
};

export default (props) => {
  const scales = { xScale: xScale(props), yScale: yScale(props), colScale: colScale(props) };
  return <DataCircles {...props} {...scales} SetActiveKey={props.SetActiveKey} />
};
