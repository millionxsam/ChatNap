const express = require("express");
const router = express.Router();

const uri = process.env["db_uri"];
const { QuickDB, MongoDriver } = require("quick.db");

(async () => {
  const driver = new MongoDriver(uri);
  await driver.connect();
  const db = new QuickDB({ driver });

  router.get("/get/:id", async (req, res) => {
    const id = req.params.id;
    res.send(await db.get(id));
  });

  router.get("/del/:id", async (req, res) => {
    const id = req.params.id;
    res.send(await db.delete(id));
  });

  router.get("/set/:id/:value", async (req, res) => {
    const id = req.params.id;
    const value = req.params.value;
    res.send(await db.set(id, value));
  });

  router.get("/all", async (req, res) => {
    res.send(await db.all());
  });
})();

module.exports = router;
