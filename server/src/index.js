const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const router = require("./routes/router.js");

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
app.use(router);

const uri = process.env.MONGO_URI;
console.log(uri);
mongoose
  .connect(uri)
  .then(() => {
    app.listen(8000, () => {
      console.log("Server runnning on port 8000");
    });
  })
  .catch((err) => console.log(err));
