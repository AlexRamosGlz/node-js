const express = require("express");
const path = require("path");

const friendsRouter = require("./routes/friends.router");
const messageRouter = require("./routes/messages.router");

const app = express();
const PORT = process.env.PORT || 3000;

app.use("/site", express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use("/friends", friendsRouter);
app.use("/message", messageRouter);

app.listen(PORT, () => {
  console.log(`Server is running in port ${PORT}`);
});
