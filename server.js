const express = require('express');
const path = require('path');
const morgan = require('morgan');
const { config } = require('dotenv');
config();
const db = require('./db');
db.connectReal();
const employeeRoutes = require('./routes/employeeRoutes');

const app = express();
const PORT = parseInt(process.env.PORT) || 5000;

app.use(express.json());
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// Routes
app.use('/employee', employeeRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client', 'build')));
  app.get('*', (_, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`);
});
