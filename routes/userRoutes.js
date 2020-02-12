const { Router } = require('express');
const { validationResult, check } = require('express-validator');

const User = require('../models/User');
// const authenticate = require('../middleware/authenticate');

const router = Router();

// @route - POST /user/signup
// @desc - Registers a user
// @access - Public
router.post(
  '/signup',
  check('email', 'Email is required')
    .not()
    .isEmpty(),
  check('email', 'Email is invalid').isEmail(),
  check('name', 'Name is required')
    .not()
    .isEmpty(),
  check('password', 'Password is required')
    .not()
    .isEmpty(),
  check('password', 'Password should be minimum 8 characters').isLength({
    min: 8
  }),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res
          .status(400)
          .send({ statusCode: 400, message: errors.array() });
      const { email, name, password } = req.body;
      let user = await User.findOne({ email });
      if (user)
        return res
          .status(400)
          .send({ statusCode: 400, message: 'User already exists' });
      else user = await User.create({ email, name, password });
      const accessToken = `Bearer ${await user.getAccessToken()}`;
      return res
        .status(201)
        .send({ statusCode: 201, user: user, accessToken, expiresIn: '24h' });
    } catch (err) {
      return res.status(500).json({ statusCode: 500, message: 'Server Error' });
    }
  }
);

// @route - POST /user/login
// @desc - Login a user
// @access - Public
router.post(
  '/login',
  check('email', 'Email is required')
    .not()
    .isEmpty(),
  check('password', 'Password is required')
    .not()
    .isEmpty(),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res
          .status(400)
          .send({ statusCode: 400, message: errors.array() });
      const { email, password } = req.body;
      const user = await User.findByEmailAndPassword(email, password);
      if (!user)
        return res
          .status(401)
          .send({ statusCode: 401, message: 'Invalid credentials' });
      const accessToken = `Bearer ${await user.getAccessToken()}`;
      return res.send({
        statusCode: 200,
        user,
        accessToken,
        expiresIn: '24h'
      });
    } catch (err) {
      return res.status(500).send({ statusCode: 500, message: 'Server Error' });
    }
  }
);

// @route - DELETE /user/logout
// @desc - Log out user.
// @access - Private (Auth)
router.delete('/logout', authenticate, async (req, res) => {
  const accessToken = req.accessToken.replace('Bearer ', '');
  try {
    const user = await User.findOne({ accessToken });
    if (!user)
      return res
        .status(400)
        .send({ statusCode: 400, message: 'Invalid request' });
    user.accessToken = null;
    await user.save();
    return res
      .status(202)
      .send({ statusCode: 202, message: 'User Logged out successfully' });
  } catch (err) {
    return res.status(500).send({ statusCode: 500, message: 'Server Error' });
  }
});

export default router;