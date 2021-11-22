import { Config } from "@stencil/core";

import { namespace } from "./package.json";

export const config: Config = {
  namespace,
  buildEs5: false,
  taskQueue: "async",
  plugins: [],
  globalStyle: "src/css/global.css",
  globalScript: "src/global.ts",
  devServer: {
    reloadStrategy: "hmr",
    openBrowser: false,
  },
  outputTargets: [
    {
      type: "www",
      serviceWorker: null,
    },
    // creates /dist dir
    {
      type: "dist",
      copy: [
        // copy fonts into static for storybook and stencil build
        { src: "fonts" },
      ],
    },
    // one file in es6
    {
      type: "dist-custom-elements-bundle",
    },
    // creates readme.md for components
    {
      type: "docs-readme",
    },
    // create components(.d.ts|json) into dist
    {
      type: "docs-json",
      file: `dist/components.json`,
    },
    {
      type: "docs-json",
      file: `www/core.json`,
    },
  ],
};
