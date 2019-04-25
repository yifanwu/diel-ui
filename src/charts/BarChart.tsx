import * as React from "react";
import * as d3 from "d3";
import { ChartPropShared, SelectionType, ChannelName, RangeUnitSelection} from "../types";
import { DefaultColorSpec, DefaultVizLayout } from "../defaults";

export const BarChart: React.StatelessComponent<ChartPropShared> = (p) => {
  const data = p.data;
  const dimNumber = p.spec.channelByColumn.size;
  if ((!data) || (data.length < 1)) {
    return <p>no result</p>;
  }
  const xAttribute = p.spec.channelByColumn.get(ChannelName.x);
  const yAttribute = p.spec.channelByColumn.get(ChannelName.y);
  const colorAttribute = p.spec.channelByColumn.get(ChannelName.color);
  function getZScale() {
    if (dimNumber === 3) {
      const zScale = Array.from(new Set(p.data.map(d => d[colorAttribute] as string))).sort();
      const colors = (p.colorSpec && p.colorSpec.defaultMultiple)
        ? p.colorSpec.defaultMultiple
        : DefaultColorSpec.defaultMultiple;
      return (z: string) => colors[zScale.findIndex(zS => zS === z)];
    }
    return () => color;
  }
  const zColorsScale = getZScale();
  const color = p.colorSpec ? p.colorSpec.default : "steelblue";
  const selectedColor = (p.colorSpec && p.colorSpec.selected) ? p.colorSpec.selected : "orange";
  const layout = p.layout ? p.layout : DefaultVizLayout;
  const {chartWidth, chartHeight} = layout;
  // CORNER CASE of a single bar
  const yDomain = (data.length === 1)
    ? [0, data[0][yAttribute] as number]
    : d3.extent(data.map(d => d[yAttribute] as number));
  let y = d3.scaleLinear().rangeRound([layout.chartHeight, 0]).domain(yDomain);
  // FIXME: brittle
  const x = d3.scaleLinear().rangeRound([0, chartWidth]).domain([0, data.length]);
  // const barWidth = x.bandwidth();
  const barWidth = Math.round(chartWidth * 0.8 / data.length);
  const selectionMapped = p.selectedDataRange[0] as RangeUnitSelection;
  const bars =  data.map((d, idx) => {
    const yPos = y(d[yAttribute] as number);
    const c = dimNumber === 3
      ? zColorsScale(d[colorAttribute] as string)
      : color;
    const barColor = selectionMapped
      ? ((d[xAttribute] <= selectionMapped.max) && (d[xAttribute] >= selectionMapped.min))
        ? selectedColor
        : c
      : c;
    return <rect
      className={"select-bars"}
      x={x(idx)}
      y={yPos}
      width={barWidth}
      height={layout.chartHeight - yPos}
      fill={barColor}
    ></rect>;
  });
  // weird as any cast...
  // const xTickValues = data.map(v => v[p.spec.xAttribute] as any);
  const xFormatter = (t: any) => {
    const idx = parseInt(t);
    const tickVal = data[idx] ? data[idx][xAttribute] : "";
    return tickVal;
  };
  // not sure why we need to subtract 1 but we do...
  let xAxis = d3.axisBottom(x).tickValues(data.map((_, i) => i)).tickFormat(xFormatter as any);
  let yAxis = d3.axisLeft(y).ticks(Math.min(yDomain[1], 5)).tickSizeOuter(0);
  let brushDiv = null;
  if (p.brushHandler) {
    const brush = d3.brushX()
    .extent([[0, 0], [chartWidth, chartHeight]])
    .on("start", function() {
      // TODO
      // console.log("brush started");
    })
    .on("end", function() {
      // see https://github.com/d3/d3-brush/issues/10
      if (!d3.event.sourceEvent) return; // Only transition after input.
      if (!d3.event.selection) return; // Ignore empty selections.
      const s = d3.brushSelection(this) as [number, number];
      if (s !== null) {
        const min = data[Math.floor(x.invert(Math.min(s[0], s[1])))][xAttribute] as number;
        const max = data[Math.floor(x.invert(Math.max(s[0], s[1])))][xAttribute] as number;
        p.brushHandler([{selectionType: SelectionType.Range, min, max, channelName: ChannelName.x}]);
      }
      d3.select(this).call(brush.move, null);
    });
    brushDiv = <g ref={ g => d3.select(g).call(brush as any) }></g>;
  }
  // transform={`translate(${layout.chartWidth}, 0)`}
  const ticks = <>
      <g
        ref={(g) => {d3.select(g).call(yAxis as any); }}
      ></g>
      <g
        ref={(g) => {d3.select(g).call(xAxis as any); }}
        transform={`translate(0,` + layout.chartHeight + ")"}
      ></g>
    </>;
  return <svg
      onClick={p.svgClickHandler}
      width={layout.chartWidth + layout.marginLeft + layout.marginRight}
      height={layout.chartHeight + layout.marginTop + layout.marginBottom}
    >
     <g transform={`translate(${layout.marginLeft}, ${layout.marginTop})`} >
      {bars}
      {ticks}
      {brushDiv}
     </g>
  </svg>;
};