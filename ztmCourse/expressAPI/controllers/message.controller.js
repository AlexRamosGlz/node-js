const path = require("path");

function getMessage(req, res) {
  res.sendFile(path.join(__dirname, "..", "public", "photo.jpg"));

  //   res.send(
  //     `<ul>
  //       <li>Hello friend</li>
  //     </ul>`
  //   );
}

function postMessage(req, res) {
  console.log(req);
}

module.exports = {
  getMessage,
  postMessage,
};
