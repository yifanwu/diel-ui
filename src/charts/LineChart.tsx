import * as React from "react";
import * as d3 from "d3";
import { RecordObject } from "diel";

import { ChartPropShared, FilterValueType, ChannelName } from "../types";
import { TwoDimCoord } from "./TwoDimCoord";


export const LineChart: React.StatelessComponent<ChartPropShared> = (p) => {
  const color = p.colorSpec ? p.colorSpec.default : "steelblue";

  const xAttribute = p.spec.channelByColumn.get(ChannelName.x);
  const yAttribute = p.spec.channelByColumn.get(ChannelName.y);
  const shapeGen = (x: any, y: any) => {
    let lineMapping = d3.line<RecordObject>().x((d) => x(d[xAttribute])).y((d) => y(d[yAttribute]));
    let line = lineMapping(p.data);
    return <path stroke={color} fill="none" stroke-wdith="1.5" d={line}></path>;
  };
  return <TwoDimCoord
    shapeGen={shapeGen}
    {...p}
  />;
};