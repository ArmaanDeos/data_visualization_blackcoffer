import Insight from "../models/insight.models.js";

export const getAllInsightData = async (req, res) => {
  try {
    const { end_year, limit, topic, sector, region, pestle, source, country } =
      req.query;
    let query = {};

    if (end_year) {
      query = { ...query, end_year: end_year };
    }
    if (topic) {
      query.topic = { $regex: new RegExp(topic, "i") };
    }
    if (sector) {
      query.sector = { $regex: new RegExp(sector, "i") };
    }

    if (region) {
      query.region = { $regex: new RegExp(region, "i") };
    }
    if (pestle) {
      query.pestle = { $regex: new RegExp(pestle, "i") };
    }

    if (source) {
      query.source = { $regex: new RegExp(source, "i") };
    }

    if (country) {
      query.country = { $regex: new RegExp(country, "i") };
    }

    const data = await Insight.find(query).limit(parseInt(limit, 10) || 30);

    if (!data || data.length === 0) {
      throw new Error("No data found");
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
