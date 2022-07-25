const { resolve } = require("path");

module.exports = {
  stories: [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)",
    "../src/**/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  logLevel: 'debug',
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-a11y',
    './localAddon/register.tsx',
    './localAddon/preset.ts'
  ],
  webpackFinal: (config, { configType }) => {

    config.module.rules.push({
      test: /\.scss$/,
      use: ["style-loader", "css-loader", "sass-loader"],
      include: resolve(__dirname, "../"),
    });

    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve?.alias,
          ...{
            containers: resolve("./src/containers"),
            components: resolve("./src/components"),
            styles: resolve("./src/styles"),
            fixtures: resolve("./src/fixtures"),
            utils: resolve("./src/utils"),
            // gql: resolve(__dirname,"./src/gql")
          }
        }
      }
    };
  },
  core: {
    builder: 'webpack5',
    channelOptions: { allowFunction: false, maxDepth: 10 },
    disableTelemetry: true,
  },
  staticDirs: ['../public'],
  features: {
    buildStoriesJson: true,
  },
};
