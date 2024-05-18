import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

const TopicChart = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous content

    const topicCounts = data.reduce((acc, item) => {
      if (item.topic) {
        acc[item.topic] = (acc[item.topic] || 0) + 1;
      }
      return acc;
    }, {});
    console.log(topicCounts);

    // Convert topicCounts to an array of objects for D3
    const chartData = Object.entries(topicCounts).map(([topic, count]) => ({
      topic,
      count,
    }));

    // Define the chart dimensions and margins
    const width = 1200;
    const height = 500;
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };

    // Create scales
    const x = d3
      .scaleBand()
      .domain(chartData.map((d) => d.topic))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(chartData, (d) => d.count)])
      .nice()
      .range([height - margin.bottom, margin.top]);

    // Append the x-axis
    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end");

    // Append the y-axis
    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));

    // Append the bars
    svg
      .selectAll(".bar")
      .data(chartData)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => x(d.topic))
      .attr("y", (d) => y(d.count))
      .attr("width", x.bandwidth())
      .attr("height", (d) => y(0) - y(d.count))
      .attr("fill", "steelblue");
  }, [data]);

  return (
    <>
      <svg ref={svgRef} width={928} height={500}></svg>
    </>
  );
};

export default TopicChart;
