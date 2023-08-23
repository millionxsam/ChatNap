(async () => {
  require("dotenv").config();

  const express = require("express");
  const app = express();
  const port = 3000;

  const dbRouter = require("./database.js");
  const { v4: uuidv4 } = require("uuid");

  app.set("view engine", "html");
  app.set("views", "public");
  app.engine("html", require("ejs").renderFile);
  app.use(express.static("public"));

  app.get("/", (req, res) => {
    res.render("index.html");
  });

  ["chats", "following", "login", "signup"].forEach((path) => {
    app.get(`/${path}`, (req, res) => {
      res.render(`${path}.html`);
    });
  });

  app.use("/db", dbRouter);

  app.get("/uuid", (req, res) => {
    let id = uuidv4();
    res.send(`${id}`);
  });

  app.get("/settings", (req, res) => {
    res.render(`settings.html`);
  });

  app.get("/post/:id", (req, res) => {
    res.render("post.html");
  });

  app.get("/@:id", (req, res) => {
    res.render("profile.html");
  });

  app.listen(port, () => console.log(`👂 Server listening on port ${port}`));
})();
