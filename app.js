const express = require('express')
// const path = require("path");
const logger = require('morgan')
const cors = require('cors')

// const dotenv = require('dotenv');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

// global.basedir = __dirname;
// dotenv.config({ path: path.join(__dirname, "../../.env") });

const authRouter = require('./routes/api/auth');

const categoriesRouter = require('./routes/api/categories');

const transactionsRouter = require('./routes/api/transactions');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())
app.use(express.static('public'))

app.use('/api/auth', authRouter);
app.use('/api/categoriesRouter', categoriesRouter);
app.use('/api/transactions', transactionsRouter);

// app.use('/api/contacts', contactsRouter);

// type in the browser 'http://localhost:3000/api-docs'
// to go to swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
}) 

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;