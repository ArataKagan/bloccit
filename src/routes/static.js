const express = require("express");
const router = express.Router();

// router.get("/", (req, res, next) => {
//     //define route using use method passing a pattern and callback
//     // The callback will be fired when the request is handled 
//     res.send("Welcome to Bloccit");
// });

router.get("/marco", (req, res, next) => {
    res.send("polo");
});

module.exports = router;