exports.config = {
  output: './output',
  helpers: {
    Puppeteer: {
      url: 'http://localhost:3010',
      show: !process.env.CI,
      headless: Boolean(process.env.CI),
      windowSize: '1200x900'
    },
  },
  include: {
    I: './steps_file.js'
  },
  mocha: {},
  bootstrap: null,
  timeout: null,
  teardown: null,
  hooks: [],
  gherkin: {
    features: './features/createNews.feature',
    steps: './step_definitions/createNewsSteps.js',
  },
  plugins: {
    screenshotOnFail: {
      enabled: true
    },
    pauseOnFail: {},
    retryFailedStep: {
      enabled: true
    },
    tryTo: {
      enabled: true
    }
  },
  stepTimeout: 0,
  stepTimeoutOverride: [{
      pattern: 'wait.*',
      timeout: 0
    },
    {
      pattern: 'amOnPage',
      timeout: 0
    }
  ],
  tests: './*_test.js',
  name: 'tests'
};