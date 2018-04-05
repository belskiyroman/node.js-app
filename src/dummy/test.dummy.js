const { expect } = require('chai');
const sinon = require('sinon');
const project = __dirname.replace(/^([\s\S]*?)test[\s\S]*?$/, '$1');
const SUT = require(`${project}/src/`);

describe('AuthController', function () {
  let sut;
  let req;
  let res;
  let models;

  beforeEach(function () {
    models = {
      User: {
        findOne: sinon.stub(),
      },
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
    sut = new SUT(models);
    sut._sendData = sinon.spy();
  });

  describe('TestDummy', function () {
    it('#constructor', async function () {
      expect(true).to.be.true;
    })
  })
});
