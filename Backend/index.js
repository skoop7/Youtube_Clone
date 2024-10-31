const express = require("express");
const dotenv = require("dotenv");
const ConnectDB = require("./Db");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth.routes");
const app = express();

dotenv.config({
  path: "./.env",
});

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1", authRouter);

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
