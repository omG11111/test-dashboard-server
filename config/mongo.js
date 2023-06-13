const mongoose = require("mongoose");
const DB_URL = process.env.MONGO_URI;

const loadModels = require("../app/models");

module.exports = () => {
  const connect = () => {
    mongoose.Promise = global.Promise;
    mongoose.connect(
      DB_URL,
      {
        keepAlive: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        writeConcern: {
          w: 'majority'
        }
      },
      (err) => {
        let dbStatus = "";
        if (err) {
          dbStatus = `* Error connecting to DB: ${err}\n****************************\n`;
        }
        dbStatus = `*    DB Connection: OK\n****************************\n`;

        console.log(`*    Port: ${process.env.PORT || 3000}`);
      }
    );
  };
  mongoose.set("strictQuery", false);
  connect();
  mongoose.connection.on("error", console.log);
  mongoose.connection.on("disconnected", connect);

  loadModels();
};
