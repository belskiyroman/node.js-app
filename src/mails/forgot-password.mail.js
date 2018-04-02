module.exports = (from, to, { link = '', resetToken }) => ({
  from,
  to,
  subject: 'Reset password',
  text: `
    Hello,
    This is a confirmation that the password for your account ${to} will be changed.
    For confirm ${link ? 'going to the link' : 'use this token'}: ${link}${resetToken}.
    If you did not request a password reset, please ignore this email.
    `,
});
