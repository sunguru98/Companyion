const { connect } = require('mongoose');

const connectReal = () =>
  connect(
    process.env.MONGODB_URI_PROD.replace(
      '<password>',
      process.env.MONGODB_PASSWORD
    ),
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    }
  )
    .then(() => {
      console.log('Database connected');
      Promise.resolve();
    })
    .catch(Promise.reject);

const connectDemo = () =>
  connect(
    process.env.MONGODB_URI_TEST.replace(
      '<password>',
      process.env.MONGODB_PASSWORD
    ),
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    }
  )
    .then(() => {
      console.log('Test Database connected');
      Promise.resolve();
    })
    .catch(Promise.reject);

module.exports = {
  connectReal,
  connectDemo
};
