module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
          'module-resolver',
          {
            root: ['./src'],
            extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
            alias: {
              ".": ".",
              "@components": ["./src/components"],
              "@api": ["./src/api"],
              "@navigation": ["./src/navigation"],
              "@models": ["./src/models"],
              "@hooks": ["./src/hooks"],
              "@context": ["./src/context"],
              "@data": ["./src/data"],
              "@assets": ["./assets"],
            }
          }
      ]
    ]
  };
};
