const express = require("express");

const app = express();
app.use(express.json()); // for parsing application/json

console.log("booting server...");

// when there's a post request to /webooks...
app.post("/webhooks", function(req, res) {
  // respond with 200 OK
  console.log(req.body);
  res.send("OK");
});

app.listen(3000, function() {
  console.log("Listening for webhooks on port 3000");
});
