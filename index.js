const express = require("express");
const fileUpload = require("express-fileupload");
const WordExtractor = require("word-extractor");

const extractor = new WordExtractor();
var app = express();
app.use(fileUpload());
app.use(express.static("public"));

async function extract(fileBuffer) {
  const extracted = await extractor.extract(fileBuffer);

  return extracted.getBody();
}

// main();

app.post("/upload", function (req, res) {
  extract(req.files.file.data).then((data) => {
    console.log(data);
    res.status(200).send({ content: data });
  });
});

app.listen(8080, function () {
  console.log("Server is running on port 8080");
});
