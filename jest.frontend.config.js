/** @type {import('jest').Config} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  roots: ["<rootDir>/components", "<rootDir>/app"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  testMatch: [
    "**/__tests__/**/*.(ts|tsx|js|jsx)",
    "**/?(*.)+(spec|test).(ts|tsx|js|jsx)",
  ],
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": "babel-jest",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
  transformIgnorePatterns: ["/node_modules/", "\\.pnp\\.[^\\/]+$"],
  globals: {
    "ts-jest": {
      isolatedModules: true,
    },
  },
};
