const express = require("express");
const app = express();
const port = 3000;

app.set("view engine", "html");
app.set("views", "public");
app.engine("html", require("ejs").renderFile);
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.html");
});

app.get("/chats", (req, res) => {
  res.render("chats.html");
});

app.get("/following", (req, res) => {
  res.render("following.html");
});

app.listen(port, () => console.log(`✅ Server listening on port ${port}`));
