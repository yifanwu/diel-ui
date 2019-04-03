import * as React from "react";
import * as ReactDOM from "react-dom";

import { MapTest } from "./MapTest";

console.log("setting up load page");

ReactDOM.render(
  <>
    <MapTest/>
  </>,
  document.getElementById("wrapper")
);