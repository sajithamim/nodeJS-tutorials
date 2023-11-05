const fs = require("fs");
const express = require("express");
const app = express();
const postData = require("./data/posts.json");
const { createFile, createFolder } = require("./utils");

app.use(express.json());
// create Folder
// createFolder("public/css");

// create File
// createFile("data/posts.json");

// Fetch all Data
app.get("/posts", function (req, res) {
  res.json({ message: "Fetched succesfully", postData });
});

// Fetch single data
app.get("/posts/:id", function (req, res) {
  // get id
  const id = req.params.id;
  const postFound = postData.find(item => {
    return item.id === id;
  });
  if (!postFound) {
    res.json({ message: "No Data Found" });
  } else {
    res.json({ postFound: postFound });
  }
});

// create post
app.post("/posts", function (req, res) {
  const newPost = req.body;

  if (postData === undefined) {
    postData = [];
  }

  postData.push({
    ...newPost,
    id: postData.length.toString(),
    title: "Sample",
    url: "https://url.com",
    desc: "Some text here",
  });

  fs.writeFile("data/posts.json", JSON.stringify(postData), function (err) {
    if (err) {
      console.log(err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      console.log("Data has been written to posts.json");
      res.json({ message: "Posted" });
    }
  });
});

// delete Post
app.delete("/posts/:id", function (req, res) {
  // get id
  const id = req.params.id;
  const filteredPost = postData.filter(function (post) {
    return post.id !== id;
  });
  fs.writeFile(
    "data/posts.json",
    JSON.stringify(filteredPost),
    function (req, res) {
      if (err) {
        console.log(err);
      } else {
        res.json({ message: "Post Deleted Successfully" });
      }
    }
  );
});

// Update pot
app.put("/posts/:id", function (req, res) {
  // get id
  const id = req.params.id;
  console.log("req", req.body);
  const { url, title, desc } = req.body;

  const foundPost = postData.find(item => {
    return item.id === id;
  });
  if (!foundPost) {
    return res.json({ message: "Post not found" });
  }
  const filteredPost = postData.filter(post => post.id !== id);
  foundPost.title = title;
  foundPost.desc = desc;
  foundPost.url = url;
  filteredPost.unshift(foundPost);

  fs.writeFile(
    "data/posts.json",
    JSON.stringify(filteredPost),
    function (req, res) {
      if (err) {
        console.log(err);
      } else {
        res.json({ message: "Post Updtaed Successfully" });
      }
    }
  );
});
app.listen(8000, function () {
  console.log("server is up and running");
});
