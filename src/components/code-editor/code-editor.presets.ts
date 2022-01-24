import { OrganismPresets } from "@fireenjin/docs/dist/types/interfaces";

export default {
  defaut: {
    name: "Default",
    props: {
      value: `<p>Test</p>`,
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
} as OrganismPresets;