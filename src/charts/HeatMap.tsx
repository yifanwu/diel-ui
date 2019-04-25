import * as React from "react";
import * as d3 from "d3";

import { TwoDimCoord } from "./TwoDimCoord";
import { ChartPropShared, ChartSpec, FilterValueType, UnitSelection, ChannelName, UserSelection } from "../types";
import { HasDefault } from "diel/build/src/parser/dielAstTypes";
import { DefaultColorRange } from "../defaults";

interface HeatMapProps extends ChartPropShared {
  colorRange?: HasDefault<{
    minColor: string;
    maxColor: string;
  }>;
  // add panHandlers...
  // panHandler
}

export const HeatMap: React.StatelessComponent<HeatMapProps> = (p) => {
  const colorRange = p.colorRange
    ? p.colorRange
    : DefaultColorRange 
    ;
  const colorScale = d3.interpolateRgb(colorRange.minColor, colorRange.maxColor);
  // const {data, , zAttribute, yAttribute} = p.spec;
  const xAttribute = p.spec.channelByColumn.get(ChannelName.x);
  const yAttribute = p.spec.channelByColumn.get(ChannelName.y);
  const colorAttribute = p.spec.channelByColumn.get(ChannelName.color);
  const zValues = p.data.map(d => d[colorAttribute] as number);
  const zDomain = d3.extent(zValues);
  const zScale = d3.scaleLog()
                    .domain(zDomain)
                    .range([0, 1]);
  // fixme: adjust to the current width/height
  const rectWidth = p.layout.chartWidth / p.data.length;
  const rectHeight = p.layout.chartHeight / p.data.length;
  const shapeGen = (x: any, y: any) => {
    p.data.map((d, _) => <rect
      width={rectWidth}
      height={rectHeight}
      x={x(d[xAttribute] as number)}
      y={y(d[yAttribute] as number)}
      fill={colorScale(zScale(d[colorAttribute] as number))}
      fillOpacity={1}
      ></rect>);
  };
  return <TwoDimCoord
    shapeGen={shapeGen}
    {...p}
  />;
};