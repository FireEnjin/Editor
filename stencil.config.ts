import { Config } from "@stencil/core";
import nodePolyfills from "rollup-plugin-node-polyfills";

import { namespace } from "./package.json";

export const config: Config = {
  namespace,
  buildEs5: false,
  plugins: [],
  globalStyle: "src/css/global.css",
  globalScript: "src/global.ts",
  rollupPlugins: {
    after: [nodePolyfills()],
  },
  outputTargets: [
    {
      type: "www",
      serviceWorker: null,
      copy: [
        { src: "../node_modules/monaco-editor/min/vs", dest: "monaco-editor" },
      ],
    },
    // creates /dist dir
    {
      type: "dist",
      copy: [
        // copy fonts into static for storybook and stencil build
        { src: "fonts" },
        { src: "../node_modules/monaco-editor/min/vs", dest: "monaco-editor" },
      ],
    },
    // one file in es6
    {
      type: "dist-custom-elements",
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
