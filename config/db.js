const mongoose = require("mongoose");

mongoose.connect(`${process.env.DATABASE_URI}`, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const db = mongoose.connection;

db.on("error", (err) => {
  console.log(`Error connecting to database: ${err}`);
  process.exit(1);
});

db.once("open", () => {
  console.log("Connected to database :: MongoDb");
});

module.exports = db;
