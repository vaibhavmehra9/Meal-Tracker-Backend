const express = require("express");
const appRoutes = require("./routes");
const app = express();
const db = require("./config/db");
const cors = require("cors");
const morgan = require("morgan");

// middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/", appRoutes);

app.all("*", (req, res) => {
  res.status(404).json({ status: "fail", message: "No route found" });
});

app.listen(8080, (err) => {
  if (err) {
    console.log(`Error while starting server: ${err}`);
  }
  console.log(`Server is up and running`);
});
