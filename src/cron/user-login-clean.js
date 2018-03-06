#!/usr/bin/env node

const config = require('../../.sequelizerc');
const sequelize = require(config['models-path']).sequelize;

sequelize.query(`
  DELETE FROM user_login
  WHERE user_id IS NULL
  OR exp < NOW();
`);
