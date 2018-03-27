#!/usr/bin/env node

const config = require('../../.sequelizerc');
const sequelize = require(config['models-path']).sequelize;

const cron = module.exports = async () => {
  try {
    await sequelize.query(`
      DELETE FROM user_login
      WHERE user_id IS NULL
      OR exp < NOW();
    `);
  } catch (err) {
    throw new Error(err);
  }
};

if (require.main === module) {
  cron().then(
    () => process.exit(0),
    (err) => {
      console.error(err);
      process.exit(1);
    }
  )
}