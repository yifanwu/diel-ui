// import * as React from "react";
// import { MapChart, MapRegion } from "../src/charts/MapChart";
// import { ChartType, TwoDimSelection } from "../src/types";
// import d3 = require("d3");
// import { ContainerElement } from "d3";

// interface MapTestState {
//   brush: TwoDimSelection;
// }

// export class MapTest extends React.Component<{}, MapTestState> {
//   constructor(props: {}) {
//     super(props);
//     this.setBrush = this.setBrush.bind(this);
//     (window as any).setBrush = this.setBrush;
//     this.state = {
//       brush: null
//     };
//   }
//   setBrush(brush: TwoDimSelection) {
//     this.setState({brush});
//   }
//   render() {
//     const brushMap = (this.state.brush)
//     ? <MapChart
//       spec={{
//         chartType: ChartType.Map,
//         xAttribute: "",
//         yAttribute: "_",
//         data: []
//       }}
//       mapRegion={MapRegion.US}
//       brushToRender={{
//         latMin: this.state.brush.minY as number,
//         latMax: this.state.brush.maxY as number,
//         longMin: this.state.brush.minX as number,
//         longMax: this.state.brush.maxX as number
//       }}
//     />
//     : null;
//     const setBrush = this.setBrush;
//     return <>
//       <MapChart
//         spec={{
//           chartType: ChartType.Map,
//           relationName: "_",
//           xAttribute: "",
//           yAttribute: "_",
//           data: []
//         }}
//         mapRegion={MapRegion.US}
//         brushHandler={(box: TwoDimSelection) => {
//           console.log(box);
//           setBrush(box);
//         }}
//       />
//       <p>Control below:</p>
//       {brushMap}
//     </>;
//   }
// }