import * as React from "react";

import { DielRuntime, RelationObject } from "diel";
import { UserSelection, ChartType, ChartSpec } from "./types";
import { BarChart } from "./charts/BarChart";
import { Scatterplot } from "./charts/ScatterPlot";
import { Table, HeatMap } from ".";
import { LineChart } from "./charts/LineChart";

export interface DielHanders {
  selectionHandler?: (box: UserSelection) => void;
  deSelectHandler?: () => void;
}

// just pass the diel runtime in, this hides the exact interfacing
// scales: (output: string, component?: string) => {dimension: number, x: string, y?: string, z?: string};
export interface DielComponentProps {
  diel: DielRuntime;
  // bindOutput: (name: string, fn: (r: RelationObject) => void) => void;
}

interface DielComponentState {
  [index: string]: RelationObject;
}

interface Scale {
  dimension: number;
  x: string;
  y?: string;
  z?: string;
}

/**
 * The scales props should be optional --- only needed if using the Generate
 */
export default class DielComponent<P extends DielComponentProps> extends React.Component<P, DielComponentState>  {

  constructor(props: P) {
    super(props);
    this.state = {};
  }

  BindDielOutputs(relationNames: string[]) {
    const self = this;
    relationNames.map(relationName => {
      const fn = (r: RelationObject) => {
        self.setState({[relationName]: r});
      };
      this.props.diel.BindOutput(relationName, fn);
    });
  }

  // FIXME: this is inefficient
  GenerateChart (spec: ChartSpec, relationName: string, handlers?: DielHanders) {

    const data = this.state[relationName];
    if (!data) return null;
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
}