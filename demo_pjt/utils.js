const fs = require("fs");

const createFolder = foldername => {
  // check if folder exists
  if (!fs.existsSync(foldername)) {
    // create Folder
    fs.mkdirSync(foldername);
  }
};

const defaultPost = `[
  { "id": "1", "title": "Sample", "url": "https://url.com", "desc": "Some text here" }
]`;
const createFile = file => {
  // check if file exist
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, defaultPost);
  }
};

module.exports = {
  createFile,
  createFolder,
};
