const express = require("express");
const router = express.Router(); 

const staticController = require("../controllers/staticController");

app.use("/", (req, res, next) => {
    res.send("Welcome to Bloccit")
  });

module.exports = router;