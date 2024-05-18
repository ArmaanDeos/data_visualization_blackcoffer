import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const LikelyHood = ({ data }) => {
  const container = useRef(null);

  useEffect(() => {
    // Extract the letters and likelihood values
    const processedData = data.map((d) => ({
      letter: d._id.slice(-3), // Extract the last three characters of _id
      likelihood: d.likelihood,
    }));
    console.log(processedData);

    const width = 1200;
    const height = 500;
    const marginTop = 30;
    const marginRight = 0;
    const marginBottom = 50; // Increased to make space for X-axis label
    const marginLeft = 40;

    const x = d3
      .scaleBand()
      .domain(processedData.map((d) => d.letter))
      .range([marginLeft, width - marginRight])
      .padding(0.05); // Reduced padding to increase bar width

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(processedData, (d) => d.likelihood)])
      .nice()
      .range([height - marginBottom, marginTop]);

    const svg = d3
      .select(container.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto;");

    svg
      .append("g")
      .attr("fill", "steelblue")
      .selectAll("rect")
      .data(processedData)
      .join("rect")
      .attr("x", (d) => x(d.letter))
      .attr("y", (d) => y(d.likelihood))
      .attr("height", (d) => height - marginBottom - y(d.likelihood))
      .attr("width", x.bandwidth());

    svg
      .append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(d3.axisBottom(x).tickSizeOuter(0))
      .call(
        (g) => g.selectAll("text").style("font-size", "10px") // Adjust font size for X-axis labels
      )
      .call(
        (g) =>
          g
            .append("text")
            .attr("x", width / 2)
            .attr("y", marginBottom - 10)
            .attr("fill", "currentColor")
            .attr("text-anchor", "middle")
            .text("ID") // Label for X-axis
      );

    svg
      .append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(
        d3
          .axisLeft(y)
          .ticks(d3.max(processedData, (d) => d.likelihood))
          .tickFormat(d3.format("d"))
      )
      .call((g) => g.select(".domain").remove())
      .call((g) =>
        g
          .append("text")
          .attr("x", -marginLeft)
          .attr("y", 10)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .text("↑ Likelihood")
      );

    return () => {
      svg.remove();
    };
  }, [data]);

  return <div ref={container}></div>;
};

export default LikelyHood;
