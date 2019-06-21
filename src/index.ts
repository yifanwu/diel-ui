import DielComponent, { DielComponentProps } from "./DielComponent";
import { MapChart, MapBounds, MapRegion } from "./charts/MapChart";
import { Scatterplot } from "./charts/ScatterPlot";
import { BarChart } from "./charts/BarChart";
import { HeatMap } from "./charts/HeatMap";
import { Table } from "./charts/Table";
import { ChartType, UserSelection, ChartSpec, ChannelName, InteractionsByChartType } from "./types";
import { DotPlot } from "./charts/DotPlot";
import { GetChartWithSpec } from "./GetCharts";
import { LineChart } from "./charts/LineChart";

export {
  GetChartWithSpec,
  DielComponent,
  DielComponentProps,
  UserSelection,
  ChartType,
  ChartSpec,
  ChannelName,
  // charts
  Scatterplot,
  BarChart,
  LineChart,
  HeatMap,
  DotPlot as DotPlotSingle,
  Table,
  // meta-ish data
  InteractionsByChartType,
  // map related
  MapChart,
  MapBounds,
  MapRegion,
};