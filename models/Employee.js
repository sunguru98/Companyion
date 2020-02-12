const { model, Schema } = require('mongoose');
const { compare, hash } = require('bcryptjs');
const { sign } = require('jsonwebtoken');

const employeeSchema = new Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  accessToken: String,
  email: { type: String, required: true }
});

employeeSchema.methods.toJSON = function() {
  const employee = this.toObject();
  delete employee.__v;
  delete employee.password;
  delete employee.accessToken;
  return employee;
};

employeeSchema.methods.getAccessToken = async function() {
  const employee = this;
  const payload = { email: employee.email, _id: employee.id };
  const token = sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: '24h'
  });
  employee.accessToken = token;
  await employee.save();
  return employee.accessToken;
};

employeeSchema.statics.findByEmailAndPassword = async (email, password) => {
  try {
    const employee = await employee.findOne({ email });
    if (!employee) throw new Error('Invalid credentials');
    const isMatched = await compare(password, employee.password);
    if (!isMatched) throw new Error('Invalid credentials');
    return employee;
  } catch (err) {
    return null;
  }
};

employeeSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    const hashedPassword = await hash(this.password, 10);
    this.password = hashedPassword;
  }
  next();
});

const Employee = model('employee', employeeSchema);

module.exports = Employee;
