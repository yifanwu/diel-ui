import * as React from "react";

import { RelationObject } from "diel";
import { ChartSpec, ChartType, BarChart, Scatterplot, Table, HeatMap } from ".";
import { DielHanders } from "./DielComponent";
import { LineChart } from "./charts/LineChart";

export function GetChartWithSpec(spec: ChartSpec, data: RelationObject, handlers?: DielHanders): JSX.Element {
  switch(spec.chartType) {
    case ChartType.BarChart:
      return <BarChart
        spec={spec}
        data={data}
        brushHandler={handlers ? handlers.selectionHandler : null}
        svgClickHandler={handlers ? handlers.deSelectHandler : null}
      />;
    case ChartType.Scatter:
      return <Scatterplot
        spec={spec}
        data={data}
        brushHandler={handlers ? handlers.selectionHandler : null}
      />;
    case ChartType.Table:
      return <Table
        data={data}
      />;
    case ChartType.LineChart:
      return <LineChart
        data={data}
        spec={spec}
        brushHandler={handlers ? handlers.selectionHandler : null}
        svgClickHandler={handlers ? handlers.deSelectHandler : null}
      />;
    case ChartType.Heatmap:
      return <HeatMap
        data={data}
        spec={spec}
        brushHandler={handlers ? handlers.selectionHandler : null}
        svgClickHandler={handlers ? handlers.deSelectHandler : null}
      />;
    default:
      throw new Error(`Only supports barcharts and scatter plots for now`);
  }
}