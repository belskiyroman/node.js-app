module.exports = {
  development: {
    host: '127.0.0.1',
    port: 1025,
    secure: false,
  },
  test: {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    pool: false,
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD
    },
  },
  production: {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: !!process.env.SMTP_SECURE,
    pool: !!process.env.SMTP_POOL,
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD
    },
  }
};
