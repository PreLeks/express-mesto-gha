const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const err = require('./middlewares/error');
const router = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/loger');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(requestLogger);

app.use(router);

app.use(errorLogger);

app.use(errors());
app.use(err);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
