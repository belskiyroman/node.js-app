require('dotenv').config({path: `${__dirname}/config/env.${process.env.NODE_ENV || 'development'}`});

const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const schema = require('./graph-api');

const app = express();

app.use(helmet());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

// The GraphQL endpoint
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));

// GraphiQL, a visual editor for queries
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

// Start the server
app.listen(process.env.PORT, () => {
  console.log('Go to http://localhost:3000/graphiql to run queries!');
});
