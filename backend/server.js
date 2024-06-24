const express = require("express");
const userRoutes = require("./routes/user.routes");
const bookRoutes = require("./routes/book.routes");
require("dotenv").config({ path: "./config/.env" });
require("./config/db");
const app = express();
const path = require("path");

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// routes
app.use("/api/auth", userRoutes);
app.use("/api/books", bookRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));

// server
app.listen(process.env.PORT, () => {
  console.log("Listening on port " + process.env.PORT);
});
