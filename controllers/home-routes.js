const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      attributes: [
        'id',
        'title',
        'created_at',
        'post_content'
      ],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username', 'twitter', 'github']
          }
        },
        {
          model: User,
          attributes: ['username', 'twitter', 'github']
        }
      ]
    });
    const posts = postData.map(post => post.get({ plain: true }));
    res.render('homepage', {
        posts,
        loggedIn: req.session.loggedIn
      });
  } catch (error) {
    console.log(err);
    res.status(500).json(err);
  }
  });

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
    res.render('login');
  });

  router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
    res.render('signup');
  });

  router.get('/post/:id', async (req, res) => {
    try {
      const postData = await  Post.findOne({
        where: {
          id: req.params.id
        },
        attributes: [
          'id',
          'title',
          'created_at',
          'post_content'
        ],
        include: [
          {
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            include: {
              model: User,
              attributes: ['username', 'twitter', 'github']
            }
          },
          {
            model: User,
            attributes: ['username', 'twitter', 'github']
          }
        ]
      });
      if (!postData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      const post = postData.get({ plain: true });
      res.render('single-post', {
        post,
        loggedIn: req.session.loggedIn
      });
    } catch (error) {
      console.log(err);
      res.status(500).json(err);
    }
});

module.exports = router;