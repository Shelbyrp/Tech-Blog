const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
      attributes: ["id", "title", "created_at", "post_content"],
      include: [
        {
          model: Comment,
          attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
          include: {
            model: User,
            attributes: ["username"]
          },
        },
        {
          model: User,
          attributes: ["username"]
        },
      ],
    })
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render("dashboard", { posts, loggedIn: true });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.get("/edit/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ["id", "title", "created_at", "post_content"],
      include: [
        {
          model: Comment,
          attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
          include: {
            model: User,
            attributes: ["username"]
          },
        },
        {
          model: User,
          attributes: ["username"]
        },
      ],
    })
    if (!postData) {
      res.status(404).json({ message: "No post found with this id" });
      return;
    }
    const post = postData.get({ plain: true });
    res.render("edit-post", {
      post,
      loggedIn: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.get("/create/", withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
      attributes: ["id", "title", "created_at", "post_content"],
      include: [
        {
          model: Comment,
          attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
          include: {
            model: User,
            attributes: ["username"]
          },
        },
        {
          model: User,
          attributes: ["username"]
        },
      ],
    })
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render("create-post", { posts, loggedIn: true });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.get("/edit-comment/:id", withAuth, async (req, res) => {
  try {
    const commentData = await Comment.findOne({
      where: {
        id: req.params.id,
      },
    })
    if (!commentData) {
      res.status(404).json({ message: "No comment found with this id" });
      return;
    }
    console.log("comment data", commentData)
    const comment_text = commentData.get({ plain: true });
    console.log("comment_text", comment_text)
    res.render("edit-comment", {
      id: req.params.id,
      comment_text: comment_text,
      saved: req.query.saved
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
