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
          console.log("I Ran");
        }, 5000);
      },
    },
  },
} as ComponentPresets;
