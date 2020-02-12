const { model, Schema } = require('mongoose');
const Employee = require('./Employee');

const companySchema = new Schema({
  name: { type: String, required: true },
  country: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  address: { type: String, required: true },
  pastEmployees: [
    {
      type: Schema.Types.ObjectId,
      ref: 'employee',
      default: []
    }
  ],
  presentEmployees: [{ type: Schema.Types.ObjectId, ref: 'employee' }]
});

companySchema.methods.toJSON = function() {
  const employee = this.toObject();
  delete employee.__v;
  return employee;
};

companySchema.pre('remove', async function(next) {
  await Employee.deleteMany();
  next();
});

const Company = model('company', companySchema);

module.exports = Company;
