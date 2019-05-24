import * as React from "react";
import * as ReactDOM from "react-dom";

import { TableTest } from "./TableTest";
import { BarTest } from "./BarTest";
import { DotPlotTest } from "./DotPlotTest";

console.log("setting up load page");

ReactDOM.render(
  <>
    <DotPlotTest/>
    <BarTest/>
    <TableTest/>
  </>,
  document.getElementById("wrapper")
);