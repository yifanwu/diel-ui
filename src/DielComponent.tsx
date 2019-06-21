import * as React from "react";

import { DielRuntime, RelationObject } from "diel";
import { UserSelection, ChartType, ChartSpec } from "./types";
import { GetChartWithSpec } from "./GetCharts";

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
    // if we were to make this work we should check if it has been updated before
    // const self = this;
    // const fn = (r: RelationObject) => {
    //   self.setState({[relationName]: r});
    // };
    // this.props.diel.BindOutput(relationName, fn);
    const data = this.state[relationName];
    if (data) return GetChartWithSpec(spec, data, handlers);
    return null;
  }
}