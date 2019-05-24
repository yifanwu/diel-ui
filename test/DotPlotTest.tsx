import * as React from "react";
import { DotPlot } from "../src/charts/DotPlot";
import { ChartSpec, ChartType, ChannelName } from "../src/types";

const data = [
  {price: 1},
  {price: 12},
  {price: 4},
  {price: 8},
  {price: 11},
  {price: 2},
  {price: 12},
  {price: 3},
  {price: 15},
  {price: 2},
];

export const DotPlotTest:  React.StatelessComponent<{}> = (p) => {
  const spec: ChartSpec = {
    chartType: ChartType.DotPlot,
    channelByColumn: new Map([[ChannelName.value, "price"]])
  }
  return <DotPlot
    spec={spec}
    data={data}
  />;
}