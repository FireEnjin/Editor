export default class Code {
  api: any;
  readOnly: boolean;
  placeholder: string;
  CSS: any;
  data: any;
  aceWidgetEl: any;
  previewEl: any;
  block;
  pasteWatcher: any;
  previewToggleKeyWatcher: any;
  icons = {
    eye: `<svg width='20' height='20' xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Eye</title><circle cx='256' cy='256' r='64'/><path d='M490.84 238.6c-26.46-40.92-60.79-75.68-99.27-100.53C349 110.55 302 96 255.66 96c-42.52 0-84.33 12.15-124.27 36.11-40.73 24.43-77.63 60.12-109.68 106.07a31.92 31.92 0 00-.64 35.54c26.41 41.33 60.4 76.14 98.28 100.65C162 402 207.9 416 255.66 416c46.71 0 93.81-14.43 136.2-41.72 38.46-24.77 72.72-59.66 99.08-100.92a32.2 32.2 0 00-.1-34.76zM256 352a96 96 0 1196-96 96.11 96.11 0 01-96 96z'/></svg>`,
    "eye-off": `<svg width='20' height='20' xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Eye Off</title><path d='M432 448a15.92 15.92 0 01-11.31-4.69l-352-352a16 16 0 0122.62-22.62l352 352A16 16 0 01432 448zM248 315.85l-51.79-51.79a2 2 0 00-3.39 1.69 64.11 64.11 0 0053.49 53.49 2 2 0 001.69-3.39zM264 196.15L315.87 248a2 2 0 003.4-1.69 64.13 64.13 0 00-53.55-53.55 2 2 0 00-1.72 3.39z'/><path d='M491 273.36a32.2 32.2 0 00-.1-34.76c-26.46-40.92-60.79-75.68-99.27-100.53C349 110.55 302 96 255.68 96a226.54 226.54 0 00-71.82 11.79 4 4 0 00-1.56 6.63l47.24 47.24a4 4 0 003.82 1.05 96 96 0 01116 116 4 4 0 001.05 3.81l67.95 68a4 4 0 005.4.24 343.81 343.81 0 0067.24-77.4zM256 352a96 96 0 01-93.3-118.63 4 4 0 00-1.05-3.81l-66.84-66.87a4 4 0 00-5.41-.23c-24.39 20.81-47 46.13-67.67 75.72a31.92 31.92 0 00-.64 35.54c26.41 41.33 60.39 76.14 98.28 100.65C162.06 402 207.92 416 255.68 416a238.22 238.22 0 0072.64-11.55 4 4 0 001.61-6.64l-47.47-47.46a4 4 0 00-3.81-1.05A96 96 0 01256 352z'/></svg>`,
  };
  settingsEl: any;
  settings = [
    {
      name: "preview",
      innerHTML: () => {
        return this.data?.preview ? this.icons["eye-off"] : this.icons.eye;
      },
      value: false,
      onClick: () => this.togglePreview(),
    },
  ];

  togglePreview() {
    try {
      this.data.preview = !this.data?.preview;
      const holder: HTMLElement = this.block.holder;
      if (this.settingsEl?.querySelector(".cdx-settings-button-preview")) {
        this.settingsEl.querySelector(
          ".cdx-settings-button-preview"
        ).innerHTML = this.icons[this.data?.preview ? "eye-off" : "eye"];
      }
      if (this.data?.preview) {
        holder.classList.add("show-preview");
        setTimeout(() => {
          if (this.previewEl?.focus) {
            this.previewEl.focus();
            this.setCaretAtEnd(this.previewEl);
          }
        }, 20);
      } else {
        holder.classList.remove("show-preview");
        setTimeout(() => {
          if (this.aceWidgetEl?.editor?.focus) {
            this.aceWidgetEl.editor.focus();
          }
        }, 20);
      }
    } catch (err) {
      console.log("Error toggling preview", err);
    }
  }

  setCaretAtEnd(node) {
    const sel = document.getSelection();
    node = node.firstChild;

    if (sel.rangeCount) {
      ["Start", "End"].forEach((pos) =>
        sel.getRangeAt(0)["set" + pos](node, node.length)
      );
    }
  }

  renderSettings() {
    this.settingsEl = document.createElement("div");

    for (const setting of this.settings) {
      let button = document.createElement("div");
      button.classList.add(
        "cdx-settings-button",
        `cdx-settings-button-${setting.name}`
      );
      button.innerHTML =
        typeof setting?.innerHTML === "function"
          ? setting.innerHTML()
          : setting.innerHTML;
      if (typeof setting?.onClick === "function") {
        button.addEventListener("click", setting.onClick);
      }

      this.settingsEl.appendChild(button);
    }

    return this.settingsEl;
  }

  /**
   * Notify core that read-only mode is supported
   *
   * @returns {boolean}
   */
  static get isReadOnlySupported() {
    return true;
  }

  /**
   * Should this tool be displayed at the Editor's Toolbox
   *
   * @returns {boolean}
   * @public
   */
  static get displayInToolbox() {
    return true;
  }

  /**
   * Allow to press Enter inside the RawTool textarea
   *
   * @returns {boolean}
   * @public
   */
  static get enableLineBreaks() {
    return true;
  }

  /**
   * Get Tool toolbox settings
   * icon - Tool icon's SVG
   * title - title to show in toolbox
   *
   * @returns {{icon: string, title: string}}
   */
  static get toolbox() {
    return {
      icon:
        '<svg width="19" height="13"><path d="M18.004 5.794c.24.422.18.968-.18 1.328l-4.943 4.943a1.105 1.105 0 1 1-1.562-1.562l4.162-4.162-4.103-4.103A1.125 1.125 0 1 1 12.97.648l4.796 4.796c.104.104.184.223.239.35zm-15.142.547l4.162 4.162a1.105 1.105 0 1 1-1.562 1.562L.519 7.122c-.36-.36-.42-.906-.18-1.328a1.13 1.13 0 0 1 .239-.35L5.374.647a1.125 1.125 0 0 1 1.591 1.591L2.862 6.341z"/></svg>',
      title: "Raw HTML",
    };
  }

  /**
   * @typedef {object} RawData — plugin saved data
   * @param {string} html - previously saved HTML code
   * @property
   */

  /**
   * Render plugin`s main Element and fill it with saved data
   *
   * @param {RawData} data — previously saved HTML data
   * @param {object} config - user config for Tool
   * @param {object} api - CodeX Editor API
   * @param {boolean} readOnly - read-only mode flag
   */
  constructor({ data, config, api, readOnly, block }) {
    this.api = api;
    this.readOnly = readOnly;
    this.block = block;

    this.placeholder = config.placeholder ? config.placeholder : "";

    this.CSS = {
      baseClass: this.api.styles.block,
      input: this.api.styles.input,
      wrapper: "ce-code-tool",
      textarea: "ce-code-tool__textarea",
    };

    this.data = {
      html: data.html || "",
      preview: data.preview || false,
    };

    this.aceWidgetEl = null;
  }

  injectScript(src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.async = true;
      script.src = src;
      script.addEventListener("load", resolve);
      script.addEventListener("error", () => reject("Error loading script."));
      script.addEventListener("abort", () => reject("Script loading aborted."));
      document.head.appendChild(script);
    });
  }

  /**
   * Return Tool's view
   *
   * @returns {HTMLDivElement} this.element - RawTool's wrapper
   * @public
   */
  render() {
    const wrapper = document.createElement("div");
    const renderingTime = 100;

    this.aceWidgetEl = document.createElement("ace-widget");
    this.aceWidgetEl.baseUrl = "/build/ace-builds/";
    this.aceWidgetEl.mode = "ace/mode/html";
    wrapper.classList.add(this.CSS.baseClass, this.CSS.wrapper);

    this.aceWidgetEl.classList.add(this.CSS.textarea, this.CSS.input);
    this.aceWidgetEl.value = this.data?.html ? this.data.html : "";
    this.aceWidgetEl.enableLiveAutocompletion = true;
    this.aceWidgetEl.enableSnippets = true;
    this.aceWidgetEl.placeholder = this.placeholder;

    if (this.readOnly) {
      this.aceWidgetEl.disabled = true;
    } else {
      this.aceWidgetEl.addEventListener("input", () => {
        this.previewEl.innerHTML = this.aceWidgetEl?.editor?.getValue
          ? this.aceWidgetEl.editor.getValue()
          : "";
      });
    }

    wrapper.appendChild(this.aceWidgetEl);

    this.previewEl = document.createElement("div");
    this.previewEl.classList.add("html-preview");
    this.previewEl.contentEditable = "true";
    this.previewEl.addEventListener("input", () => {
      this.aceWidgetEl.editor.setValue(
        this.previewEl?.innerHTML ? this.previewEl.innerHTML : ""
      );
    });
    this.previewEl.innerHTML = this.data?.html ? this.data.html : "";

    wrapper.appendChild(this.previewEl);
    setTimeout(() => {
      this.block.stretched = true;
      if (this.data?.preview) {
        const holder: HTMLElement = this.block.holder;
        holder.classList.add("show-preview");
        if (this.previewEl?.focus) {
          this.previewEl.focus();
        }
      } else {
        if (this.aceWidgetEl?.editor?.focus) {
          this.aceWidgetEl.editor.focus();
        }
      }
      if (!this.pasteWatcher) {
        this.pasteWatcher = (event) => {
          event.preventDefault();
          event.stopPropagation();
        };
        this.block.holder.addEventListener(
          "paste",
          this.pasteWatcher.bind(this)
        );
      }
      if (!this.previewToggleKeyWatcher) {
        this.previewToggleKeyWatcher = (event) => {
          if (event?.keyCode === 80 && !!event?.altKey) {
            this.togglePreview();
          }
        };
        this.block.holder.addEventListener(
          "keydown",
          this.previewToggleKeyWatcher.bind(this)
        );
      }
      // TODO: Will have to in-house the ace editor solution in order to implement this
      //this.aceWidgetEl.editor.setOption("enableEmmet", true);
    }, renderingTime);

    return wrapper;
  }

  /**
   * Extract Tool's data from the view
   *
   * @param {HTMLDivElement} rawToolsWrapper - RawTool's wrapper, containing textarea with raw HTML code
   * @returns {RawData} - raw HTML code
   * @public
   */
  save(_rawToolsWrapper) {
    return {
      html: this.aceWidgetEl?.editor?.getValue
        ? this.aceWidgetEl.editor.getValue()
        : "",
      preview: !!this.data.preview,
    };
  }

  /**
   * Default placeholder for RawTool's textarea
   *
   * @public
   * @returns {string}
   */
  static get DEFAULT_PLACEHOLDER() {
    return "Enter HTML code";
  }

  /**
   * Automatic sanitize config
   */
  static get sanitize() {
    return {
      html: true, // Allow HTML tags
    };
  }
}
