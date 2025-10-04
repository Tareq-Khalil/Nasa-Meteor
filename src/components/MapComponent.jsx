import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { feature } from "topojson-client";

const WORLD_MAP_URL =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

export default function MapComponent() {
  const svgRef = useRef();
  const gRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const g = d3.select(gRef.current);
    const width = window.innerWidth;
    const height = window.innerHeight;

    svg.attr("viewBox", `0 0 ${width} ${height}`)
       .style("background", "black")
       .style("display", "block")
       .style("margin", "0 auto");

    // smaller scale to fit the whole world
    const projection = d3.geoMercator()
      .scale(width / 7.5) // smaller scale (was width / 6)
      .translate([width / 2, height / 1.9]); 

    const path = d3.geoPath().projection(projection);

    d3.json(WORLD_MAP_URL).then((topology) => {
      const countries = feature(topology, topology.objects.countries).features;

      g.selectAll("path")
        .data(countries)
        .join("path")
        .attr("d", path)
        .attr("fill", "black")
        .attr("stroke", "white")
        .attr("stroke-width", 0.5);
    });

    // --- Zoom behavior ---
    const zoom = d3.zoom()
      .scaleExtent([1, 8])
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
      });

    svg.call(zoom);
  }, []);

  return (
    <div className="flex justify-center items-center bg-black">
      <svg ref={svgRef} className="w-full h-[70vh] border-2 border-white rounded-lg">
        <g ref={gRef}></g>
      </svg>
    </div>
  );
}
