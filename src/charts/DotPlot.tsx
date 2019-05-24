import * as d3 from "d3";
import * as React from "react";
import { DefaultVizLayout, DefaultWideVizLayout } from "../defaults";
import { ChartPropShared, ChannelName } from "../types";
import { LogError } from "../util";

// basically a bunch of docts with a violin like scatter

interface DotPlotProps extends ChartPropShared {
  extent?: {min: number, max: number},
}

function gaussianRandom(start: number, end: number) {
  let rand = 0;
  for (let i = 0; i < 6; i += 1) {
    rand += Math.random();
  }
  rand = rand / 6;
  return Math.floor(start + rand * (end - start + 1));
}

const shapeSize = 5;
const color = "steelblue";

// TODO: 
// - haven't implemented the filter yet
// - this is very crude scattering right now; we should look into violin plots and how they scatter
export const DotPlot: React.StatelessComponent<DotPlotProps> = (p) => {
  const layout = p.layout
    ? p.layout 
    : DefaultWideVizLayout;

  const attribute = p.spec.channelByColumn.get(ChannelName.value);
  if (!attribute) LogError(`Attribute ${attribute} not defined for this dataset`);
  const values = p.data.map(d => d[attribute] as number);
  const domain = d3.extent(values);
  const x = d3.scaleLinear()
              .domain(domain)
              .rangeRound([layout.marginLeft, layout.chartWidth + layout.marginLeft]);

  const genCircle = (t: number) => {
    const cy = gaussianRandom(layout.marginTop, layout.chartHeight + layout.marginTop);
    return <circle
      cx={x(t)}
      cy={cy}
      r={shapeSize / 2}
      fillOpacity={0.5}
      fill={color}
    ></circle>};

  const circles = values.map(t => genCircle(t));
  // a H shaped guidebar
  const guidelines = [
    // left
    <line
      x1={layout.marginLeft}
      y1={layout.marginTop}
      x2={layout.marginLeft}
      y2={layout.chartHeight + layout.marginTop}
      stroke="lightgray"
    />,
    // middle
    <line
      x1={layout.marginLeft}
      y1={layout.marginTop + layout.chartHeight / 2}
      x2={layout.marginLeft + layout.chartWidth}
      y2={layout.marginTop + layout.chartHeight / 2}
      stroke="lightgray"
    />,
    // right
    <line
      x1={layout.marginLeft + layout.chartWidth}
      y1={layout.marginTop}
      x2={layout.marginLeft + layout.chartWidth}
      y2={layout.chartHeight + layout.marginTop}
      stroke="lightgray"
    />,
  ];
  // for now just have two...
  const guideNumbers = [
    <text
      x={layout.marginLeft}
      y={layout.chartHeight + layout.marginTop}
      fill="lightgray"
    >{domain[0]}</text>,
    <text
      x={layout.marginLeft + layout.chartWidth}
      y={layout.chartHeight + layout.marginTop}
      fill="lightgray"
    >{domain[1]}</text>,
  ]
  return <svg
      onClick={p.svgClickHandler}
      width={layout.chartWidth + layout.marginLeft + layout.marginRight}
      height={layout.chartHeight + layout.marginTop + layout.marginBottom}
    >
    {circles}
    {guidelines}
    {guideNumbers}
  </svg>;
}