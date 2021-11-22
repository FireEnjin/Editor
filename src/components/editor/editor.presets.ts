import { OrganismPresets } from "@madnesslabs/fireenjin-designer/dist/types/interfaces";

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
    innerHTML: () =>
      `<ion-app><ion-content><fireenjin-editor></fireenjin-editor></ion-content></ion-app>`,
  },
} as OrganismPresets;
