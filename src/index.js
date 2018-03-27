require('dotenv').config({path: `${__dirname}/config/env.${process.env.NODE_ENV || 'development'}`});

const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const passport = require('./config/passport');
const sendError = require('./utilities/errors.utility').sendError;

const app = express();

app.use(helmet());
app.use(cors());
app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());

// routes
require('./routes/auth-rest')(app);
require('./routes/graphql')(app);

// global error handler
app.use((err, req, res, next) => sendError(err, res));

// Start the server
app.listen(process.env.PORT, () => {
  console.info('The server is running on the 3000 port.');
  console.info('Go to http://localhost:3000/graphiql to run queries!');
});
