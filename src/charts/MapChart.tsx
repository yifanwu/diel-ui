import * as React from "react";
import { geoPath, geoEquirectangular } from "d3-geo"
import * as d3 from "d3";

import { ChartPropShared, ChartSpec2DWithData, TwoDimSelection, SelectionType } from "../types";
import { DefaultVizLayout } from "../defaults";
import { LogError } from "../util";
import { ContainerElement, clientPoint } from "d3";

// FIXME: this is a very odd dependency...
const UsMapDataLink = "https://api.myjson.com/bins/h6sag";

const usTop = 49.35;  // north lat
const usLeft = -124.78 // west long
const usRight = -66.95 // east long
const usBottom = 24.74 // south lat

// const width = 300;
// const height = 200;

function getUSProjection(width: number, height: number) {
  let projection = geoEquirectangular()
    .scale(1)
    .translate([0, 0]);;
  const tl = projection([usLeft, usTop]);
  const br = projection([usRight, usBottom]);
  // console.log(tl, br, br[0] - tl[0], br[1] - tl[1]);
  const b = [tl, br];
  const s = .95 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height);
  const t = [(width - s * (b[1][0] + b[0][0])) / 2, (height - s * (b[1][1] + b[0][1])) / 2];
  return {
    s,
    t
  }
}


export enum MapRegion {
  US = "US",
  // TODO: world
}

interface MapState {
  geoData: any;
}

export type MapBounds = {latMin: number, latMax: number, longMin: number, longMax: number};

interface MapProp extends ChartPropShared {
  spec: ChartSpec2DWithData;
  mapRegion: MapRegion;
  mapBounds?: MapBounds;
  brushToRender?: MapBounds;
  selectedDataRange?: TwoDimSelection;
  brushHandler?: (box: TwoDimSelection) => void;
  onClickHandler?: (pos?: [number, number]) => void;
}

export function mapBoundsToTransform(s: MapBounds, scale: number, width: number, height: number) {
  if (!s) {
    throw new Error("Selection is null");
  }
  let p1 = geoEquirectangular()
            .scale(scale)
            .translate([width / 2, height / 2]);
  const nw: [number, number] = [s.longMin as number, s.latMax as number];
  const se: [number, number] = [s.longMax as number, s.latMin as number];
  let pnw = p1(nw);
  let pse = p1(se);
  if ((!pnw) || (!pse)) {
    LogError(`Selection ${s} out of bounds of USA`);
    return null;
  }
  let dx = pse[0] - pnw[0];
  let dy = pse[1] - pnw[1];
  // reproject
  let k = 1 / Math.max(dx / width, dy / height);
  let p2 = geoEquirectangular().scale(scale * k).translate([width / 2, height / 2]);
  pnw = p2(nw);
  pse = p2(se);
  let x = (pnw[0] + pse[0]) / 2;
  let y = (pnw[1] + pse[1]) / 2;
  // console.log("nw", s.nw, "sw", s.se, "input", SCALE, WIDTH, HEIGHT, "pnw", pnw, "pse", pse, "ratios", "transforms", k, x, y);
  if (isNaN(x) || isNaN(y) || isNaN(k)) {
    LogError("Transformations are invalid");
  }
  return {
    x,
    y,
    k
  };
}
export interface Transform {
  y: number;
  x: number;
  k: number;
}

export function getTranslatedMapping(t: Transform, scale: number, width: number, height: number) {
  return geoEquirectangular()
          .scale(scale * t.k)
          .translate([width - t.x, height - t.y]);
}

export class MapChart extends React.Component<MapProp, MapState> {
  constructor(props: MapProp) {
    super(props);
    this.state = {
      geoData: null
    };
    this.setGeoData();
  }

  async setGeoData() {
    d3.json(UsMapDataLink).then(geoData => {
      this.setState({geoData});
    }).catch((e) => {
      LogError(e);
    });
  }

