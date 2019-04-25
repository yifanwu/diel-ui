import * as d3 from "d3";
import * as React from "react";
import { DefaultVizLayout } from "../defaults";
import { ChartPropShared } from "../types";

// basically a bunch of docts with a violin like scatter

interface DotPlotProps extends ChartPropShared {
  values: number[],
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

// FIMXE: this is very crude scattering right now; we should look into violin plots and how they scatter
export const DotPlotSingle: React.StatelessComponent<DotPlotProps> = (p) => {
  const layout = p.layout ? p.layout : DefaultVizLayout;
  const xDomain = d3.extent(p.values);
  const x = d3.scaleLinear()
              .domain(xDomain)
              .rangeRound([0, layout.chartWidth]);

  const genCircle = (t: number) => {
    const cy = gaussianRandom(0, layout.chartHeight);
    return <circle
      cx={x(t)}
      cy={cy}
      r={shapeSize / 2}
      fillOpacity={0.5}
      fill={color}
    ></circle>};

  const circles = p.values.map(t => genCircle(t));

  return <>
    {circles}
  </>;
}