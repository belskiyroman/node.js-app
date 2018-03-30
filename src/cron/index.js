const crons = require('../utilities/index-resolver.utillity').moduleLoad(__dirname);

Promise.all(
  Object
    .values(crons)
    .map((cron) => cron().catch(console.error))
).then(
  () => process.exit(0),
  () => process.exit(1)
);
