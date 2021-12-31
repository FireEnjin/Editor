import { OrganismPresets } from "@fireenjin/docs/dist/types/interfaces";

export default {
  defaut: {
    name: "Default",
    props: {
      value: `<ion-card>Testing</ion-card>`,
    },
    hooks: {
      onComponentWillLoad: ({ organismEl }) => {
        organismEl.value = `<ion-card>Testing</ion-card>`;
      },
    },
  },
} as OrganismPresets;
