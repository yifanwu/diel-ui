import DielComponent, { DielComponentProps } from "./DielComponent";
import { MapChart, MapBounds, MapRegion } from "./charts/MapChart";
import { Scatterplot } from "./charts/ScatterPlot";
import { BarChart } from "./charts/BarChart";
import { HeatMap } from "./charts/HeatMap";
import { Table } from "./charts/Table";
import { ChartType, UserSelection, ChartSpec, ChannelName } from "./types";
import { DotPlotSingle } from "./charts/DotPlotSingle";

export {
  DielComponent,
  DielComponentProps,
  UserSelection,
  ChartType,
  ChartSpec,
  ChannelName,
  // charts
  Scatterplot,
  BarChart,
  HeatMap,
  DotPlotSingle,
  Table,
  // map related
  MapChart,
  MapBounds,
  MapRegion
};