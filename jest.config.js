module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    globals: {
      "ts-jest": {
        tsConfig: "tsconfig.json"
      }
    },
    moduleDirectories: ["src", "node_modules"],
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    modulePathIgnorePatterns: ["dist/"],
    coverageThreshold: {
      global: {
        lines: 50,
        functions: 30,
        statements: 50
      }
    }
  };
  