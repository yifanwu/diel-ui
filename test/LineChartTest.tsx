import * as React from "react";
import { LineChart } from "../src/charts/LineChart";
import { ChartSpec, ChartType, ChannelName, AnnotationStyle } from "../src/types";

export const MultiSeriesLineChartTest: React.StatelessComponent<{}> = () => {
  const data = [{
    ts: 2457943.08039162,
    val: 26.52,
    kind: "minVal",
  },{
    ts: 2457943.08039162,
    val: 27.73,
    kind: "maxVal"
  },
  {
    ts: 2457943.08039162,
    val: 27.0237,
    kind: "avgVal"
  },
  {
    ts: 2457943.08039176,
    val: 30.84,
    kind: "minVal"
  },
  {
    ts: 2457943.08039176,
    val: 655.35,
    kind: "maxVal"
  },
  {
    ts: 2457943.08039176,
    val: 239.772,
    kind: "avgVal"
  },
  {
    ts: 2457943.08039396,
    val: 30.94,
    kind: "minVal"
  },
  {
    ts: 2457943.08039396,
    val: 655.35,
    kind: "maxVal"
  },
  {
    ts: 2457943.08039396,
    val: 239.814,
    kind: "avgVal"
  },
  {
    ts: 2457943.08039627,
    val: 31.4,
    kind: "minVal"
  },
  {
    ts: 2457943.08039627,
    val: 655.35,
    kind: "maxVal",
  },
  {
    ts: 2457943.08039627,
    val: 240.087,
    kind: "avgVal"
  },
  {
    ts: 2457943.08039861,
    val: 31.96,
    kind: "minVal",
  },
  {
    ts: 2457943.08039627,  
    val: 655.35,
    kind: "maxVal",
  },
  {
    ts: 2457943.08039627,
    val: 240.503,
    kind: "avgVal"
  }]
  
  const spec: ChartSpec = {
    chartType: ChartType.LineChart,
    channelByColumn: new Map([
      [ChannelName.x, "ts"],
      [ChannelName.y, "val"],
      [ChannelName.color, "kind"],
    ]),
    annotation: {
      columns: ["kind"],
      style: AnnotationStyle.Popup,
    }
  }
  return <LineChart
    spec={spec}
    data={data}
  />;
}

export const SimpleLineChartTest: React.StatelessComponent<{}> = () => {
  const data = [
    {
      ts: 1,
      val: 10
    },
    {
      ts: 2,
      val: 20
    },
    {
      ts: 3,
      val: 30
    },
    {
      ts: 4,
      val: 40
    },
  ];
  const spec: ChartSpec = {
    chartType: ChartType.LineChart,
    channelByColumn: new Map([
      [ChannelName.x, "ts"],
      [ChannelName.y, "val"],
    ]),
  }
  return <LineChart
    spec={spec}
    data={data}
  />;
}

// here we expect to see three discrete pieces of lines
export const BreakLineChartTest: React.StatelessComponent<{}> = () => {
  const data = [
    {
      ts: 1,
      val: 10
    },
    {
      ts: 2,
      val: 20
    },
    {
      ts: 3,
      val: 30
    },
    {
      ts: 40,
      val: 400
    },
    {
      ts: 41,
      val: 410
    },
    {
      ts: 42,
      val: 420
    },

    {
      ts: 140,
      val: 1400
    },
    {
      ts: 141,
      val: 1410
    },
    {
      ts: 142,
      val: 1420
    }
  ];
  const spec: ChartSpec = {
    chartType: ChartType.LineChart,
    channelByColumn: new Map([
      [ChannelName.x, "ts"],
      [ChannelName.y, "val"],
    ]),
    custom: {
      noLineIfMoreThan: 10
    }
  }
  return <LineChart
    spec={spec}
    data={data}
  />;
}