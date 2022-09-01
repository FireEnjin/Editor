export default class Component {
  settings = [
    {
      name: "template",
      innerHTML: `<svg height="20" width="20" xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>List Circle</title><path d='M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm-88 302a24 24 0 1124-24 24 24 0 01-24 24zm0-71a24 24 0 1124-24 24 24 0 01-24 24zm0-73a24 24 0 1124-24 24 24 0 01-24 24zm184 135H224a16 16 0 010-32h128a16 16 0 010 32zm0-71H224a16 16 0 010-32h128a16 16 0 010 32zm0-72H224a16 16 0 010-32h128a16 16 0 010 32z' fill='currentColor' /></svg>`,
      value: null,
      onClick: () => {
        this.presentModal();
      },
    },
    {
      name: "open",
      innerHTML: `<svg height="20" width="20" xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><title>Open</title><path d="M384 224v184a40 40 0 01-40 40H104a40 40 0 01-40-40V168a40 40 0 0140-40h167.48M336 64h112v112M224 288L440 72" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"  /></svg>`,
      onClick: () => {
        document.dispatchEvent(
          new CustomEvent("fireenjinTrigger", {
            detail: {
              event,
              name: `linkTemplate`,
              payload: {
                template: this.selectedPartial,
                blockId: this.blockId,
              },
            },
          })
        );
      },
    },
    {
      name: "style",
      innerHTML: `<svg height="20" width="20" xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><title>Logo Css3</title><path d="M64 32l35 403.22L255.77 480 413 435.15 448 32zm290.68 334.9L256.07 395l-98.46-28.24-6.75-77.76h48.26l3.43 39.56 53.59 15.16.13.28 53.47-14.85 5.64-64.15H203l-4-50h120.65l4.35-51H140l-4-49h240.58z"/></svg>`,
      value: false,
      onClick: () => {
        this.data.styles = prompt(
          "Custom block CSS styles:",
          this.data?.styles
        );
        this.partialWrapperEl.style.cssText = this.data?.styles;
        this.block.save();
      },
    },
  ];
  block;
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
      title: "Component",
      icon: "<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512' height='20' width='20'><title>Extension Puzzle</title><path d='M345.14 480H274a18 18 0 01-18-18v-27.71a31.32 31.32 0 00-9.71-22.77c-7.78-7.59-19.08-11.8-30.89-11.51-21.36.5-39.4 19.3-39.4 41.06V462a18 18 0 01-18 18H87.62A55.62 55.62 0 0132 424.38V354a18 18 0 0118-18h27.71c9.16 0 18.07-3.92 25.09-11a42.06 42.06 0 0012.2-29.92C114.7 273.89 97.26 256 76.91 256H50a18 18 0 01-18-18v-70.38A55.62 55.62 0 0187.62 112h55.24a8 8 0 008-8v-6.48A65.53 65.53 0 01217.54 32c35.49.62 64.36 30.38 64.36 66.33V104a8 8 0 008 8h55.24A54.86 54.86 0 01400 166.86v55.24a8 8 0 008 8h5.66c36.58 0 66.34 29 66.34 64.64 0 36.61-29.39 66.4-65.52 66.4H408a8 8 0 00-8 8v56A54.86 54.86 0 01345.14 480z' fill='currentColor' /></svg>",
    };
  }

  constructor({ api, block, data, config }) {
    this.data = data;
    this.api = api;
    this.block = block;
    this.blockId = this.makeid(26);
    if (config?.partials && typeof config.partials === "object") {
      this.partials = config.partials;
    } else if (config?.partials && typeof config.partials === "function") {
      this.partials = config.partials();
    } else if (localStorage.getItem("fireenjin-editor-components")) {
      this.partials = JSON.parse(
        localStorage.getItem("fireenjin-editor-components")
      );
    }

    document.addEventListener("fireenjinModalClose", () => {
      if (!this.modalEl) return;
      this.modalEl.dismiss();
      this.modalEl = null;
    });

    document.addEventListener("fireenjinEditorClick", (event: any) => {
      const partialWrapperEl = document.querySelector(
        `.editor-component#${this.blockId}`
      );
      if (
        !event?.detail?.template ||
        event?.detail?.blockId !== this.blockId ||
        !partialWrapperEl
      )
        return;
      this.selectedPartial = event.detail.template;
      partialWrapperEl.innerHTML = this.selectedPartial.html;
      document.dispatchEvent(
        new CustomEvent("fireenjinChange", {
          detail: {
            event,
            name: `block-${this.blockId}`,
            value: this.selectedPartial.html,
          },
        })
      );
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

  presentModal() {
    if (this.modalEl) return;
    this.modalEl = document.createElement("ion-modal");
    this.modalEl.component = `fireenjin-modal-component-select`;
    this.modalEl.cssClass = "fireenjin-modal-component-select";
    this.modalEl.componentProps = {
      partials: this.partials || [],
      blockId: this.blockId,
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
    this.partialWrapperEl.classList.add("editor-component");
    this.partialWrapperEl.innerHTML = this.selectedPartial?.html
      ? `<div class="component-wrapper" style="${this.data?.styles || ""}">${
          this.selectedPartial.html
        }</div>`
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
        button.addEventListener("click", () => {
          setting.onClick();
        });
      }

      wrapper.appendChild(button);
    }

    return wrapper;
  }

  save() {
    return {
      templateId: this.selectedPartial?.id ? this.selectedPartial.id : null,
      styles: this.data?.styles || "",
    };
  }
}
