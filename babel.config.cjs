const { plugins } = require("@babel/preset-env/lib/plugins-compat-data");

module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel"
    ],
    overrides: [
      {
        test: /node_modules\/expo-router/,
        presets: [],
      },
    ],
    plugins: ['react-native-reanimated/plugin']
  };
};
