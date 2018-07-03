const express = require("express");
const router = express.Router();
const validation = require("./validation");

const topicController = require("../controllers/topicController")

router.get("/topics", topicController.index);
router.get("/topics/new", topicController.new);
router.get("/topics/:id", topicController.show);
router.get("/topics/:id/edit", topicController.edit);

router.post("/topics/create", validation.validateTopics, topicController.create);
router.post("/topics/:id/update", validation.validateTopics, topicController.update);
router.post("/topics/:id/destroy", topicController.destroy);

module.exports = router;
