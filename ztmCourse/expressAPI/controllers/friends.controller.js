const friendsModel = require("../model/friends.model");

function getFriend(req, res) {
  debugger;
  const friendId = Number(req.params.friendId);

  const friend = friendsModel[friendId];

  if (!friend) res.status(404).json({ error: "no friend found" });

  res.status(200).json(friend);
}

function getFriends(req, res) {
  res.status(200).json(friendsModel);
}

function postFriend(req, res) {
  console.log(req);
  const data = req.body.name;

  if (!data) {
    return res.status(400).json({ error: "invalid values" });
  }

  const newFriend = {
    name: data,
    id: friendsModel.length,
  };

  friendsModel.push(newFriend);

  res.json(newFriend);
}

module.exports = {
  getFriend,
  getFriends,
  postFriend,
};
