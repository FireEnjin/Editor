import { OrganismPresets } from "@madnesslabs/fireenjin-designer/dist/types/interfaces";

export default {
  defaut: {
    name: "Default",
    hooks: {
      async onComponentDidLoad({ organismEl }) {
        const enjinEditorEl = organismEl.querySelector("enjin-editor");
        const editorJs = await enjinEditorEl.getInstance();
        setTimeout(() => {
          editorJs.blocks.render({});
        }, 5000);
      },
    },
    innerHTML: () =>
      `<ion-app><ion-content><enjin-editor></enjin-editor></ion-content></ion-app>`,
  },
} as OrganismPresets;
