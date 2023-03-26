const express = require('express');
const morgan = require('morgan');

const userRoute = require('./routes/users.routes');
const repairRoute = require('./routes/repairs.routes');

const app = express();

app.use(morgan('dev'));

app.use(express.json());

app.use('/api/v1/users', userRoute);
app.use('/api/v1/repairs', repairRoute);

module.exports = app;
