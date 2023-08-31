const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    required: true,
  },
  watches: {
    type: Number,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  user_name: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Blog", blogSchema);
