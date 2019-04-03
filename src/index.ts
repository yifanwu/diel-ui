import DielComponent, { DielComponentProps } from "./DielComponent";
import { OneDimSelection, ChartType, TwoDimSelection } from "./types";
import { MapChart, MapBounds, MapRegion } from "./charts/MapChart";
import { Scatterplot } from "./charts/ScatterPlot";
import { BarChart } from "./charts/BarChart";
import { HeatMap } from "./charts/HeatMap";
import { Table } from "./charts/Table";

export {
  DielComponent,
  DielComponentProps,
  ChartType,
  Scatterplot,
  BarChart,
  HeatMap,
  Table,
  OneDimSelection,
  TwoDimSelection,
  MapChart, MapBounds, MapRegion
};