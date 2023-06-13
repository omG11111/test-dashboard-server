require("dotenv").config();
const port = process.env.SERVER_PORT;
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const initMongo = require("./config/mongo");

const app = express();
app.use(cors());
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(require("./app/routes/index"));

app.listen(port, () => {
  console.log("done connect");
  console.log("http://localhost:" + port);
});
initMongo();
module.exports = app;