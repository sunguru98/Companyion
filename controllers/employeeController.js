const { validationResult } = require('express-validator');
const Employee = require('../models/Employee');
const Company = require('../models/Company');

module.exports = {
  async createCompany(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res
          .status(400)
          .send({ statusCode: 400, message: errors.array() });
      if (await Company.findOne({ name: req.body.name }))
        return res
          .status(400)
          .send({ statusCode: 400, message: 'Company already exists' });
      const company = new Company({ ...req.body });
      await company.save();
      return res.status(201).send({ statusCode: 201, company });
    } catch (err) {
      return res.status(500).send({ statusCode: 500, message: 'Server Error' });
    }
  },

  async registerEmployee(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res
          .status(400)
          .send({ statusCode: 400, message: errors.array() });
      let employee = await Employee.findOne({ email: req.body.email });
      if (employee)
        return res
          .status(400)
          .send({ statusCode: 400, message: 'Employee already exists' });
      else employee = await Employee.create({ ...req.body });
      employee = await employee.populate('companies', 'name').execPopulate();
      const accessToken = `Bearer ${await employee.getAccessToken()}`;
      return res
        .status(201)
        .send({ statusCode: 201, employee, accessToken, expiresIn: '24h' });
    } catch (err) {
      return res.status(500).json({ statusCode: 500, message: 'Server Error' });
    }
  },

  async loginEmployee(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res
          .status(400)
          .send({ statusCode: 400, message: errors.array() });
      const { email, password } = req.body;
      const employee = await Employee.findByEmailAndPassword(email, password);
      if (!employee)
        return res
          .status(401)
          .send({ statusCode: 401, message: 'Invalid credentials' });
      const accessToken = `Bearer ${await employee.getAccessToken()}`;
      let emp = await employee
        .populate('companies.company', 'name')
        .execPopulate();
      return res.send({
        statusCode: 200,
        employee: emp,
        accessToken,
        expiresIn: '24h'
      });
    } catch (err) {
      return res.status(500).send({ statusCode: 500, message: 'Server Error' });
    }
  },

  async logoutEmployee(req, res) {
    const accessToken = req.accessToken.replace('Bearer ', '');
    try {
      const employee = await Employee.findOne({ accessToken });
      if (!employee)
        return res
          .status(400)
          .send({ statusCode: 400, message: 'Invalid request' });
      employee.accessToken = null;
      await employee.save();
      return res
        .status(202)
        .send({ statusCode: 202, message: 'Employee Logged out successfully' });
    } catch (err) {
      return res.status(500).send({ statusCode: 500, message: 'Server Error' });
    }
  }
};
