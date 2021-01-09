const express = require("express");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useFindAndModify: false,
  useCreateIndex: true
});

const connection = mongoose.connection;

// if successful mongoose connection
connection.on("connected", () => {
  console.log("Mongoose connected successfully.");
});

// if unsuccessful mongoose connection
connection.on("error", (err) => {
  console.log("Mongoose connected error:" + err);
});

// routes
// app.use(require("./routes/api.js"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});