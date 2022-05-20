export default class Button {
  leftAlignIcon = `<svg xmlns="http://www.w3.org/2000/svg" id="Layer" enable-background="new 0 0 64 64" height="20" viewBox="0 0 64 64" width="20"><path d="m54 8h-44c-1.104 0-2 .896-2 2s.896 2 2 2h44c1.104 0 2-.896 2-2s-.896-2-2-2z"></path><path d="m54 52h-44c-1.104 0-2 .896-2 2s.896 2 2 2h44c1.104 0 2-.896 2-2s-.896-2-2-2z"></path><path d="m10 23h28c1.104 0 2-.896 2-2s-.896-2-2-2h-28c-1.104 0-2 .896-2 2s.896 2 2 2z"></path><path d="m54 30h-44c-1.104 0-2 .896-2 2s.896 2 2 2h44c1.104 0 2-.896 2-2s-.896-2-2-2z"></path><path d="m10 45h28c1.104 0 2-.896 2-2s-.896-2-2-2h-28c-1.104 0-2 .896-2 2s.896 2 2 2z"></path></svg>`;
  centerAlignIcon = `<svg xmlns="http://www.w3.org/2000/svg" id="Layer" enable-background="new 0 0 64 64" height="20" viewBox="0 0 64 64" width="20"><path d="m54 8h-44c-1.104 0-2 .896-2 2s.896 2 2 2h44c1.104 0 2-.896 2-2s-.896-2-2-2z"></path><path d="m54 52h-44c-1.104 0-2 .896-2 2s.896 2 2 2h44c1.104 0 2-.896 2-2s-.896-2-2-2z"></path><path d="m46 23c1.104 0 2-.896 2-2s-.896-2-2-2h-28c-1.104 0-2 .896-2 2s.896 2 2 2z"></path><path d="m54 30h-44c-1.104 0-2 .896-2 2s.896 2 2 2h44c1.104 0 2-.896 2-2s-.896-2-2-2z"></path><path d="m46 45c1.104 0 2-.896 2-2s-.896-2-2-2h-28c-1.104 0-2 .896-2 2s.896 2 2 2z"></path></svg>`;
  rightAlignIcon = `<svg xmlns="http://www.w3.org/2000/svg" id="Layer" enable-background="new 0 0 64 64" height="20" viewBox="0 0 64 64" width="20"><path d="m54 8h-44c-1.104 0-2 .896-2 2s.896 2 2 2h44c1.104 0 2-.896 2-2s-.896-2-2-2z"></path><path d="m54 52h-44c-1.104 0-2 .896-2 2s.896 2 2 2h44c1.104 0 2-.896 2-2s-.896-2-2-2z"></path><path d="m54 19h-28c-1.104 0-2 .896-2 2s.896 2 2 2h28c1.104 0 2-.896 2-2s-.896-2-2-2z"></path><path d="m54 30h-44c-1.104 0-2 .896-2 2s.896 2 2 2h44c1.104 0 2-.896 2-2s-.896-2-2-2z"></path><path d="m54 41h-28c-1.104 0-2 .896-2 2s.896 2 2 2h28c1.104 0 2-.896 2-2s-.896-2-2-2z"></path></svg>`;
  alignOptions = ["left", "center", "right"];
  colorOptions = [
    "primary",
    "secondary",
    "tertiary",
    "success",
    "warning",
    "danger",
    "dark",
    "medium",
    "light",
  ];
  expandOptions = ["block", "full", undefined];
  fillOptions = ["clear", "default", "outline", "solid", undefined];
  settings = [
    {
      name: "shape",
      innerHTML: `<svg width="20" height="20" xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><title>Shapes</title><path fill="currentColor" d='M336 336H32a16 16 0 01-14-23.81l152-272a16 16 0 0127.94 0l152 272A16 16 0 01336 336z'/><path fill="currentColor" d='M336 160a161.07 161.07 0 00-32.57 3.32l74.47 133.27A48 48 0 01336 368H183.33A160 160 0 10336 160z'/></svg>`,
      value: "square",
      onClick: () => {
        try {
          const buttonEl = this.api.blocks
            .getBlockByIndex(this.api.blocks.getCurrentBlockIndex())
            .holder.querySelector("ion-button");
          buttonEl.shape = buttonEl.shape === "round" ? "square" : "round";
        } catch (err) {
          console.log("Error setting button shape!");
        }
      },
    },
    {
      name: "href",
      innerHTML: `<svg class="icon" width="14px" height="10px"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#link"></use></svg>`,
      value: "#",
      onClick: () => {
        try {
          const buttonEl = this.api.blocks
            .getBlockByIndex(this.api.blocks.getCurrentBlockIndex())
            .holder.querySelector("ion-button");
          const newHref = prompt(
            "Where do you want this button to link?",
            buttonEl.href
          );
          if (newHref) {
            buttonEl.href = newHref;
          }
        } catch (err) {
          console.log("Error setting button link!");
        }
      },
    },
    {
      name: "align",
      innerHTML: this.leftAlignIcon,
      value: "left",
      onClick: () => {
        try {
          const buttonEl = this.api.blocks
            .getBlockByIndex(this.api.blocks.getCurrentBlockIndex())
            .holder.querySelector("ion-button");
          const currentAlignment = this.data?.align ? this.data.align : "left";
          if (currentAlignment === "center") {
            this.data.align = "right";
            buttonEl.style.display = "table";
            buttonEl.style.margin = "10px 20px 10px auto";
          } else if (currentAlignment === "right") {
            this.data.align = "left";
            buttonEl.style.display = "inline-block";
            buttonEl.style.margin = "10px";
          } else {
            this.data.align = "center";
            buttonEl.style.display = "table";
            buttonEl.style.margin = "10px auto";
          }
        } catch (err) {
          console.log("Error setting button alignment!");
        }
      },
    },
    {
      name: "color",
      innerHTML: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" class="ionicon" viewBox="0 0 512 512"><title>Color Palette</title><path d="M441 336.2l-.06-.05c-9.93-9.18-22.78-11.34-32.16-12.92l-.69-.12c-9.05-1.49-10.48-2.5-14.58-6.17-2.44-2.17-5.35-5.65-5.35-9.94s2.91-7.77 5.34-9.94l30.28-26.87c25.92-22.91 40.2-53.66 40.2-86.59s-14.25-63.68-40.2-86.6c-35.89-31.59-85-49-138.37-49C223.72 48 162 71.37 116 112.11c-43.87 38.77-68 90.71-68 146.24s24.16 107.47 68 146.23c21.75 19.24 47.49 34.18 76.52 44.42a266.17 266.17 0 0086.87 15h1.81c61 0 119.09-20.57 159.39-56.4 9.7-8.56 15.15-20.83 15.34-34.56.21-14.17-5.37-27.95-14.93-36.84zM112 208a32 32 0 1132 32 32 32 0 01-32-32zm40 135a32 32 0 1132-32 32 32 0 01-32 32zm40-199a32 32 0 1132 32 32 32 0 01-32-32zm64 271a48 48 0 1148-48 48 48 0 01-48 48zm72-239a32 32 0 1132-32 32 32 0 01-32 32z"/></svg>`,
      value: "primary",
      onClick: () => {
        try {
          const buttonEl = this.api.blocks
            .getBlockByIndex(this.api.blocks.getCurrentBlockIndex())
            .holder.querySelector("ion-button");
          const currentColor = buttonEl.color ? buttonEl.color : "primary";
          buttonEl.color = this.nextArrayItem(this.colorOptions, currentColor);
        } catch (err) {
          console.log("Error setting button alignment!");
        }
      },
    },
    {
      name: "expand",
      innerHTML: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" class="ionicon" viewBox="0 0 512 512"><title>Expand</title><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M432 320v112H320M421.8 421.77L304 304M80 192V80h112M90.2 90.23L208 208M320 80h112v112M421.77 90.2L304 208M192 432H80V320M90.23 421.8L208 304"/></svg>`,
      value: undefined,
      onClick: () => {
        try {
          const buttonEl = this.api.blocks
            .getBlockByIndex(this.api.blocks.getCurrentBlockIndex())
            .holder.querySelector("ion-button");
          const currentExpand = buttonEl?.expand;
          buttonEl.expand = this.nextArrayItem(
            this.expandOptions,
            currentExpand
          );
        } catch (err) {
          console.log("Error setting button expand!");
        }
      },
    },
    {
      name: "fill",
      innerHTML: `<svg width="20" height="20" xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Color Fill</title><path d='M416 480c-35.29 0-64-29.11-64-64.88 0-33.29 28.67-65.4 44.08-82.64 1.87-2.1 3.49-3.91 4.68-5.31a19.94 19.94 0 0130.55 0c1.13 1.31 2.63 3 4.36 4.93 15.5 17.3 44.33 49.51 44.33 83.05 0 35.74-28.71 64.85-64 64.85zM398.23 276.64L166.89 47.22a52.1 52.1 0 00-73.6 0l-4.51 4.51a53.2 53.2 0 00-15.89 37.33A51.66 51.66 0 0088.14 126l41.51 41.5L45 252a44.52 44.52 0 00-13 32 42.81 42.81 0 0013.5 30.84l131.24 126a44 44 0 0061.08-.18l124.11-120.28a15.6 15.6 0 018.23-4.29 69.21 69.21 0 0111.93-.86h.3a22.53 22.53 0 0015.84-38.59zM152.29 144.85l-41.53-41.52a20 20 0 010-28.34l5.16-5.15a20.07 20.07 0 0128.39 0L186 111.21z'/></svg>`,
      value: "solid",
      onClick: () => {
        try {
          const buttonEl = this.api.blocks
            .getBlockByIndex(this.api.blocks.getCurrentBlockIndex())
            .holder.querySelector("ion-button");
          const currentFill = buttonEl?.fill;
          buttonEl.fill = this.nextArrayItem(this.fillOptions, currentFill);
        } catch (err) {
          console.log("Error setting button fill!");
        }
      },
    },
  ];
  data: any;
  api: any;

  static get toolbox() {
    return {
      title: "Button",
      icon: '<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" height="20" width="20"><path fill="currentColor" d="M292.3 311.93c0 42.41-39.72 41.43-43.92 41.43h-80.89v-81.69h80.89c42.56 0 43.92 31.9 43.92 40.26zm-50.15-73.13c.67 0 38.44 1 38.44-36.31 0-15.52-3.51-35.87-38.44-35.87h-74.66v72.18h74.66zM448 106.67v298.66A74.89 74.89 0 0 1 373.33 480H74.67A74.89 74.89 0 0 1 0 405.33V106.67A74.89 74.89 0 0 1 74.67 32h298.66A74.89 74.89 0 0 1 448 106.67zM338.05 317.86c0-21.57-6.65-58.29-49.05-67.35v-.73c22.91-9.78 37.34-28.25 37.34-55.64 0-7 2-64.78-77.6-64.78h-127v261.33c128.23 0 139.87 1.68 163.6-5.71 14.21-4.42 52.71-17.98 52.71-67.12z"/></svg>',
    };
  }

  constructor({ data, api }) {
    this.data = {
      text: "New Button",
      shape: "square",
      href: "#",
      align: "left",
      color: "primary",
      fill: "solid",
      expand: undefined,
      ...data,
    };
    this.api = api;
  }

  nextArrayItem(arr: any, currentIndex: string) {
    const i = arr.indexOf(currentIndex);
    if (i === -1) return undefined;
    return arr[(i + 1) % arr.length];
  }

  render() {
    const buttonEl: any = document.createElement("ion-button");
    buttonEl.style.textTransform = "none";
    if (this.data?.shape) {
      buttonEl.shape = this.data.shape;
    }
    if (this.data?.href) {
      buttonEl.href = this.data.href;
    }
    if (this.data?.align === "center") {
      buttonEl.style.display = "table";
      buttonEl.style.margin = "10px auto";
    } else if (this.data?.align === "right") {
      buttonEl.style.display = "table";
      buttonEl.style.margin = "10px 20px 10px auto";
    }
    if (this.data?.color) {
      buttonEl.color = this.data.color;
    }
    if (this.data?.expand) {
      buttonEl.expand = this.data.expand;
    }
    if (this.data?.fill) {
      buttonEl.fill = this.data.fill;
    }
    buttonEl.innerHTML = `<div contenteditable="true">${this.data?.text}</div>`;
    return buttonEl;
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

  save(button) {
    return {
      text: button.innerText,
      shape: button.shape ? button.shape : "square",
      align: this.data?.align ? this.data.align : "left",
      href: button.href ? button.href : "#",
      color: button.color ? button.color : "primary",
      expand: button.expand ? button.expand : undefined,
      fill: button.fill ? button.fill : "solid",
    };
  }
}
