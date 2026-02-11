const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],

  // Useful defaults
  clearMocks: true,

  // Where Jest should look for tests
  testMatch: [
    "**/__tests__/**/*.(test|spec).(ts|tsx|js|jsx)",
    "**/*.(test|spec).(ts|tsx|js|jsx)",
  ],

  // Optional: ignore build output
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],

  // If you use path aliases like @/...
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",

    // CSS modules / CSS imports
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",
  },
};

module.exports = createJestConfig(customJestConfig);
