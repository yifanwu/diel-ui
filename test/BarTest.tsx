import * as React from "react";
import { BarChart } from "../src/charts/BarChart";
import { ChartSpec, ChartType, ChannelName } from "../src/types";

const data = [{origin: "ONT", distance: 325},
  {origin: "DAL", distance: 580},
  {origin: "STL", distance: 687},
  {origin: "ABQ", distance: 1552},
  {origin: "FLL", distance: 197},
  {origin: "SEA", distance: 697},
  {origin: "HOU", distance: 1235},
  {origin: "PHX", distance: 325},
  {origin: "OKC", distance: 181},
  {origin: "SAN", distance: 417},
  {origin: "PHX", distance: 328},
  {origin: "DAL", distance: 189},
  {origin: "MDW", distance: 611},
  {origin: "CLE", distance: 487},
  {origin: "LAX", distance: 236},
  {origin: "PVD", distance: 907},
  {origin: "MDW", distance: 544},
  {origin: "MCI", distance: 718},
  {origin: "SAN", distance: 628},
  {origin: "HRL", distance: 233}
];

export const BarTest: React.StatelessComponent<{}> = (p) => {
  const spec: ChartSpec = {
    chartType: ChartType.BarChart,
    channelByColumn: new Map([[ChannelName.x,
    "origin"], [ChannelName.y, "distance"]])
  }
  return <BarChart
    spec={spec}
    data={data}
  />;
}