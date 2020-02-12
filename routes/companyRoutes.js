const { Router } = require('express');
const {
  listCompanies,
  listCompanyById,
  joinCompany,
  quitCompany
} = require('../controllers/companyController');
const authenticate = require('../middlewares/authenticate');
const router = Router();

// @route - GET /company
// @desc - Get all companies
// @access - Public
router.get('/', listCompanies);

// @route - GET /company/:id
// @desc - Get company by id
// @access - Public
router.get('/:id', listCompanyById);

// @route - PATCH /company/:id
// @desc - Join a company
// @access - Private (Auth)
router.patch('/:id', authenticate, joinCompany);

// @route - DELETE /company/:id
// @desc - Quit a company
// @access - Private (Auth)
router.delete('/:id', authenticate, quitCompany);

module.exports = router;
