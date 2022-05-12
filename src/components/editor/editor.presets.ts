import { ComponentPresets } from "@fireenjin/docs";

export default {
  defaut: {
    name: "Default",
    props: {
      partials: [{ id: "test", html: "<p>Test</p>" }],
    },
    innerHTML: () => `<fireenjin-editor></fireenjin-editor>`,
  },
} as ComponentPresets;
