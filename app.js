const express = require("express");
const app = express();
const router = require("./routes/route");

app.set("view engine", "ejs"); // ejs engine

app.get("/", function(req, res) {
  res.send("Main Page");
});

app.use("/api", router);

const port = 3000;
app.listen(port, function(req, res) {
  console.log(`Listening on port ${port}...`);
});
