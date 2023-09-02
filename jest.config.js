module.exports = {
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
  transform: {
    "^.+\\.[t|j]sx?$": "babel-jest"
  },
  testEnvironment: "jsdom",
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/__mocks__/fileMock.js',
  },
  transformIgnorePatterns: [
    "/node_modules/(?!your-dependency-to-be-transpiled)"
  ],
  collectCoverage: true,
  coverageReporters: ["lcov", "text"],
  coverageDirectory: 'coverage',
};