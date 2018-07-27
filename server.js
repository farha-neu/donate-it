const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
var session = require("express-session");
var cookies = require("cookie-parser");

const PORT = process.env.PORT || 3001;
const app = express();
const mongoose= require("mongoose");

// Define middleware here
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookies());
app.use(session({
  secret: "whateverwewant",
  resave: false,
  saveUninitialized: true,
  cookie: {secure: "auto", maxAge: 999999}
}));

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Define API routes here
<<<<<<< HEAD
const router=require("./router/api.js");
app.use(router);

=======
const routes = require("./routes/api.js");
app.use(routes);
>>>>>>> 56b37ae2d4061b7bb7d874eec19cd84b45c335ae

// Send every other request to the React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

<<<<<<< HEAD


=======
>>>>>>> 56b37ae2d4061b7bb7d874eec19cd84b45c335ae
// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/donateit");

app.listen(PORT, () => {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
