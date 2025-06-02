const express = require("express");
const router = require("./routes");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const morgan = require("morgan");
const path = require("path");

const app = express();

app.use(cors("dev"));
app.use(express.json());
app.use(morgan("dev"));

app.use("/api", router);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(process.env.APP_PORT || 8080, () => {
      console.log("server listening on port " + process.env.APP_PORT);
    });
  })
  .catch((e) => {
    console.log(e, "error");
  });
