import * as React from "react";
import { Table } from "../src/charts/Table";

export const TableTest: React.StatelessComponent<{}> = () => {
  const data = [
    {a: 1, b: 2},
    {a: 10, b: 20},
    {a: 100, b: 200},
    {a: 1000, b: 2000},
  ];
  return <Table
    data={data}
  />
}