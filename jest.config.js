module.exports = {
  verbose: true,
  preset: 'ts-jest/presets/js-with-ts',
  // preset: 'ts-jest',
  moduleFileExtensions: [
    'ts',
    'js'
  ],
  globals: {
    'ts-jest': {
      tsConfig: './test/tsconfig.json'
    }
  },
  testMatch: [
    '**/test/test-*[tj]s'
  ]
}
