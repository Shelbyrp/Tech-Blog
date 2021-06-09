const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// GET /api/users
router.get('/', async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ['password'] }
    })
    res.status(200).json(userData);
  } catch (error) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET /api/users/1
router.get('/:id', async (req, res) => {
  try {
    const userData = await User.findOne({
      attributes: { exclude: ['password'] },
      where: {
        id: req.params.id
      },
      include: [
        {
          model: Post,
          attributes: ['id', 'title', 'post_content', 'created_at']
        },
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'created_at'],
          include: {
            model: Post,
            attributes: ['title']
          }
        }
      ]
    });
    if (!userData) {
      res.status(404).json({ message: 'There is no user with this id' });
      return;
    }
    res.json(userData);
  } catch (error) {
    console.log(err);
    res.status(500).json(err);
  }
});

// POST /api/users
router.post('/', async (req, res) => {
  try {
    const user_id = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    res.status(200).json({ message: "You have signed up." })
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({
      where: {
        email: req.body.email
      }
    })
    if (!userData) {
      res.status(400).json({ message: 'There is no user with that email address.' });
      return;
    }
    const validPassword = userData.checkPassword(req.body.password);
    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect password. Please enter your password.' });
      return;
    }
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.loggedIn = true;
      res.json({ user: userData, message: 'Success! You are now logged in.' });
    })
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.post('/logout', async (req, res) => {
  try {
    if (await req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    }
    else {
      res.status(404).end();
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  try {
    const userData = await User.update(req.body, {
      individualHooks: true,
      where: {
        id: req.params.id
      }
    });
    if (!userData[0]) {
      res.status(404).json({ message: 'There is no user found with this id' });
      return;
    }
    res.json(userData);
  } catch (error) {
    console.log(err);
    res.status(500).json(err);
  }
});

// DELETE /api/users/1
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const userData = await User.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!userData) {
      res.status(404).json({ message: 'There is no user found with this id' });
      return;
    }
    res.json(userData);
  } catch (error) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;