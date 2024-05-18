import React, { useEffect, useState } from "react";
import axios from "axios";
import IntensityChart from "./components/IntensityChart";
import LikelyHood from "./components/LikelyHood";
import RegionChart from "./components/RegionChart";
import CountryChart from "./components/CountryChart";
import TopicChart from "./components/TopicChart";
import RelevenceChart from "./components/RelevenceChart";
import YearChart from "./components/YearChart";
import "./App.css";

const App = () => {
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(30);
  const [endYear, setEndYear] = useState("");
  const [topic, setTopic] = useState("");
  const [sector, setSector] = useState("");
  const [region, setRegion] = useState("");
  const [pestle, setPestle] = useState("");
  const [source, setSource] = useState("");
  const [country, setCountry] = useState("");

  const [filters, setFilters] = useState({
    end_year: "",
    limit: 10,
    topic: "",
    sector: "",
    region: "",
    pestle: "",
    source: "",
    country: "",
  });

  useEffect(() => {
    const getDataFromApi = async () => {
      try {
        const res = await axios.get(`http://localhost:1700/api/v1/insight`, {
          params: {
            end_year: filters.end_year,
            limit: filters.limit,
            topic: filters.topic,
            sector: filters.sector,
            region: filters.region,
            pestle: filters.pestle,
            source: filters.source,
            country: filters.country,
          },
        });
        const data = res.data;
        setData(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    getDataFromApi();
  }, [filters]);

  const handleLimitChange = (e) => {
    setLimit(e.target.value);
    setFilters({ ...filters, limit: e.target.value });
  };

  const handleEndYearChange = (e) => {
    setEndYear(e.target.value);
    setFilters({ ...filters, end_year: e.target.value });
  };

  const handleTopicChange = (e) => {
    const newTopic = e.target.value;
    setTopic(newTopic);
    setFilters((prevFilters) => ({ ...prevFilters, topic: newTopic }));
  };

  const handleSectorChange = (e) => {
    const newSector = e.target.value;
    setSector(newSector);
    setFilters((prevFilters) => ({ ...prevFilters, sector: newSector }));
  };

  const handlePestleChange = (e) => {
    const newPestle = e.target.value;
    setPestle(newPestle);
    setFilters((prevFilters) => ({ ...prevFilters, pestle: newPestle }));
  };

  const handleRegionChange = (e) => {
    const newRegion = e.target.value;
    setRegion(newRegion);
    setFilters((prevFilters) => ({ ...prevFilters, region: newRegion }));
  };

  const handleSourceChange = (e) => {
    const newSource = e.target.value;
    setSource(newSource);
    setFilters((prevFilters) => ({ ...prevFilters, source: newSource }));
  };
  const handleCountryChange = (e) => {
    const newCountry = e.target.value;
    setCountry(newCountry);
    setFilters((prevFilters) => ({ ...prevFilters, country: newCountry }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="main">
      <div className="main_container">
        <h1>Data Visualization Dashboard</h1>
        <h2>Filters :</h2>
        <div className="container_box">
          <form onSubmit={handleSubmit} className="filter_form">
            <label>
              Limit:
              <input type="number" value={limit} onChange={handleLimitChange} />
            </label>
            <label>
              End_Year:
              <input
                type="number"
                value={endYear}
                onChange={handleEndYearChange}
              />
            </label>
            <label>
              Topic:
              <input
                type="text"
                value={topic}
                onChange={handleTopicChange}
                placeholder="battery,gas,oil,growth etc"
              />
            </label>
            <label>
              Sector:
              <input
                type="text"
                value={sector}
                onChange={handleSectorChange}
                placeholder="energy,financial services etc."
              />
            </label>
            <label>
              Region:
              <input
                type="text"
                value={region}
                onChange={handleRegionChange}
                placeholder="world,Southern Africa,Southern Asia,Northern America etc"
              />
            </label>
            <label>
              PEST:
              <input
                type="text"
                value={pestle}
                onChange={handlePestleChange}
                placeholder="Economic,Industries etc"
              />
            </label>
            <label>
              Source:
              <input
                type="text"
                value={source}
                onChange={handleSourceChange}
                placeholder="Vanguard News,TRAC News,EV Obsession,creamermedia etc"
              />
            </label>
            <label>
              Country:
              <input
                type="text"
                value={country}
                onChange={handleCountryChange}
                placeholder="Ind,Nig,America,South Africa etc"
              />
            </label>

            <button type="submit">Fetch Insights</button>
          </form>
        </div>
        <h2>Intensity Data :</h2>
        <div className="container_box">
          <IntensityChart data={data} />
        </div>
        <h2>Likelyhood Data :</h2>
        <div className="container_box">
          <LikelyHood data={data} />
        </div>
        <h2>Region Data :</h2>
        <div className="container_box">
          <RegionChart data={data} width={1000} />
        </div>
        <h2>Country Data :</h2>
        <div className="container_box">
          <CountryChart data={data} width={1000} />
        </div>
        <h2>Topic Data :</h2>
        <div className="container_box">
          <TopicChart data={data} />
        </div>
        <h2>Relevence Data :</h2>

        <div className="container_box">
          <RelevenceChart data={data} />
        </div>
        <h2>Year Data :</h2>
        <div className="container_box">
          <YearChart data={data} />
        </div>
      </div>
    </div>
  );
};

export default App;
