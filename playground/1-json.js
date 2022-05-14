const fs = require("fs");

// const book = {
//   title: "ego is the enemy",
//   author: "Ryan Holiday",
// };

// const bookJSON = JSON.stringify(book);
// const parsedData = JSON.parse(bookJSON);
// fs.writeFileSync("1-json.json", bookJSON);

const dataBuffer = fs.readFileSync("1-json.json");
const datajson = dataBuffer.toString();
const data = JSON.parse(datajson);
console.log(dataBuffer.toString());
