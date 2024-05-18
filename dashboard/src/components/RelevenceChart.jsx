import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const RelevenceChart = ({ data }) => {
  const ref = useRef();

  useEffect(() => {
    // Declare the chart dimensions and margins.
    const width = 1200;
    const height = 500;
    const marginTop = 40; // Adjusted marginTop
    const marginRight = 50; // Adjusted marginRight
    const marginBottom = 50; // Adjusted marginBottom
    const marginLeft = 60; // Adjusted marginLeft

    // Find the maximum relevance in the data
    const maxRelevance = d3.max(data, (d) => d.relevance);

    // Declare the y (vertical position) scale.
    const y = d3
      .scaleLinear()
      .domain([0, Math.ceil(maxRelevance / 10) * 10])
      .nice()
      .range([height - marginBottom, marginTop]);

    // Declare the line generator.
    // Declare the line generator.
    const line = d3
      .line()
      .x(
        (_, i) =>
          marginLeft +
          (i * (width - marginRight - marginLeft)) / (data.length - 1)
      )
      .y((d) => y(d.relevance));

    // Create the SVG container.
    const svg = d3
      .select(ref.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

    svg.selectAll("*").remove(); // Clear previous render

    // Add the y-axis.
    svg
      .append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(
        d3
          .axisLeft(y)
          .ticks(maxRelevance / 10 + 5)
          .tickSizeOuter(0)
      )
      .call((g) => g.select(".domain").remove())
      .call((g) =>
        g
          .selectAll(".tick line")
          .clone()
          .attr("x2", width - marginLeft - marginRight)
          .attr("stroke-opacity", 0.1)
      )
      .call((g) =>
        g
          .append("text")
          .attr("x", -marginLeft)
          .attr("y", 10)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .text("↑ relevance")
      );

    // Add the x-axis.
    svg
      .append("g")
      .attr("transform", `translate(0, ${height - marginBottom})`)
      .call(
        d3
          .axisBottom(
            d3
              .scaleLinear()
              .domain([0, Math.ceil(data.length / 1000) * 10])
              .range([marginLeft, width - marginRight])
          )
          .ticks(Math.ceil(data.length / 100))
          .tickSizeOuter(0)
      );

    // Append a path for the line.
    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", line);
  }, [data]);

  return <svg ref={ref}></svg>;
};

export default RelevenceChart;
