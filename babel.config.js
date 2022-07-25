module.exports = function (api) {
  api.cache(true);
  // const isTest = api.env('test');

  return {
    presets: [
      "babel-preset-expo",
      "@babel/preset-typescript",
      ["@babel/preset-env", { targets: { node: "current" } }],
    ],
    plugins: ["react-native-reanimated/plugin"],
  };
};
