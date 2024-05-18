import React, { useState } from "react";
import axios from "axios";

function FilterPanel() {
  const [filters, setFilters] = useState({
    end_year: "",
    topic: "",
    sector: "",
    region: "",
    pestle: "",
    source: "",
    swot: "",
    country: "",
    limit: 10, // Default limit
  });

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/data", { params: filters });
      console.log(response.data); // Handle the fetched data here, e.g., set it to state for rendering
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  return (
    <div>
      <h3>Filters</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>End Year:</label>
          <input
            name="end_year"
            value={filters.end_year}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Topic:</label>
          <input name="topic" value={filters.topic} onChange={handleChange} />
        </div>
        <div>
          <label>Sector:</label>
          <input name="sector" value={filters.sector} onChange={handleChange} />
        </div>
        <div>
          <label>Region:</label>
          <input name="region" value={filters.region} onChange={handleChange} />
        </div>
        <div>
          <label>PEST:</label>
          <input name="pestle" value={filters.pestle} onChange={handleChange} />
        </div>
        <div>
          <label>Source:</label>
          <input name="source" value={filters.source} onChange={handleChange} />
        </div>
        <div>
          <label>SWOT:</label>
          <input name="swot" value={filters.swot} onChange={handleChange} />
        </div>
        <div>
          <label>Country:</label>
          <input
            name="country"
            value={filters.country}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Limit:</label>
          <input
            type="number"
            name="limit"
            value={filters.limit}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Apply Filters</button>
      </form>
    </div>
  );
}

export default FilterPanel;
