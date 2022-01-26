import { OrganismPresets } from "@fireenjin/docs/dist/types/interfaces";

export default {
  defaut: {
    name: "Default",
    props: {
      partials: [{ id: "test", html: "<p>Test</p>" }],
    },
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
