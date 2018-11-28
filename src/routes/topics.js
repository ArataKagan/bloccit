const express = require("express");
const router = express.Router();

const topicController = require("../controllers/topicController")
const validation = require("./validation");

//if the topics route is selected, return index function from controller
router.get("/topics", topicController.index);

//if the topics/new route is selected, return new function from controller
router.get("/topics/new", topicController.new);

router.post("/topics/create", validation.validateTopics, topicController.create);

router.get("/topics/:id", topicController.show);

router.post("/topics/:id/destroy", topicController.destroy);

router.get("/topics/:id/edit", topicController.edit);

router.post("/topics/:id/update", validation.validateTopics, topicController.update);


module.exports = router;