import * as d3 from 'd3'
import { pointRadial } from 'd3';

// Copyright 2021 Observable, Inc.
// Released under the ISC license.
// https://observablehq.com/@d3/line-chart
export default function LineChart(data, {
    x = ([x]) => x, // given d in data, returns the (temporal) x-value
    y = ([, y]) => y, // given d in data, returns the (quantitative) y-value
    defined, // given d in data, returns true if defined (for gaps)
    curve = d3.curveCatmullRom, // method of interpolation between points
    marginTop = 15, // top margin, in pixels
    marginRight = 0, // right margin, in pixels
    marginBottom = 5, // bottom margin, in pixels
    marginLeft = 0, // left margin, in pixels
    width = 640, // outer width, in pixels
    height = 400, // outer height, in pixels
    xType = d3.scaleLinear, // type of x-scale
    xDomain, // [xmin, xmax]
    xRange = [marginLeft, width - marginRight], // [left, right]
    yType = d3.scaleLinear, // type of y-scale
    yDomain, // [ymin, ymax]
    yRange = [height - marginBottom, marginTop], // [bottom, top]
    yFormat, // a format specifier string for the y-axis
    yLabel, // a label for the y-axis
    color = "currentColor" // fill color of area
  } = {}) {
    // Compute values.
    const X = d3.map(data, x);
    const Y = d3.map(data, y);
    const I = d3.range(X.length);
  
    // Compute which data points are considered defined.
    if (defined === undefined) defined = (d, i) => !isNaN(X[i]) && !isNaN(Y[i]);
    const D = d3.map(data, defined);
  
    // Compute default domains.
    if (xDomain === undefined) xDomain = d3.extent(X);
    if (yDomain === undefined) yDomain = [0, d3.max(Y)];
  
    // Construct scales and axes.
    const xScale = xType(xDomain, xRange);
    const yScale = yType(yDomain, yRange);
    const xAxis = d3.axisBottom(xScale).ticks(width / 80).tickSizeOuter(0);
    const yAxis = d3.axisLeft(yScale).ticks(height / 40, yFormat);
  
    // Construct an area generator.
    const area = d3.area()
        .defined(i => D[i])
        .curve(curve)
        .x(i => xScale(X[i]))
        .y0(yScale(0))
        .y1(i => yScale(Y[i]));

    // // Construct a line generator.
    const line = d3.line()
        .defined(i => D[i])
        .curve(curve)
        .x(i => xScale(X[i]))
        .y(i => yScale(Y[i]));
  
    const svg = d3.create("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height])
        .attr("style", "max-width: 100%; height: auto; height: intrinsic;");
    
    const gradient = svg.append("defs")
        .append("linearGradient")
            .attr("id", 'Gradient')
            .attr('x1', '0')
            .attr('y1', '0')
            .attr('x2', '0')
            .attr('y2', '1')
            .classed('data__gradient', true);;
    gradient.append('stop')
        .attr('offset', 0)
        .attr('stop-color', color)
        .attr('stop-opacity', 0.1);
    // gradient.append('stop')
    //     .attr('offset', 0.9)
    //     .attr('stop-color', color)
    //     .attr('stop-opacity', 0);
    gradient.append('stop')
        .attr('offset', 1)
        .attr('stop-color', color)
        .attr('stop-opacity', 0);
  
    // Line
    svg.append("path")
        .attr("fill", 'transparent')
        .attr("d", line(I))
        .attr("stroke", color)
        .classed('data__line', true);
    // Underlying Gradient
    svg.append("path")
        .attr("fill", 'url(#Gradient)')
        .attr("d", area(I));

    return svg.node();
  }