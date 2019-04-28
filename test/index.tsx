import * as React from "react";
import * as ReactDOM from "react-dom";

import { TableTest } from "./TableTest";
import { BarTest } from "./BarTest";

console.log("setting up load page");

ReactDOM.render(
  <>
    <BarTest/>
    <TableTest/>
  </>,
  document.getElementById("wrapper")
);