const Company = require('../models/Company');

module.exports = {
  async listCompanies(_, res) {
    try {
      const companies = await Company.find();
      return res.send({
        statusCode: 200,
        companies: companies.map(c => {
          c = c.toObject();
          delete c.pastEmployees;
          delete c.presentEmployees;
          delete c.address;
          delete c.__v;
          return c;
        })
      });
    } catch (err) {
      return res.status(500).send({ statusCode: 500, message: 'Server Error' });
    }
  },

  async listCompanyById(req, res) {
    try {
      const companyId = req.params.id;
      if (!companyId)
        return res
          .status(404)
          .send({ statusCode: 404, message: 'Company Id not found' });
      const company = await Company.findById(companyId);
      if (!company)
        return res
          .status(404)
          .send({ statusCode: 404, message: 'Company does not exist' });
      return res.status(200).send({ statusCode: 200, company });
    } catch (err) {
      if (err.name === 'CastError')
        return res
          .status(400)
          .send({ statusCode: 400, message: 'Invalid Company Id' });
      return res.status(500).send({ statusCode: 500, message: 'Server Error' });
    }
  },

  async joinCompany(req, res) {
    try {
      const companyId = req.params.id;
      if (!companyId)
        return res
          .status(404)
          .send({ statusCode: 404, message: 'Company Id not found' });
      if (!req.body.joinedAt)
        return res
          .status(400)
          .send({ statusCode: 400, message: 'Joining date is required' });
      const employee = req.employee;
      if (
        employee.companies.find(
          c => c.company.toString() === companyId && !c.leftAt
        )
      )
        return res
          .status(400)
          .send({ statusCode: 400, message: 'You are already an employee' });
      else {
        const singleCompany = await Company.findById(companyId);
        if (
          singleCompany.presentEmployees.find(e => e.toString() === employee.id)
        )
          return res
            .status(400)
            .send({ statusCode: 400, message: 'You are already an employee' });
        const company = {
          company: companyId,
          joinedAt: new Date(req.body.joinedAt)
        };
        let isCompIndex = employee.companies.findIndex(
          c => c.company.toString() === companyId && c.leftAt
        );
        if (isCompIndex !== -1)
          employee.companies[isCompIndex] = { ...company };
        else employee.companies = [...employee.companies, company];

        await employee.save();
        const comp = await Company.findById(companyId);
        comp.pastEmployees = comp.pastEmployees.filter(
          e => e.toString() !== employee.id
        );
        comp.presentEmployees.push(employee.id);
        await comp.save();
        return res.status(202).send({ statusCode: 202, company });
      }
    } catch (err) {
      if (err.name === 'CastError')
        return res
          .status(400)
          .send({ statusCode: 400, message: 'Invalid Company Id' });
      return res.status(500).send({ statusCode: 500, message: 'Server Error' });
    }
  },

  async quitCompany(req, res) {
    try {
      const companyId = req.params.id;
      if (!companyId)
        return res
          .status(404)
          .send({ statusCode: 404, message: 'Company Id not found' });
      const employee = req.employee;
      const empCompany = employee.companies.find(
        c => c.company.toString() === companyId
      );

      if (!empCompany || empCompany.toObject().hasOwnProperty('leftAt'))
        return res.status(400).send({
          statusCode: 400,
          message: 'You cannot quit a company where you arent an employee'
        });

      const company = await Company.findById(companyId);
      if (!company)
        return res
          .status(404)
          .send({ statusCode: 404, message: 'Company not found' });

      if (!company.presentEmployees.find(e => e.toString() === employee.id))
        return res.status(400).send({
          statusCode: 400,
          message: 'You cannot quit a company where you are not an employee'
        });

      company.presentEmployees = [
        ...company.presentEmployees.filter(e => e.toString() !== employee.id)
      ];
      company.pastEmployees.push(employee.id);
      await company.save();
      const comp = employee.companies.find(
        c => c.company.toString() === companyId
      );
      comp.leftAt = new Date();
      await employee.save();
      return res.status(202).send({ statusCode: 202, company: comp });
    } catch (err) {
      if (err.name === 'CastError')
        return res
          .status(400)
          .send({ statusCode: 400, message: 'Invalid Company Id' });
      return res.status(500).send({ statusCode: 500, message: 'Server Error' });
    }
  }
};
