const { expect } = require('chai');
const sinon = require('sinon');
const project = __dirname.replace(/^([\s\S]*?)test[\s\S]*?$/, '$1');
const { loadModule: sut } = require(`${project}/src/utilities/index-resolver.utility`);

describe('IndexResolverUtility', function () {
  describe('#loadModule', function () {
    let getModule;
    let pathModule;
    let fileSystem;
    let stat;

    beforeEach(function () {
      getModule = sinon.stub();
      pathModule = {
        extname: sinon.stub(),
        basename: sinon.stub().returnsArg(0),
        join: sinon.stub().returnsArg(1),
      };
      stat = {
        isFile: sinon.stub(),
        isDirectory: sinon.stub(),
      };
      fileSystem = {
        readdirSync: sinon.stub(),
        statSync: sinon.stub().returns(stat),
        existsSync: sinon.stub(),
      };
    });

    it('success - default options', function () {
      const options = {};
      fileSystem.readdirSync.returns([
        'test-file.test.utility.js',
        'test-file2.test.utility.js',
      ]);
      stat.isFile.returns(true);
      stat.isDirectory.returns(false);
      pathModule.extname.returns('.js');

      const result = sut('testPathToDir', options, getModule.returns({}), fileSystem, pathModule);

      expect(result).to.be.an('object');
      expect(Object.keys(result)).to.have.lengthOf(2);
    });

    it('success - options { module: false }', function () {
      const options = { module: false };
      fileSystem.existsSync.withArgs('index.js').returns(true);
      fileSystem.readdirSync.returns([
        'test-file.test.utility.js',
        'test-module',
      ]);
      getModule
        .onCall(0).returns({file: ''})
        .onCall(1).returns({module: ''});
      stat.isFile
        .onCall(0).returns(true)
        .onCall(1).returns(false);
      stat.isDirectory
        .onCall(0).returns(false)
        .onCall(1).returns(true);
      pathModule.extname.returns('.js');

      const result = sut('testPathToDir', options, getModule, fileSystem, pathModule);

      expect(result).to.be.an('object');
      expect(Object.keys(result)).to.have.lengthOf(1);
    });

    it('success - options { module: true }', function () {
      const options = { module: true };
      fileSystem.existsSync.withArgs('index.js').returns(true);
      fileSystem.readdirSync.returns([
        'test-file.test.utility.js',
        'test-module',
      ]);
      getModule
        .onCall(0).returns({file: ''})
        .onCall(1).returns({module: ''});
      stat.isFile
        .onCall(0).returns(true)
        .onCall(1).returns(false);
      stat.isDirectory
        .onCall(0).returns(false)
        .onCall(1).returns(true);
      pathModule.extname.returns('.js');

      const result = sut('testPathToDir', options, getModule, fileSystem, pathModule);

      expect(result).to.be.an('object');
      expect(Object.keys(result)).to.have.lengthOf(2);
    });

    it('success - options = { module: false, spred: false }', function () {
      const options = { module: false, spred: false };
      const fileModule = {
        name: 'test-file.test.utility.js',
        value: { file: '' },
      };
      getModule.onCall(0).returns(fileModule.value);
      stat.isFile.onCall(0).returns(true);
      stat.isDirectory.onCall(0).returns(false);
      const dirModule = {
        name: 'test-module',
        value: { module: '' },
      };
      fileSystem.existsSync.withArgs('index.js').returns(true);
      getModule.onCall(1).returns(dirModule.value);
      stat.isFile.onCall(1).returns(false);
      stat.isDirectory.onCall(1).returns(true);
      pathModule.extname.returns('.js');

      fileSystem.readdirSync.returns([fileModule.name, dirModule.name]);

      const result = sut('testPathToDir', options, getModule, fileSystem, pathModule);

      expect(result).to.be.an('object');
      expect(Object.keys(result)).to.have.lengthOf(1);
      expect(Object.values(result))
        .to.include(fileModule.value)
        .but.not.include(dirModule.value);
    });

    it('success - options = { module: true, spred: false }', function () {
      const options = { module: true, spred: false };
      const fileModule = {
        name: 'test-file.test.utility.js',
        value: { file: '' },
      };
      getModule.onCall(0).returns(fileModule.value);
      stat.isFile.onCall(0).returns(true);
      stat.isDirectory.onCall(0).returns(false);
      const dirModule = {
        name: 'test-module',
        value: { module: '' },
      };
      fileSystem.existsSync.withArgs('index.js').returns(true);
      getModule.onCall(1).returns(dirModule.value);
      stat.isFile.onCall(1).returns(false);
      stat.isDirectory.onCall(1).returns(true);
      pathModule.extname.returns('.js');

      fileSystem.readdirSync.returns([fileModule.name, dirModule.name]);

      const result = sut('testPathToDir', options, getModule, fileSystem, pathModule);

      expect(result).to.be.an('object');
      expect(Object.keys(result)).to.have.lengthOf(2);
      expect(Object.values(result)).to.include.deep.members([fileModule.value, dirModule.value]);
    });

    it('success - options = { module: true, spred: true }', function () {
      const options = { module: true, spred: true };
      const objectModule = {
        name: 'test-file.test.utility.js',
        value: { moduleX: Symbol('moduleX') },
      };
      getModule.onCall(0).returns(objectModule.value);
      stat.isFile.onCall(0).returns(true);
      stat.isDirectory.onCall(0).returns(false);
      const functionModule = {
        name: 'test-file.test.utility.js',
        value: () => {},
      };
      getModule.onCall(1).returns(functionModule.value);
      stat.isFile.onCall(1).returns(true);
      stat.isDirectory.onCall(1).returns(false);
      const dirModule = {
        name: 'test-module',
        value: { moduleY: Symbol('moduleY') },
      };
      fileSystem.existsSync.withArgs('index.js').returns(true);
      getModule.onCall(2).returns(dirModule.value);
      stat.isFile.onCall(2).returns(false);
      stat.isDirectory.onCall(2).returns(true);
      pathModule.extname.returns('.js');

      fileSystem.readdirSync.returns([objectModule.name, functionModule.name, dirModule.name]);

      const result = sut('testPathToDir', options, getModule, fileSystem, pathModule);

      expect(result).to.be.an('object');
      expect(Object.keys(result)).to.have.lengthOf(3);
      expect(Object.values(result)).to.include.deep.members([
        objectModule.value.moduleX,
        functionModule.value,
        dirModule.value.moduleY,
      ]);
    });

    it('success - options { prefix: "prifix", postfix: "postfix" }', function () {
      const options = { prefix: 'prifix', postfix: 'postfix' };
      fileSystem.readdirSync.returns(['file.js']);
      stat.isFile.returns(true);
      stat.isDirectory.returns(false);
      pathModule.extname.returns('.js');

      const result = sut('testPathToDir', options, getModule.returns({}), fileSystem, pathModule);

      expect(result).to.be.an('object');
      expect(Object.keys(result)).to.have.lengthOf(1);
      expect(Object.keys(result)[0].slice(0, options.prefix.length)).to.equal(options.prefix);
      expect(Object.keys(result)[0].slice(-options.postfix.length)).to.equal(options.postfix);
    });

    it('success - options { prefix: "prifix", postfix: "postfix" }', function () {
      const options = { prefix: 'prifix', postfix: 'postfix' };
      fileSystem.readdirSync.returns(['file.js']);
      stat.isFile.returns(true);
      stat.isDirectory.returns(false);
      pathModule.extname.returns('.js');

      const result = sut('testPathToDir', options, getModule.returns({}), fileSystem, pathModule);

      expect(result).to.be.an('object');
      expect(Object.keys(result)).to.have.lengthOf(1);
      expect(Object.keys(result)[0].slice(0, options.prefix.length)).to.equal(options.prefix);
      expect(Object.keys(result)[0].slice(-options.postfix.length)).to.equal(options.postfix);
    });

    it('success - options { ext: [".js", ".json"] }', function () {
      const options = { ext: ['.js', '.json'] };
      fileSystem.readdirSync.returns(['js.js', 'json.json', 'jsx.jsx']);
      stat.isFile.returns(true);
      stat.isDirectory.returns(false);
      pathModule.extname
        .onCall(0).returns('.js')
        .onCall(1).returns('.json')
        .onCall(2).returns('.jsx');

      const result = sut('testPathToDir', options, getModule.returns({}), fileSystem, pathModule);

      expect(result).to.be.an('object');
      expect(Object.keys(result)).to.have.lengthOf(2);
      expect(Object.keys(result))
        .to.include.members(['js', 'json'])
        .but.not.include('jsx');
    });

    it('success - options { exclude: ["file-exclude.js"] }', function () {
      const options = { exclude: ['file-exclude.js'] };
      fileSystem.readdirSync.returns(['js.js', 'json.json', 'jsx.jsx'].concat(options.exclude));
      stat.isFile.returns(true);
      stat.isDirectory.returns(false);
      pathModule.extname
        .onCall(0).returns('.js')
        .onCall(1).returns('.json')
        .onCall(2).returns('.jsx')
        .onCall(3).returns('.js');

      const result = sut('testPathToDir', options, getModule.returns({}), fileSystem, pathModule);

      expect(result).to.be.an('object');
      expect(Object.keys(result)).to.have.lengthOf(1);
      expect(Object.keys(result))
        .to.include('js')
        .but.not.include.members(['jsx', 'json']);
      expect(Object.keys(result).join('')).not.include('exclude');
    });

    it('success - options { inputCase, outputCase }', function () {
      const filename = 'test-file.test.utility.js';
      const basename = 'test-file.test.utility';
      const outputFileName = 'test-file-test-utility';
      const partsOfFileName = ['test', 'file', 'test', 'utility'];
      const options = {
        inputCase: sinon.stub().returns(partsOfFileName),
        outputCase: sinon.stub().returns(outputFileName),
      };
      fileSystem.readdirSync.returns([filename]);
      stat.isFile.returns(true);
      stat.isDirectory.returns(false);
      pathModule.extname.returns('.js');

      const result = sut('testPathToDir', options, getModule.returns({}), fileSystem, pathModule);

      expect(result).to.be.an('object');
      expect(Object.keys(result)).to.have.lengthOf(1);
      expect(Object.keys(result)).to.include(outputFileName);
      expect(options.inputCase.calledWith(basename)).to.be.true;
      expect(options.outputCase.calledWith(partsOfFileName)).to.be.true;
    });
  });
});
