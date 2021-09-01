const router = require("express").Router();
const Post = require("../models/Post.js");

//Create new post
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savePost = await newPost.save();
    res.status(200).json(savePost);
  } catch (e) {
    res.status(500).json(e);
  }
});

//Update post
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (e) {
        res.status(401).json(e);
      }
    } else {
      res.status(401).json("You can updated only your post!");
    }
  } catch (e) {
    res.status(401).json(e);
  }
});

//Delete Update
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await post.delete();
        res.status(200).json("post deleted");
      } catch (e) {
        res.status(401).json(e);
      }
    } else {
      res.status(401).json("You can delete only your post!");
    }
  } catch (e) {
    res.status(401).json(e);
  }
});

//Get post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (e) {
    res.status(500).json(e);
  }
});

//get All post
router.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;

  try {
    let posts;
    if (username) {
      posts = await Post.find({ username });
    } else if (catName) {
      posts = await Post.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      posts = await Post.find();
    }
    res.status(200).json(posts);
  } catch (e) {
    res.status(500).json(e);
  }
});

module.exports = router;
