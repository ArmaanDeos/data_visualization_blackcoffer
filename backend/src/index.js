import dotenv from "dotenv";
import connectDB from "./db/connection.db.js";
import { app } from "./app.js";
import { data } from "./data.js";
import Insight from "./models/insight.models.js";
// configure dotenv
dotenv.config({
  path: "./env",
});

const main = async () => {
  // connecting database
  connectDB()
    .then(() => {
      app.listen(process.env.PORT || 8080, () => {
        console.log(`Server is running at port : ${process.env.PORT}`);
      });
    })
    .catch((error) => {
      console.log("MongoDB connection FAILED !", error);
    });

  // Insert data
  // try {
  //   const dataInsertion = await Insight.insertMany(data);
  //   console.log(`Data inserted successfully : ${dataInsertion.length}`);
  // } catch (error) {
  //   console.log(`Data insertion failed : ${error}`);
  // }
};

main().catch((error) => {
  console.log(`Error in server : ${error}`);
});
