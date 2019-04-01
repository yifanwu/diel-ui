import * as React from "react";

import { GenericSelection, RelationObject, ChartType, ChartSpec2DWithData, ChartSpec3DWithData } from "./types";
import { BarChart } from "./charts/BarChart";
import { Scatterplot } from "./charts/ScatterPlot";

export interface DielHanders {
  selectionHandler?: (box: GenericSelection) => void;
  deSelectHandler?: () => void;
}

interface DielComponentProps {
  bindOutput: (name: string, fn: (r: RelationObject) => void) => void;
  scales: (name: string) => {dimension: number, x: string, y?: string, z?: string};
}

interface DielComponentState {
  [index: string]: RelationObject;
}

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
      this.props.bindOutput(relationName, fn);
    });
  }

  // FIXME: this is inefficient
  GenerateChart (chartType: ChartType, relationName: string, handlers?: DielHanders) {
    if (this.state[relationName]) {
      const scales = this.props.scales(relationName);
      const dimension = scales.dimension as number;
      const data = this.state[relationName];
      const xAttribute = scales.x as string;
      const yAttribute = scales.y as string;
      let spec = (dimension === 2)
        ? {
          chartType,
          dimension,
          relationName,
          data,
          xAttribute,
          yAttribute
        } as ChartSpec2DWithData
      : {
        chartType,
        dimension,
        relationName,
        data,
        xAttribute,
        yAttribute,
        zAttribute: scales.z as string
      } as ChartSpec3DWithData;
      if (chartType === ChartType.BarChart) {
        return <BarChart
          spec={spec}
          brushHandler={handlers ? handlers.selectionHandler : null}
          svgClickHandler={handlers ? handlers.deSelectHandler : null}
        />;
      } else if (chartType === ChartType.Scatter) {
        return <Scatterplot
          spec={spec}
          brushHandler={handlers ? handlers.selectionHandler : null}
        />;
      } else {
        throw new Error(`Only supports barcharts and scatter plots for now`);
        // else if (chartType === ChartType.Map) {
        //   return <MapChart
        //     spec={spec}
        //     // hard code for now..
        //     mapRegion={MapRegion.US}
        //   />;
        //   // LogInternalError(`The API for the Map ChartType is not complete yet`);
        // }
      }
    } else {
      console.log(`The state of relation ${relationName} has not being set`);
      return <p>Loading</p>;
    }
  }
}