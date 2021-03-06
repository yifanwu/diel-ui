import * as React from "react";
import * as d3 from "d3";
import { RecordObject } from "diel";

import { ChartPropShared, FilterValueType, ChannelName } from "../types";
import { TwoDimCoord } from "./TwoDimCoord";


/**
 * still have to implement small multiples
 * @param p
 */
export const LineChart: React.StatelessComponent<ChartPropShared> = (p) => {
  const color = p.colorSpec ? p.colorSpec.default : "steelblue";

  const xAttribute = p.spec.channelByColumn.get(ChannelName.x);
  const yAttribute = p.spec.channelByColumn.get(ChannelName.y);
  // shape gen will return a sequence...
  const shapeGen = (x: any, y: any) => {
    let lineMapping = d3.line<RecordObject>().x((d) => x(d[xAttribute])).y((d) => y(d[yAttribute]));
    // need to generate dots signaling each point
    // also need to figure out if there are annotations
    // let onMouseOver: (e: React.MouseEvent<SVGCircleElement, MouseEvent>) => void = null;
    // let onMouseOut = null;
    const circles = p.data.map((d, _) => {
      const text = p.spec.annotation
        ?  p.spec.annotation.columns.map(c => d[c]).join(", ")
        : null
        ;
      return <circle
        r="3"
        cx={x(d[xAttribute] as number)}
        cy={y(d[yAttribute] as number)}
        data-lable={text}
        // onMouseOver={onMouseOver}
        // onMouseOut={null}
        fill={"gray"}
        fillOpacity={0.5}
      ></circle>;
    });
    if (p.spec.channelByColumn.get(ChannelName.color)) {
      const colorAttribute = p.spec.channelByColumn.get(ChannelName.color);
      // then we create a little dictionary of colors
      // const tooltip = <div id="toolTip" style={{opacity: 0}}></div>
      // if (p.spec.annotation) {
      //   onMouseOver = (e) => {
      //     const text = e.currentTarget.getAttribute("data-lable");
      //     console.log("pop up detected", text);
      //   }
      // }
      // now for each series, generate line
      // FIXME: perf issue
      const series = new Set(p.data.map(d => d[colorAttribute] as string));
      const lines: JSX.Element[] = [];
      let colorCounter = 0;
      series.forEach((s) => {
        let line = lineMapping(p.data.filter(d => d[colorAttribute] === s));
        const lineDiv = <path stroke={d3.schemeCategory10[colorCounter]} fill="none" stroke-wdith="1.5" d={line}></path>;
        colorCounter++;
        lines.push(lineDiv);
      });
      return lines.concat(circles);
    } else {
      // let's do the cuts
      if (p.spec.custom && p.spec.custom.noLineIfMoreThan) {
        const cutOff = p.spec.custom.noLineIfMoreThan;
        const slices = [];
        let prevIndex = 0;
        for (let i = 1; i < p.data.length; i++) {
          const v1 = p.data[i-1][xAttribute] as number;
          const v2 = p.data[i][xAttribute] as number;
          if ((v2 - v1) > cutOff) {
            // create a new segment from prevIndex
            slices.push(lineMapping(p.data.slice(prevIndex, i)));
            prevIndex = i;
          }
        }
        return slices.map(line => <path stroke={color} fill="none" stroke-wdith="1.5" d={line}></path>, circles);
      } else {
        let line = lineMapping(p.data);
        return [<path stroke={color} fill="none" stroke-wdith="1.5" d={line}></path>, circles];
      }
    }
  };
  return <TwoDimCoord
    shapeGen={shapeGen}
    {...p}
  />;
};