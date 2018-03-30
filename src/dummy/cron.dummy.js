#!/usr/bin/env node

const path = require('path');
const config = require(path.join(path.resolve(__dirname), '../../.sequelizerc'));
const sequelize = require(config['models-path']).sequelize;

const cron = module.exports = async () => {
  try {
    // await sequelize.query(`
    //   # Your SQL
    // `);
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