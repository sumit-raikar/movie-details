module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.test.{js,jsx}"],
  coverageDirectory: "coverage",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "<rootDir>/styleMock.js",
    // "\\.(gif|ttf|eot|svg)$": "<rootDir>/__mocks__/fileMock.js",
  },
};
