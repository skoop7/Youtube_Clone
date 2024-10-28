const express = require("express");
const dotenv = require("dotenv");
const ConnectDB = require("./Db");
const app = express();

dotenv.config({
  path: "./.env",
});

app.use(express.json());

const PORT = process.env.PORT;

ConnectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT} 🚀🚀🚀`);
    });
  })
  .catch((error) => {
    console.log("Mongo Connection Failed !!! 😭😭😭", error);
  });
