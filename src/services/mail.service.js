const nodemailer = require('nodemailer');
const mailTransportConfig = require('../config/mail')[process.env.NODE_ENV];

class MailService {
  constructor (nodemailer, mailConf) {
    const transporter = nodemailer.createTransport(mailConf);
    this._mailSender = transporter.sendMail.bind(transporter);
  }

  /**
   * @type message {{from: string, to: string, subject: string, text: string, html: string}}
   */

  /**
   *
   * @param {message} messages
   * @return {Promise}
   */
  async sendMail (messages = {}) {
    return this._mailSender(messages);
  }
}

/**
 * @module MailService
 * @type {MailService}
 */
module.exports = new MailService(nodemailer, mailTransportConfig);
