export default class Page {
  settings = [
    {
      name: "label",
      icon: `<svg xmlns='http://www.w3.org/2000/svg' height='20' width='20' class='ionicon' viewBox='0 0 512 512'><title>Create</title><path d='M459.94 53.25a16.06 16.06 0 00-23.22-.56L424.35 65a8 8 0 000 11.31l11.34 11.32a8 8 0 0011.34 0l12.06-12c6.1-6.09 6.67-16.01.85-22.38zM399.34 90L218.82 270.2a9 9 0 00-2.31 3.93L208.16 299a3.91 3.91 0 004.86 4.86l24.85-8.35a9 9 0 003.93-2.31L422 112.66a9 9 0 000-12.66l-9.95-10a9 9 0 00-12.71 0z'/><path d='M386.34 193.66L264.45 315.79A41.08 41.08 0 01247.58 326l-25.9 8.67a35.92 35.92 0 01-44.33-44.33l8.67-25.9a41.08 41.08 0 0110.19-16.87l122.13-121.91a8 8 0 00-5.65-13.66H104a56 56 0 00-56 56v240a56 56 0 0056 56h240a56 56 0 0056-56V199.31a8 8 0 00-13.66-5.65z'/></svg>`,
      value: "#",
      onClick: (_event) => {
        this.data.label = prompt("What is the new label?");
        this.wrapperEl.innerHTML = this.renderItem();
      },
    },
  ];
  wrapperEl: any;
  data: any;
  api: any;

  static get toolbox() {
    return {
      title: "Input",
      icon: `<svg xmlns='http://www.w3.org/2000/svg' height='20' width='20' class='ionicon' viewBox='0 0 512 512'><title>Enter</title><path d='M176 176v-40a40 40 0 0140-40h208a40 40 0 0140 40v240a40 40 0 01-40 40H216a40 40 0 01-40-40v-40' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32'/><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32' d='M272 336l80-80-80-80M48 256h288'/></svg>`,
    };
  }

  constructor({ data, api }) {
    this.data = data;
    this.api = api;
  }

  renderItem() {
    return `<ion-item>
    ${
      this.data?.label
        ? `<ion-label position="${
            this.data?.labelPosition ? this.data.labelPosition : "stacked"
          }">${this.data.label}</ion-label>`
        : ""
    }
    <ion-input name="${this.data.name}" type="${
      this.data?.type ? this.data.type : "text"
    }" value="${this.data?.value ? this.data.value : ""}" placeholder="${
      this.data?.placeholder ? this.data.placeholder : ""
    }"></ion-input>
  </ion-item>`;
  }

  render() {
    this.wrapperEl = document.createElement("div");
    this.wrapperEl.innerHTML = this.renderItem();
    return this.wrapperEl;
  }

  renderSettings() {
    const wrapper = document.createElement("div");
    this.settings.forEach((setting) => {
      let button = document.createElement("div");
      button.classList.add("cdx-settings-button");
      button.innerHTML = setting.icon;
      if (typeof setting?.onClick === "function") {
        button.addEventListener("click", setting.onClick.bind(this));
      }

      wrapper.appendChild(button);
    });

    return wrapper;
  }

  save(itemEl) {
    return {
      label: itemEl.querySelector("ion-label")?.textContent
        ? itemEl.querySelector("ion-label").textContent
        : null,
      labelPosition: itemEl.querySelector("ion-label")?.position
        ? itemEl.querySelector("ion-label").position
        : null,
      placeholder: itemEl.querySelector("ion-input")?.placeholder
        ? itemEl.querySelector("ion-input").placeholder
        : null,
      name: itemEl.querySelector("ion-input")?.name
        ? itemEl.querySelector("ion-input").name
        : null,
      type: itemEl.querySelector("ion-input")?.type
        ? itemEl.querySelector("ion-input").type
        : null,
    };
  }
}
