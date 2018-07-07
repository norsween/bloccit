const express = require("express");
const router = express.Router();

const voteController = require("../controllers/voteController");

// Define routes for the upvote and downvote actions 
router.get("/topics/:topicId/posts/:postId/votes/upvote",
  voteController.upvote);

router.get("/topics/:topicId/posts/:postId/votes/downvote",
  voteController.downvote);

module.exports = router;
