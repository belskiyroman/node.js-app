const { expect } = require('chai');
const project = __dirname.replace(/^([\s\S]*?)test[\s\S]*?$/, '$1');
const sut = require(`${project}/src/utilities/string.utility`);

describe('StringUtility', function () {
  it('#splitDashCase', function () {
    expect(sut.splitDashCase('dash-case-str'))
      .to.be.eql(['dash', 'case', 'str']);
    expect(sut.splitDashCase('DasH-CaSe-StR'))
      .to.be.eql(['dash', 'case', 'str']);
    expect(sut.splitDashCase('DasH.CaSe-StR'))
      .to.be.eql(['dash.case', 'str']);
    expect(sut.splitDashCase('DasH.CaSe_StR'))
      .to.be.eql(['dash.case_str']);
  });

  it('#joinDashCase', function () {
    expect(sut.joinDashCase(['dash', 'case', 'str']))
      .to.be.eql('dash-case-str');
    expect(sut.joinDashCase(['DasH', 'CaSe', 'StR']))
      .to.be.eql('dash-case-str');
    expect(sut.joinDashCase(['DasH.CaSe', 'StR']))
      .to.be.eql('dash.case-str');
    expect(sut.joinDashCase(['DasH.CaSe_StR']))
      .to.be.eql('dash.case_str');
  });

  it('#splitCamelCase', function () {
    expect(sut.splitCamelCase('camelCaseStr'))
      .to.be.eql(['camel', 'case', 'str']);
    expect(sut.splitCamelCase('CamelCaseStr'))
      .to.be.eql(['camel', 'case', 'str']);
    expect(sut.splitCamelCase('Camel.Case-Str'))
      .to.be.eql(['camel.', 'case-', 'str']);
    expect(sut.splitCamelCase('Camel_Case-Str'))
      .to.be.eql(['camel_', 'case-', 'str']);
    expect(sut.splitCamelCase('Camel Case str'))
      .to.be.eql(['camel', 'case', 'str']);
  });

  it('#joinCamelCase', function () {
    expect(sut.joinCamelCase(['camel', 'case', 'str']))
      .to.be.eql('camelCaseStr');
    expect(sut.joinCamelCase(['CaMel', 'CasE', 'StR']))
      .to.be.eql('camelCaseStr');
    expect(sut.joinCamelCase(['Camel.', 'Case-', 'Str']))
      .to.be.eql('camelCaseStr');
    expect(sut.joinCamelCase(['camel_', 'case-', 'str']))
      .to.be.eql('camelCaseStr');
    expect(sut.joinCamelCase(['camel', 'case.', 'str']))
      .to.be.eql('camelCaseStr');
  });

  it('#splitPascalCase', function () {
    expect(sut.splitPascalCase('pascalCaseStr'))
      .to.be.eql(['pascal', 'case', 'str']);
    expect(sut.splitPascalCase('PascalCaseStr'))
      .to.be.eql(['pascal', 'case', 'str']);
    expect(sut.splitPascalCase('Pascal.Case-Str'))
      .to.be.eql(['pascal.', 'case-', 'str']);
    expect(sut.splitPascalCase('Pascal_Case-Str'))
      .to.be.eql(['pascal_', 'case-', 'str']);
    expect(sut.splitPascalCase('Pascal Case str'))
      .to.be.eql(['pascal', 'case', 'str']);
  });

  it('#joinPascalCase', function () {
    expect(sut.joinPascalCase(['pascal', 'case', 'str']))
      .to.be.eql('PascalCaseStr');
    expect(sut.joinPascalCase(['PaScAl', 'CasE', 'StR']))
      .to.be.eql('PascalCaseStr');
    expect(sut.joinPascalCase(['PAscal.', 'Case-', 'Str']))
      .to.be.eql('PascalCaseStr');
    expect(sut.joinPascalCase(['pascal_', 'case-', 'str']))
      .to.be.eql('PascalCaseStr');
    expect(sut.joinPascalCase(['pascal', 'case.', 'str']))
      .to.be.eql('PascalCaseStr');
  });

  it('#splitSnakeCase', function () {
    expect(sut.splitSnakeCase('dash_case_str'))
      .to.be.eql(['dash', 'case', 'str']);
    expect(sut.splitSnakeCase('DasH_CaSe_StR'))
      .to.be.eql(['dash', 'case', 'str']);
    expect(sut.splitSnakeCase('DasH.CaSe_StR'))
      .to.be.eql(['dash.case', 'str']);
    expect(sut.splitSnakeCase('DasH.CaSe-StR'))
      .to.be.eql(['dash.case-str']);
  });

  it('#joinSnakeCase', function () {
    expect(sut.joinSnakeCase(['dash', 'case', 'str']))
      .to.be.eql('dash_case_str');
    expect(sut.joinSnakeCase(['DasH', 'CaSe', 'StR']))
      .to.be.eql('dash_case_str');
    expect(sut.joinSnakeCase(['DasH.CaSe', 'StR']))
      .to.be.eql('dash.case_str');
    expect(sut.joinSnakeCase(['DasH.CaSe-StR']))
      .to.be.eql('dash.case-str');
  });
});
