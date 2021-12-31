import { OrganismPresets } from "@fireenjin/docs/dist/types/interfaces";

export default {
  defaut: {
    name: "Default",
    props: {
      value: `<ion-card>
  <ion-item>
    <ion-label>Testing</ion-label>
  <ion-item>
</ion-card>`,
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
