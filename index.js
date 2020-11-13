const express = require("express");
const appRoutes = require("./routes");
const app = express();

// middlewares

app.use(express.json());

app.use("/", appRoutes);

app.listen(8080, (err) => {
  if (err) {
    console.log(`Error while starting server: ${err}`);
  }
  console.log(`Server is up and running`);
});
