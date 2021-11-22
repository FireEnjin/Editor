export default class Partial {
  settings = [
    {
      name: "template",
      innerHTML: `<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>List Circle</title><path d='M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm-88 302a24 24 0 1124-24 24 24 0 01-24 24zm0-71a24 24 0 1124-24 24 24 0 01-24 24zm0-73a24 24 0 1124-24 24 24 0 01-24 24zm184 135H224a16 16 0 010-32h128a16 16 0 010 32zm0-71H224a16 16 0 010-32h128a16 16 0 010 32zm0-72H224a16 16 0 010-32h128a16 16 0 010 32z' height='20' width='20' fill='currentColor' /></svg>`,
      value: null,
      onClick: () => {
        this.presentModal();
      },
    },
  ];
  data: any;
  api: any;
  modalEl: any;
  loaded = false;
  partials = [];
  selectedPartial: any;
  partialWrapperEl: HTMLElement;
  blockId: string;

  static get toolbox() {
    return {
      title: "Partial",
      icon:
        "<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512' height='20' width='20'><title>Extension Puzzle</title><path d='M345.14 480H274a18 18 0 01-18-18v-27.71a31.32 31.32 0 00-9.71-22.77c-7.78-7.59-19.08-11.8-30.89-11.51-21.36.5-39.4 19.3-39.4 41.06V462a18 18 0 01-18 18H87.62A55.62 55.62 0 0132 424.38V354a18 18 0 0118-18h27.71c9.16 0 18.07-3.92 25.09-11a42.06 42.06 0 0012.2-29.92C114.7 273.89 97.26 256 76.91 256H50a18 18 0 01-18-18v-70.38A55.62 55.62 0 0187.62 112h55.24a8 8 0 008-8v-6.48A65.53 65.53 0 01217.54 32c35.49.62 64.36 30.38 64.36 66.33V104a8 8 0 008 8h55.24A54.86 54.86 0 01400 166.86v55.24a8 8 0 008 8h5.66c36.58 0 66.34 29 66.34 64.64 0 36.61-29.39 66.4-65.52 66.4H408a8 8 0 00-8 8v56A54.86 54.86 0 01345.14 480z' fill='currentColor' /></svg>",
    };
  }

  constructor({ api, data, config }) {
    this.data = data;
    this.api = api;
    this.blockId = this.makeid(26);
    if (config?.partials && typeof config.partials === "object") {
      this.partials = config.partials;
    } else if (config?.partials && typeof config.partials === "function") {
      this.partials = config.partials();
    } else if (localStorage.getItem("enjin-editor-partials")) {
      this.partials = JSON.parse(localStorage.getItem("enjin-editor-partials"));
    }

    this.createModal();
    document.addEventListener("enjinModalClose", () => {
      if (!this.modalEl) return;
      this.modalEl.dismiss();
    });

    document.addEventListener("enjinEditorClick", (event: any) => {
      const partialWrapperEl = document.querySelector(
        `.editor-partial#${this.blockId}`
      );
      if (
        !event?.detail?.template ||
        event?.detail?.blockId !== this.blockId ||
        !partialWrapperEl
      )
        return;
      this.selectedPartial = event.detail.template;
      partialWrapperEl.innerHTML = this.selectedPartial.html;
      if (!this.modalEl) return;
      this.modalEl.dismiss();
    });
  }

  makeid(length) {
    var result = "";
    var characters = "abcdefghijklmnopqrstuvwxyz";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  createModal() {
    const partials = this.partials;
    const blockId = this.blockId;
    customElements.define(
      `template-select-modal-${blockId}`,
      class extends HTMLElement {
        connectedCallback() {
          this.innerHTML = `
    <ion-header>
      <ion-toolbar>
        <ion-title>Select a Template</ion-title>
        <ion-buttons slot="primary">
          <ion-button onClick="document.dispatchEvent(new CustomEvent('enjinModalClose', {detail: {event}}));">
            <ion-icon slot="icon-only" name="close"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-list>
          ${partials
            .map(
              (
                partial
              ) => `<ion-item onClick='event.preventDefault();document.dispatchEvent(new CustomEvent("enjinEditorClick", {
              detail: {
                event: event,
                template: {
                  id: \`${partial.id}\`,
                  name: \`${partial.name ? partial.name : partial.subject}\`,
                  html: \`${partial.html}\`
                },
                blockId: \`${blockId}\` 
              }
            }));' detail="true" href="#">
            <ion-label>
              <h2>${partial.name ? partial.name : partial.subject}</h2>
              <div style="pointer-events: none;">${partial.html}</div>
            </ion-label>
          </ion-item>`
            )
            .join("")}
      </ion-list>
    </ion-content>`;
        }
      }
    );
  }

  presentModal() {
    this.modalEl = document.createElement("ion-modal");
    this.modalEl.component = `template-select-modal-${this.blockId}`;
    this.modalEl.cssClass = "my-custom-class";
    this.modalEl.componentProps = {
      partials: this.data?.partials ? this.data.partials : {},
    };

    document.body.appendChild(this.modalEl);
    return this.modalEl.present();
  }

  render() {
    if (this.data?.templateId && this.partials) {
      for (const partial of this.partials) {
        if (partial.id === this.data.templateId) this.selectedPartial = partial;
      }
    }
    if (!this.loaded && !this.data?.templateId) {
      this.presentModal();
    }
    this.loaded = true;
    this.partialWrapperEl = document.createElement("div");
    this.partialWrapperEl.id = this.blockId;
    this.partialWrapperEl.classList.add("editor-partial");
    this.partialWrapperEl.innerHTML = this.selectedPartial?.html
      ? this.selectedPartial.html
      : `<caption>Please select a template</caption>`;

    return this.partialWrapperEl;
  }

  renderSettings() {
    const wrapper = document.createElement("div");

    for (const setting of this.settings) {
      let button = document.createElement("div");
      button.classList.add("cdx-settings-button");
      button.innerHTML = setting.innerHTML;
      if (typeof setting?.onClick === "function") {
        button.addEventListener("click", setting.onClick);
      }

      wrapper.appendChild(button);
    }

    return wrapper;
  }

  save() {
    return {
      templateId: this.selectedPartial?.id ? this.selectedPartial.id : null,
    };
  }
}
