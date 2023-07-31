const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");
dotenv.config({ path: "./config.env" });

const DB = process.env.MONGOURI;

mongoose
  .connect(DB, {
    dbName: process.env.DBNAME,
  })
  .then((res) => {
    console.log("DB Connected");
  })
  .catch((err) => console.log("error", err));

const PORT = process.env.PORT || 8282;

const server = app.listen(PORT, () => {
  console.log(`Server is running on "${PORT}" port`);
});
