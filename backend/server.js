const express = require("express");
const app = express();

// Database config
const connection = require("./config/db.config");
connection.once("open", () => console.log("DB Connected"));
connection.on("error", () => console.log("Error"));

// Routes Config
app.use(
  express.json({
    extended: false,
  })
); //parse incoming request body in JSON format.

// Add headers
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

app.use("/", require("./routes/redirect"));
app.use("/api/url", require("./routes/url"));
app.use("/api/url", require("./routes/return"));

//Listen for incoming requests
const PORT = process.env.PORT || 4000;
app.listen(PORT, console.log(`server started, listening PORT ${PORT}`));
