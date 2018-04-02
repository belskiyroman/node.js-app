module.exports = (from, to, { link = '', emailToken }) => ({
  from,
  to,
  subject: 'Registration',
  text: `
    Hello,
    For the finish of registration you need confirm your email going to the next link:
    ${link ? 'going to the link' : 'use this token'}: ${link}${emailToken}.
    `,
});
