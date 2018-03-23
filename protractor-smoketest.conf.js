// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');

exports.config = {
  allScriptsTimeout: 30000,
  specs: [
    './e2e/**/*.smoke-spec.ts'
  ],
  capabilities: {
    'browserName': 'chrome'
  },
  seleniumAddress: process.env.SELENIUM_ADDRESS || 'http://127.0.0.1:4444/wd/hub',
  baseUrl: process.env.E2E_BASE_URL || 'https://localhost:443',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function() {}
  },
  onPrepare() {
    require('ts-node').register({
      project: 'e2e/tsconfig.e2e.json'
    });
    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
  }
};
