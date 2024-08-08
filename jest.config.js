/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  // Use ts-jest preset for testing TypeScript files with Jest
  preset: "ts-jest",

  // Set the test environment to node
  testEnvironment: "node",

  // Define the root directory for Jest tests
  roots: ["<rootDir>/tests"],

  // Use ts-jest to transform TypeScript files
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },

  // Regular expressions to find test files
  testRegex: "((\\.|/)(test|spec))\\.[jt]sx?$",

  // File extensions to recognize in module resolution
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};
