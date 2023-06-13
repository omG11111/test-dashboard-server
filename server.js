require("dotenv").config();
const port = process.env.SERVER_PORT;
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const initMongo = require("./config/mongo");
const path=require('path')

const app = express();
app.use(cors({
  origin: 'https://mk-products-testsite.web.app',
  methods: 'GET,POST,PATCH',
  allowedHeaders: 'Content-Type,Authorization',}
));

app.use((req, res, next) => {
  // res.header('Access-Control-Allow-Origin', 'https://mk-products-testsite.web.app');
  // Or to allow requests from all origins:
  res.header('Access-Control-Allow-Origin', '*');

  res.header('Access-Control-Allow-Headers', 'Origin,Authorization, X-Requested-With, Content-Type, Accept');
  next();
});
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json({ type: 'application/*+json' }));
// app.use(express.static('public'))
// app.set('views', path.join(__dirname, 'views'))
// app.set('view engine', 'html')


app.engine('ejs', require('ejs').renderFile)
// app.set('view engine', 'html')
app.set('view engine', 'ejs');
app.use(require("./app/routes/index"));
app.listen(port, () => {
  console.log("done connect");
  console.log("http://localhost:" + port);
});
initMongo();
module.exports = app;
