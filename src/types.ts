export interface VizLayout {
  chartHeight: number;
  chartWidth: number;
  marginBottom: number;
  marginRight: number;
  marginTop: number;
  marginLeft: number;
}

export interface ChartPropShared {
  layout?: VizLayout;
  svgClickHandler?: () => void;
  colorSpec?: {
    selected?: string,
    default?: string,
    // the following is to support multiple series
    defaultMultiple?: string[];
  };
}
// both have well defined comparison semantics in SQLite
export type FilterValueType = number | string;

export enum SelectionType {
  OneDim = "OneDim",
  TwoDim = "TwoDim"
}

export type TwoDimSelection = {
  brushBoxType: SelectionType;
  minX: FilterValueType;
  maxX: FilterValueType;
  minY: FilterValueType;
  maxY: FilterValueType;
};

export type OneDimSelection = {
  brushBoxType: SelectionType;
  min: FilterValueType;
  max: FilterValueType;
};

export type GenericSelection = OneDimSelection | TwoDimSelection;

export enum ChartType {
  BarChart = "BarChart",
  Scatter = "Scatter",
  Map = "Map",
  // todo
  LineChart = "LineChart"
}

interface ChartSpecBase {
  chartType: ChartType;
  dimension: number;
  relationName: string;
}


export interface ChartSpecBase2D extends ChartSpecBase {
  xAttribute: string;
  yAttribute: string;
}

// the following 2 lines are copy-pasted from diel (should refactor...)
export type RecordObject = {[index: string]: string | number | Uint8Array};
export type RelationObject = RecordObject[];

/**
 * overloading map data with this, since lat/long is also just x and y, after some projection
 */
export interface ChartSpec2DWithData extends ChartSpecBase2D {
  data: RelationObject;
}

export interface ChartSpec3DWithData extends ChartSpec2DWithData {
  zAttribute: string;
}

export type ChartSpecWithData = ChartSpec2DWithData | ChartSpec3DWithData;