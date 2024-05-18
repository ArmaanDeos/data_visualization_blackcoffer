import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const RegionChart = ({ data, width }) => {
  const ref = useRef();

  useEffect(() => {
    const regionCounts = countRegions(data);

    const height = Math.min(width, 500);
    const radius = Math.min(width, height) / 2;

    const arc = d3
      .arc()
      .innerRadius(radius * 0.67)
      .outerRadius(radius - 1);

    const pie = d3
      .pie()
      .padAngle(1 / radius)
      .sort(null)
      .value((d) => d.count);

    const color = d3
      .scaleOrdinal()
      .domain(regionCounts.map((d) => d.region))
      .range(
        d3
          .quantize(
            (t) => d3.interpolateSpectral(t * 0.8 + 0.1),
            regionCounts.length
          )
          .reverse()
      );

    const svg = d3
      .select(ref.current)
      .selectAll("svg")
      .data([null])
      .join("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("style", "max-width: 100%; height: auto;");

    const arcGroup = svg
      .selectAll("g")
      .data([null])
      .join("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    arcGroup
      .selectAll("path")
      .data(pie(regionCounts))
      .join("path")
      .attr("fill", (d) => color(d.data.region))
      .attr("d", arc)
      .append("title")
      .text((d) => `${d.data.region}: ${d.data.count}`);
  }, [data, width]);

  // Helper function to count occurrences of each region
  const countRegions = (data) => {
    const counts = {};
    data.forEach((d) => {
      counts[d.region] = (counts[d.region] || 0) + 1;
    });
    const regionCounts = Object.keys(counts).map((region) => ({
      region: region || "No Region Name", // Use "No Region" if region is falsy
      count: counts[region],
    }));
    return regionCounts;
  };

  return (
    <>
      <div ref={ref}></div>
    </>
  );
};

export default RegionChart;
