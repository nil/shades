module.exports = {
  moduleFileExtensions: [
    'js',
    'vue'
  ],
  moduleNameMapper: {
    '^c/(.*)$': '<rootDir>/components/$1',
    '^a/(.*)$': '<rootDir>/assets/$1',
    '^js/(.*)$': '<rootDir>/src/js/$1',
    '^store(.*)$': '<rootDir>/src/store.js'
  },
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    '.*\\.(vue)$': '<rootDir>/node_modules/vue-jest'
  }
};
