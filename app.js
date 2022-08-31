// App Conterol Panel
// requires
const express = require("express");
const mongoose = require("mongoose");
const livereload = require("livereload");
const connectLivereload = require("connect-livereload");
const path = require("path");

// express sittings
const app = express();
const port = 8080;
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.static("public/images"));
app.use(
  express.urlencoded({
    extended: true,
  })
);

// for auto refresh in localhost
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, "public"));
app.use(connectLivereload());
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});
/*
// DATABASE
const dbname = "Personal"; // Databse Name
const db = `mongodb+srv://mark:marco@marcodb.awz9vmu.mongodb.net/${dbname}?retryWrites=true&w=majority`; // Database link
mongoose
  .connect(db)
  .then((result) => {
    console.log(`DataBase Connected to : ${dbname}`);
  })
  .catch((err) => {
    console.log(err);
  });
  */

// App Pages
// Home
app.get("/", (req, res) => {
  res.render("index", {
    mytitle: "Mark Maher"
  });
});

// 404
app.use((req, res) => {
  res.status(404).render("404", {
    mytitle: "404 page not found",
  });
});

// app Starter
app.listen(port, () => {
  console.log(
    `Example app listening on port ${port} \nLink : http://localhost:${port}`
  );
});
