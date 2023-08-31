const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
//Blog model
const Blog = require("../model/Blog");

exports.getController = (req, res) => {
  Blog.find()
    .then((blog) => res.json({ blog }))
    .catch((err) => res.status(404).json({ noblogfound: "No blog found!" }));
};
exports.addController = (req, res) => {
  const { title, content, likes, watches, user_id, user_name, url } = req.body;

  const newBlog = new Blog({
    url: url,
    title: title,
    content: content,
    likes: likes,
    watches: watches,
    user_id: user_id,
    user_name: user_name,
  });
  newBlog.save().then((blog) => res.json(blog));
};

exports.updateController = (req, res) => {
  const { id } = req.params;
  // const { watches } = req.body;
  console.log(req.body);
  Blog.updateOne({ _id: id }, { $inc: { watches: 1 } })
    .then((result) => {
      console.log({ result });
      if (result.matchedCount > 0) {
        res.status(201).json({ message: "Successfully updated!" });
      } else {
        res.status(404).json({ message: "Blog not found!" });
      }
    })
    .catch((error) => {
      console.log(error);
      res
        .status(500)
        .json({ message: "Failed to update blog post!", error: error });
    });
};
exports.updateController1 = (req, res) => {
  const { id } = req.params;
  // const { watches } = req.body;
  console.log(req.body);
  Blog.updateOne({ _id: id }, { $set: req.body })
    .then((blog) => res.json(req.body))
    .catch((error) => {
      console.log(error);
      res
        .status(500)
        .json({ message: "Failed to update blog post!", error: error });
    });
};
exports.getItemController = (req, res) => {
  Blog.findById(req.params.id)
    .then((blog) => res.json(blog))
    .catch((err) => res.status(404).json({ noblogfound: "No blog found!" }));
};
