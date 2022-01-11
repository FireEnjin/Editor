import { OrganismPresets } from "@fireenjin/docs/dist/types/interfaces";

export default {
  defaut: {
    name: "Default",
    hooks: {
      async onComponentDidLoad({ organismEl }) {
        const fireenjinEditorEl = organismEl.querySelector("fireenjin-editor");
        const editorJs = await fireenjinEditorEl.getInstance();
        setTimeout(() => {
          editorJs.blocks.render({});
        }, 5000);
      },
    },
    innerHTML: () => `<fireenjin-editor></fireenjin-editor>`,
  },
} as OrganismPresets;
