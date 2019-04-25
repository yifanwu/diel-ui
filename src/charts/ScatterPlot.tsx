import * as React from "react";
import { TwoDimCoord } from "./TwoDimCoord";
import { ChartPropShared, ChartSpec, FilterValueType, UserSelection, ChannelName } from "../types";
import d3 = require("d3");

interface ScatterplotProps extends ChartPropShared {
  brushHandler?: (box: UserSelection) => void;
}

export const Scatterplot: React.StatelessComponent<ScatterplotProps> = (p) => {
  const color = p.colorSpec ? p.colorSpec.default : "steelblue";

  const xAttribute = p.spec.channelByColumn.get(ChannelName.x);
  const yAttribute = p.spec.channelByColumn.get(ChannelName.y);
  const shapeGen = (x: any, y: any) => {
    return p.data.map((d, _) => <circle
      r="3"
      cx={x(d[xAttribute] as number)}
      cy={y(d[yAttribute] as number)}
      fill={color}
      fillOpacity={0.5}
      ></circle>);
  };
  return <TwoDimCoord
    shapeGen={shapeGen}
    {...p}
    brushHandler={p.brushHandler}
  />;
};