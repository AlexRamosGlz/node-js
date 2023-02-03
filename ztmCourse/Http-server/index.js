const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/friend") {
    res.writeHead(200, {
      "Content-type": "application/json",
    });

    res.end(
      JSON.stringify({
        name: "Alex",
        friend: 1,
      })
    );
  }
  if (req.url === "/message") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });
    res.write("<html>");
    res.write("<body>");
    res.write("<h1>Hello Friend</h1>");
    res.write("</body>");
    res.write("</html>");
    res.end();
  } else {
    res.statusCode = 404;
    res.end();
  }
});

server.listen(3000, () => {
  console.log(`serving in port ${3000}`);
});
