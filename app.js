const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const { notFoundController } = require('./errors/notFoundController');


const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '63cf07d518f18e3192fe3531'
  };

  next();
});

app.use('/', userRouter);
app.use('/', cardRouter);

app.use('*', notFoundController);



app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});