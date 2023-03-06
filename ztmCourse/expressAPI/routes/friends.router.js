const express = require("express");

const friendsController = require("../controllers/friends.controller");

const friendsRouter = express.Router();

friendsRouter.post("/", friendsController.postFriend);
friendsRouter.get("/:friendId", friendsController.getFriend);
friendsRouter.get("/", friendsController.getFriends);

module.exports = friendsRouter;
