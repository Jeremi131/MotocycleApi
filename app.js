const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const hpp = require('hpp');
const xss = require('xss-clean');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/error.controller');

const userRoute = require('./routes/users.routes');
const repairRoute = require('./routes/repairs.routes');

const app = express();
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 100,
  message:
    'too many resquet from this IP, please try again in one hour',
});

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(helmet());
app.use(express.json());
app.use(xss());
app.use(hpp());

app.use('/api/v1', limiter);

app.use('/api/v1/users', userRoute);
app.use('/api/v1/repairs', repairRoute);

app.all('*', (req, res, next) => {
  return next(
    new AppError(
      `Can't find ${req.originalUrl} on this server! 🧨`
    ),
    404
  );
});

app.use(globalErrorHandler);

module.exports = app;