  render() {
    const layout = this.props.layout ? this.props.layout : DefaultVizLayout;
    const { data, xAttribute, yAttribute } = this.props.spec;
    const { brushToRender } = this.props;

    if (!this.state.geoData) {
      return <p>Loading map base data</p>;
    }
    const {s, t} = getUSProjection(layout.chartWidth, layout.chartHeight);
    let projection = geoEquirectangular()
                      .scale(s)
                      .translate(t as any);
    if (this.props.mapBounds && this.props.mapBounds.latMax) { // avoid the null corner case
      let t = mapBoundsToTransform(this.props.mapBounds, s, layout.chartWidth, layout.chartHeight);
      if (!t) return <p className="">Selection out of bounds, please try selecting another region.</p>;
      projection = getTranslatedMapping(t, s, layout.chartWidth, layout.chartHeight);
    }
    let brushDiv: JSX.Element = null;
    if (this.props.brushHandler) {
      const brushHandler = this.props.brushHandler;
      const brush = d3.brush()
      .extent([
        [0, 0],
        [layout.chartWidth, layout.chartHeight]
      ])
      .on("end", function() {
        // [[x0, y0], [x1, y1]],
        const s = d3.brushSelection(this) as [[number, number], [number, number]];
        // console.log("original selection", s);
        if (s !== null) {
          // long, lat
          const p1 = projection.invert(s[0]);
          const p2 = projection.invert(s[1]);
          const minY = Math.min(p1[1], p2[1]); // lat
          const maxY = Math.max(p1[1], p2[1]);
          const maxX = Math.max(p1[0], p2[0]); // long
          const minX = Math.min(p1[0], p2[0]);
          brushHandler({
            brushBoxType: SelectionType.TwoDim,
            minX,
            maxX,
            minY,
            maxY
          });
        }
      });
      brushDiv = <g ref={ g => d3.select(g).call(brush) }></g>;
    }
    let renderedBrushDiv;
    if (brushToRender) {
      const SW = projection([brushToRender.longMin, brushToRender.latMin]);
      const NE = projection([brushToRender.longMax, brushToRender.latMax]);
      renderedBrushDiv = <rect
        x={Math.min(SW[0], NE[0])}
        y={Math.min(NE[1], NE[1])}
        width={Math.abs(NE[0] - SW[0])}
        height={Math.abs(SW[1] - NE[1])} // ugh canvas flips it again...
        fill={"yellow"}
        fill-opacity={0.4}
      ></rect>;
    }
    let circles;
    if (data.length > 0) {
      let latAttribute = xAttribute;
      let longAttribute = yAttribute;
      if (xAttribute.toLocaleUpperCase() !== "LATITUDE") {
        if ((yAttribute.toLocaleUpperCase() !== "LATITUDE") || (xAttribute.toLocaleUpperCase() !== "LONGITUDE")) {
          LogError(`Maps have to be LATITUDE or LONGITUDE!`);
        }
        latAttribute = yAttribute;
        longAttribute = xAttribute;
      } else {
        if ((yAttribute.toLocaleUpperCase() !== "LONGITUDE")) {
          LogError(`Maps have to be LATITUDE or LONGITUDE!`);
        }
      }
      circles = data.map(d => {
        // has to be named latitude or longitude
        const pos = projection([d[longAttribute] as number, d[latAttribute] as number]);
        return <circle
          r={3}
          cx={pos[0]}
          cy={pos[1]}
          fill="lightblue"
        ></circle>;
      });
    }
    const geoGen = geoPath().projection(projection);
    const mapDivs = this.state.geoData.features.map((d: any, i: any) => (
      <path
        key={ `path-${ i }` }
        d={ geoGen(d) }
        fill="steelblue"
        stroke="#FFFFFF"
        strokeWidth={ 0.5 }
      />
    ));
    return <><svg
      onClick={(e) => {
        if (this.props.onClickHandler) {
          const coords = projection.invert(clientPoint(e.target as any, e));
          this.props.onClickHandler(coords);
        }
      }}
      width={layout.chartWidth}
      height={layout.chartHeight}
      >
      {mapDivs}
      {circles}
      {brushDiv}
      {renderedBrushDiv}
    </svg></>;

  }
}