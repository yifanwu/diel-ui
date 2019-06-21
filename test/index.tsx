import * as React from "react";
import * as ReactDOM from "react-dom";

import { TableTest } from "./TableTest";
import { BarTest } from "./BarTest";
import { DotPlotTest } from "./DotPlotTest";
import { MultiSeriesLineChartTest, SimpleLineChartTest } from "./LineChartTest";

console.log("setting up load page");

ReactDOM.render(
  <>
    <SimpleLineChartTest/>
    <br></br>
    <MultiSeriesLineChartTest/>
    <br></br>
    {/* <DotPlotTest/>
    <br></br>
    <BarTest/>
    <br></br>
    <TableTest/> */}
  </>,
  document.getElementById("wrapper")
);