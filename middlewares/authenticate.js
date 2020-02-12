const { verify } = require('jsonwebtoken');
const Employee = require('../models/Employee');

const authenticate = async (req, res, next) => {
  try {
    // Finding the accessToken
    const accessToken = req.header('Authorization');
    if (!accessToken) throw new Error('Invalid Credentials');
    const { _id } = verify(
      accessToken.replace('Bearer ', ''),
      process.env.JWT_SECRET_KEY
    );
    const employee = await Employee.findOne({
      _id,
      accessToken: accessToken.replace('Bearer ', '')
    });
    if (!employee) throw new Error('Invalid Credentials');
    req.employee = employee;
    req.accessToken = accessToken;
    next();
  } catch (err) {
    res.status(403).send({ statusCode: 403, message: err.message });
  }
};

module.exports = authenticate;
