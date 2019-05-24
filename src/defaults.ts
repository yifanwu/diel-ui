import * as d3ScaleChromatic from "d3-scale-chromatic";

export const DefaultColorSpec = {
  selected: "orange",
  default: "steelblue",
  // max out at 10, in whcih case we complain
  defaultMultiple: d3ScaleChromatic.schemeCategory10
};

export const DefaultColorRange = {
  minColor: "blue",
  maxColor: "red"
}

export const DefaultWideVizLayout = {
  chartHeight: 150,
  chartWidth: 400,
  marginBottom: 20,
  marginRight: 20,
  marginTop: 20,
  marginLeft: 40,
}

export const DefaultVizLayout = {
  chartHeight: 300,
  chartWidth: 400,
  marginBottom: 20,
  marginRight: 20,
  marginTop: 20,
  marginLeft: 40,
};