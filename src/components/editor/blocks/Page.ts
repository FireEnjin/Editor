export default class Page {
  settings = [
    {
      name: "Link",
      icon: `<svg xmlns='http://www.w3.org/2000/svg' height="20" width="20" class='ionicon' viewBox='0 0 512 512'><title>Link</title><path d='M200.66 352H144a96 96 0 010-192h55.41M312.59 160H368a96 96 0 010 192h-56.66M169.07 256h175.86' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='48'/></svg>`,
      value: "#",
    },
  ];
  data: any;
  api: any;

  static get toolbox() {
    return {
      title: "Page",
      icon: `<svg xmlns='http://www.w3.org/2000/svg' height="20" width="20" class='ionicon' viewBox='0 0 512 512'><title>Document</title><path d='M428 224H288a48 48 0 01-48-48V36a4 4 0 00-4-4h-92a64 64 0 00-64 64v320a64 64 0 0064 64h224a64 64 0 0064-64V228a4 4 0 00-4-4z'/><path d='M419.22 188.59L275.41 44.78a2 2 0 00-3.41 1.41V176a16 16 0 0016 16h129.81a2 2 0 001.41-3.41z'/></svg>`,
    };
  }

  constructor({ data, api }) {
    this.data = data;
    this.api = api;
  }

  render() {
    const itemEl = document.createElement("ion-card");
    itemEl.innerHTML = `<ion-item detail lines="none" href="${
      this.data?.href ? this.data.href : "#"
    }"><ion-icon slot="start" name="document"></ion-icon><ion-label>${
      this.data?.name
    }</ion-label></ion-item>`;
    return itemEl;
  }

  renderSettings() {
    const wrapper = document.createElement("div");
    document.addEventListener("enjinSelectPage", (event: any) => {
      console.log(event);
      const itemEl = this.api.blocks
        .getBlockByIndex(event.detail.blockIndex)
        .holder.querySelector("ion-item");
      itemEl.querySelector("ion-label").textContent = event.detail?.page?.name
        ? event.detail.page.name
        : "Home";
      itemEl.href = `/editor/${
        event.detail?.page?.id ? event.detail?.page?.id : "home"
      }`;
    });
    this.settings.forEach((setting) => {
      let button = document.createElement("div");
      button.classList.add("cdx-settings-button");
      button.innerHTML = setting.icon;
      button.addEventListener("click", (event) => {
        try {
          document.body.dispatchEvent(
            new CustomEvent("enjinToggleMenu", {
              detail: {
                event,
                selectingPage: true,
                blockIndex: this.api.blocks.getCurrentBlockIndex(),
              },
            })
          );
        } catch (err) {
          console.log("Error setting button shape!");
        }
      });

      wrapper.appendChild(button);
    });

    return wrapper;
  }

  save(cardEl) {
    return {
      name: cardEl.querySelector("ion-label").textContent,
      href: cardEl.querySelector("ion-item").href,
    };
  }
}
