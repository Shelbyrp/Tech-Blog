const router = require('express').Router();
const { Comment, Post, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
  try {
    const commentData = await Comment.findAll({});
    res.status(200).json(commentData);
  } catch (error) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/:id', async (request, response) => {
  try {
    const CommentData = await Comment.findByPk(
      request.params.id, {
      where: {
        id: request.params.id,
      },
    });
    if (!CommentData) {
      response.status(404).json({ message: 'No comment found with that id' });
      return;
    }
    response.json(CommentData);
  } catch (err) {
    console.log(err);
    response.status(500).json(err);
  }
});

router.post('/', withAuth, (req, res) => {
  if (req.session) {
    Comment.create({
      comment_text: req.body.comment_text,
      post_id: req.body.post_id,
      user_id: req.session.user_id,
    })
      .then(commentData => res.json(commentData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  }
});

router.put('/:id', async (req, res) => {
  try {
    console.log(req.body.comment_text)
    const commentData = await Comment.update({
      comment_text: req.body.comment_text
    },
      {
        where: {
          id: req.params.id,
        },
      });
    if (!commentData) {
      res.status(404).json({ message: 'No comment found with that id!' });
      return;
    }
    res.status(200).json({ message: `Updated comment id #${req.params.id}` });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!commentData) {
      res.status(404).json({ message: 'There are no comments with this id' });
      return;
    }
    res.status(200).json(commentData);
  } catch (error) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;