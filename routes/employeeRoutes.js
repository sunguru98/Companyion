const { Router } = require('express');
const { check } = require('express-validator');
const authenticate = require('../middlewares/authenticate');
const {
  registerEmployee,
  loginEmployee,
  logoutEmployee,
  createCompany
} = require('../controllers/employeeController');

const router = Router();

// @route - POST /user/company/create
// @desc - Create a company
// @access - Private (Auth)
router.post(
  '/company/create',
  authenticate,
  check('country', 'Country is required')
    .not()
    .isEmpty(),
  check('state', 'State is required')
    .not()
    .isEmpty(),
  check('city', 'City is required')
    .not()
    .isEmpty(),
  check('address', 'Address is required')
    .not()
    .isEmpty(),
  check('name', 'Name is required')
    .not()
    .isEmpty(),
  createCompany
);

// @route - POST /user/signup
// @desc - Registers a user
// @access - Public
router.post(
  '/signup',
  check('country', 'Country is required')
    .not()
    .isEmpty(),
  check('state', 'State is required')
    .not()
    .isEmpty(),
  check('city', 'City is required')
    .not()
    .isEmpty(),
  check('address', 'Address is required')
    .not()
    .isEmpty(),
  check('name', 'Name is required')
    .not()
    .isEmpty(),
  check('email', 'Email is required')
    .not()
    .isEmpty(),
  check('email', 'Email is invalid').isEmail(),
  check('password', 'Password is required')
    .not()
    .isEmpty(),
  check('password', 'Password should be minimum 8 characters').isLength({
    min: 8
  }),
  registerEmployee
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
  loginEmployee
);

// @route - DELETE /user/logout
// @desc - Log out user.
// @access - Private (Auth)
router.delete('/logout', authenticate, logoutEmployee);

module.exports = router;
