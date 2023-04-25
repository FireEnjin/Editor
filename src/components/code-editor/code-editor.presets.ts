import { ComponentPresets } from "@fireenjin/docs";

export default {
  defaut: {
    name: "Default",
    props: {
      value: `<p>Test</p>`,
      autoExpand: true,
    },
    hooks: {
      onComponentDidLoad: () => {
        setTimeout(() => {
          document.querySelector("fireenjin-code-editor").focus();
        }, 5000);
      },
    },
  },
  editor: {
    name: "JSON Editor",
    props: {
      value: "{}",
      outputObject: true,
    },
  },
} as ComponentPresets;
