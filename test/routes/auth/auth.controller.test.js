const { expect } = require('chai');
const sinon = require('sinon');
const project = __dirname.replace(/^([\s\S]*?)test[\s\S]*?$/, '$1');
const SUT = require(`${project}/src/routes/auth/auth.controller`);
const { SUPPORT: SUPPORT_EMAIL } = require(`${project}/src/constants`);
const { APIValidationError } = require(`${project}/src/utilities`);

describe('AuthController', function () {
  let sut;
  let req;
  let res;
  let sendError;
  let models;
  let mailService;
  let mail;

  beforeEach(function () {
    sendError = sinon.spy();
    models = {
      User: {
        findOne: sinon.stub(),
      },
    };
    mailService = {
      sendMail: sinon.spy(),
    };
    mail = {
      registrationMail: sinon.stub(),
      forgotPasswordMail: sinon.stub(),
    };
    req = {
      login: sinon.spy(),
      user: {
        createEmailToken: sinon.stub(),
        createResetToken: sinon.stub(),
        createUserLogin: sinon.stub(),
        save: sinon.spy(),
        validate: sinon.stub(),
        setNewPassword: sinon.spy(),
        confirmEmail: sinon.spy(),
        currentLogin: {
          destroy: sinon.stub(),
        }
      },
      body: {}
    };
    res = {
      send: sinon.spy(),
      sendStatus: sinon.spy(),
    };
    sut = new SUT(sendError, models, mailService, mail);
    sut._sendData = sinon.spy();
  });

  describe('#constructor', function () {
    it('create instance', function () {
      try {
        const sut = new SUT(sendError, models, mailService, mail);
        expect(sut).to.be.an.instanceOf(SUT);
      } catch (err) {
        expect(true).to.be.false;
      }
    })
  });

  describe('#registration', function () {
    it('req#login success', async function () {
      const user = Symbol('user');
      models.User.build = sinon.stub().returns(user);
      sut.sendEmailConfirmation = sinon.spy();

      await sut.registration(req, res);

      expect(req.login.called).to.be.true;
      expect(req.login.firstCall.args[0]).to.equal(user);
      expect(req.login.firstCall.args[1]).to.be.an('object');
      expect(req.login.firstCall.args[1].session).to.be.false;
      expect(req.login.firstCall.args[2]).to.be.a('function');

      req.login.firstCall.args[2]();

      expect(sut.sendEmailConfirmation.called).to.be.true;
      expect(sut.sendEmailConfirmation.calledWith(req, res)).to.be.true;
    });

    it('req#login error', async function () {
      models.User.build = sinon.stub().throws();
      sut.sendEmailConfirmation = sinon.spy();

      await sut.registration(req, res);

      expect(req.login.called).to.be.false;
      expect(sut.sendEmailConfirmation.called).to.be.false;
      expect(sendError.called).to.be.true;
      expect(sendError.firstCall.args[0]).to.be.an.instanceOf(Error);
      expect(sendError.firstCall.args[1]).to.be.equal(res);
    })
  });

  describe('#sendEmailConfirmation', function () {
    it('success', async function () {
      const token = 'emailToken';
      req.body.link = 'link';
      req.user.email = 'test@email';
      req.user.createEmailToken.returns(token);
      mail.registrationMail.returnsThis();

      await sut.sendEmailConfirmation(req, res);

      expect(req.user.createEmailToken.called).to.be.true;
      expect(mail.registrationMail.called).to.be.true;
      expect(mail.registrationMail.calledWithMatch(SUPPORT_EMAIL, req.user.email)).to.be.true;
      expect(mail.registrationMail.firstCall.args[2].emailToken).to.equal(token);
      expect(mail.registrationMail.firstCall.args[2].link).to.equal('link/');
      expect(mailService.sendMail.called).to.be.true;
      expect(mailService.sendMail.calledWith(mail)).to.be.true;
      expect(req.user.save.called).to.be.true;
    });

    it('error', async function () {
      req.user.createEmailToken.throws();

      await sut.sendEmailConfirmation(req, res);

      expect(mailService.sendMail.called).to.be.false;
      expect(req.user.save.called).to.be.false;
      expect(sendError.called).to.be.true;
    });
  });

  describe('#emailConfirmation', function () {
    it('success', async function () {
      req.body.emailToken = 'emailToken';
      models.User.findOne.returns(req.user);
      sut.login = sinon.spy();

      await sut.emailConfirmation(req, res);

      expect(models.User.findOne.called).to.be.true;
      expect(models.User.findOne.calledWith(
        sinon.match.has('where', sinon.match.has('email_token', req.body.emailToken)))
      ).to.be.true;
      expect(req.user.validate.called).to.be.true;
      expect(req.user.confirmEmail.called).to.be.true;
      expect(req.user.save.called).to.be.true;
      expect(req.login.called).to.be.true;
      expect(req.login.firstCall.args[1].session).to.be.false;
      expect(req.login.firstCall.args[2]).to.be.a('function');

      req.login.firstCall.args[2]();

      expect(sut.login.called).to.be.true;
    });

    it('error - the emailToken param is not exist', async function () {
      await sut.emailConfirmation(req, res);

      expect(sendError.called).to.be.true;
      expect(sendError.calledWith(sinon.match.instanceOf(APIValidationError)), res).to.be.true;
    });

    it('error - user not found', async function () {
      req.body.emailToken = 'emailToken';
      models.User.findOne.returns(null);

      await sut.emailConfirmation(req, res);

      expect(models.User.findOne.called).to.be.true;
      expect(req.user.save.called).to.be.false;
      expect(req.login.called).to.be.false;
      expect(sendError.called).to.be.true;
      expect(sendError.calledWith(sinon.match.instanceOf(APIValidationError)), res).to.be.true;
    });

    it('error - user#validate', async function () {
      req.body.emailToken = 'emailToken';
      req.user.validate.throws();
      models.User.findOne.returns(req.user);

      await sut.emailConfirmation(req, res);

      expect(models.User.findOne.called).to.be.true;
      expect(req.user.save.called).to.be.false;
      expect(req.login.called).to.be.false;
      expect(req.user.validate.called).to.be.true;
      expect(sendError.called).to.be.true;
      expect(sendError.calledWith(sinon.match.instanceOf(Error)), res).to.be.true;
    });
  });

  describe('#login', function () {
    it('success', async function () {
      const token = 'loginToken';
      req.user.createUserLogin.returns({ token });

      await sut.login(req, res);

      expect(req.user.createUserLogin.called).to.be.true;
      expect(sut._sendData.called).to.be.true;
      expect(sut._sendData.calledWith(res, sinon.match.has('token', token))).to.be.true;
    });

    it('error', async function () {
      req.user.createUserLogin.throws();

      await sut.login(req, res);

      expect(req.user.createUserLogin.called).to.be.true;
      expect(sendError.called).to.be.true;
      expect(sendError.calledWith(sinon.match.instanceOf(Error)), res).to.be.true;
    });
  });

  describe('#logout', function () {
    it('success', async function () {
      await sut.logout(req, res);

      expect(req.user.currentLogin.destroy.called).to.be.true;
      expect(sut._sendData.called).to.be.true;
      expect(sut._sendData.calledWith(res)).to.be.true;
    });

    it('error', async function () {
      req.user.currentLogin.destroy.throws();

      await sut.logout(req, res);

      expect(req.user.currentLogin.destroy.called).to.be.true;
      expect(sendError.called).to.be.true;
      expect(sendError.calledWith(sinon.match.instanceOf(Error)), res).to.be.true;
    });
  });

  describe('#forgotPassword', function () {
    it('success', async function () {
      const token = 'resetToken';
      req.body.link = 'link';
      req.body.email = 'test@email';
      req.user.createResetToken.returns(token);
      models.User.findOne.returns(req.user);
      mail.forgotPasswordMail.returnsThis();

      await sut.forgotPassword(req, res);

      expect(models.User.findOne.called).to.be.true;
      expect(models.User.findOne.calledWith(
        sinon.match.has('where', sinon.match.has('email', req.body.email)))
      ).to.be.true;
      expect(req.user.createResetToken.called).to.be.true;
      expect(mail.forgotPasswordMail.called).to.be.true;
      expect(mail.forgotPasswordMail.calledWithMatch(SUPPORT_EMAIL, req.user.email)).to.be.true;
      expect(mail.forgotPasswordMail.firstCall.args[2].resetToken).to.equal(token);
      expect(mail.forgotPasswordMail.firstCall.args[2].link).to.equal('link/');
      expect(mailService.sendMail.called).to.be.true;
      expect(mailService.sendMail.calledWith(mail)).to.be.true;
      expect(req.user.save.called).to.be.true;
      expect(sut._sendData.called).to.be.true;
    });

    it('error - the email param is not exist', async function () {
      await sut.forgotPassword(req, res);

      expect(sendError.called).to.be.true;
    });

    it('error - user not found', async function () {
      req.body.email = 'test@email';
      models.User.findOne.returns(null);

      await sut.forgotPassword(req, res);

      expect(models.User.findOne.called).to.be.true;
      expect(models.User.findOne.calledWith(
        sinon.match.has('where', sinon.match.has('email', req.body.email)))
      ).to.be.true;
      expect(req.user.createResetToken.called).to.be.false;
      expect(mail.forgotPasswordMail.called).to.be.false;
      expect(mailService.sendMail.called).to.be.false;
      expect(req.user.save.called).to.be.false;
      expect(sut._sendData.called).to.be.true;
      expect(sendError.called).to.be.false;
    });
  });

  describe('#resetPassword', function () {
    it('success', async function () {
      req.body.resetToken = 'resetToken';
      req.body.password = '123';
      models.User.findOne.returns(req.user);

      await sut.resetPassword(req, res);

      expect(models.User.findOne.called).to.be.true;
      expect(models.User.findOne.calledWith(
        sinon.match.has('where', sinon.match.has('reset_token', req.body.resetToken)))
      ).to.be.true;
      expect(req.user.setNewPassword.called).to.be.true;
      expect(req.user.setNewPassword.calledWith(req.body.password)).to.be.true;
      expect(req.user.validate.called).to.be.true;
      expect(req.user.save.called).to.be.true;
      expect(sut._sendData.called).to.be.true;
    });

    it('error - the resetToken param is not exist', async function () {
      req.body.password = '123';
      await sut.resetPassword(req, res);
      expect(sendError.called).to.be.true;
    });

    it('error - the resetToken param is not exist', async function () {
      req.body.resetToken = 'resetToken';
      await sut.resetPassword(req, res);
      expect(sendError.called).to.be.true;
    });

    it('error - required params are not exists', async function () {
      await sut.resetPassword(req, res);
      expect(sendError.called).to.be.true;
    });

    it('error - user not found', async function () {
      req.body.resetToken = 'resetToken';
      req.body.password = '123';
      models.User.findOne.returns(null);

      await sut.resetPassword(req, res);

      expect(models.User.findOne.called).to.be.true;
      expect(models.User.findOne.calledWith(
        sinon.match.has('where', sinon.match.has('reset_token', req.body.resetToken)))
      ).to.be.true;
      expect(req.user.setNewPassword.called).to.be.false;
      expect(req.user.save.called).to.be.false;
      expect(sut._sendData.called).to.be.false;
      expect(sendError.called).to.be.true;
    });

    it('error - user#validate', async function () {
      req.body.resetToken = 'resetToken';
      req.body.password = '123';
      req.user.validate.throws();
      models.User.findOne.returns(req.user);

      await sut.resetPassword(req, res);

      expect(models.User.findOne.called).to.be.true;
      expect(models.User.findOne.calledWith(
        sinon.match.has('where', sinon.match.has('reset_token', req.body.resetToken)))
      ).to.be.true;
      expect(req.user.validate.called).to.be.true;
      expect(req.user.setNewPassword.called).to.be.false;
      expect(req.user.save.called).to.be.false;
      expect(sut._sendData.called).to.be.false;
      expect(sendError.called).to.be.true;
    });
  });
});
