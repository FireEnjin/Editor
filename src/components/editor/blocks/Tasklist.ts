import { Color } from "@ionic/core";
import {
  extractContentAfterCaret,
  fragmentToHtml,
  make,
  getHTML,
  moveCaret,
} from "./utils";

export default class Tasklist {
  elements: any;
  readOnly: boolean;
  api: any;
  data: any;
  progress = 0;
  progressBarEl: any;
  color: Color = "success";
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
  settings = [
    {
      name: "color",
      innerHTML: `<svg width="20" height="20" xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Color Fill</title><path d='M416 480c-35.29 0-64-29.11-64-64.88 0-33.29 28.67-65.4 44.08-82.64 1.87-2.1 3.49-3.91 4.68-5.31a19.94 19.94 0 0130.55 0c1.13 1.31 2.63 3 4.36 4.93 15.5 17.3 44.33 49.51 44.33 83.05 0 35.74-28.71 64.85-64 64.85zM398.23 276.64L166.89 47.22a52.1 52.1 0 00-73.6 0l-4.51 4.51a53.2 53.2 0 00-15.89 37.33A51.66 51.66 0 0088.14 126l41.51 41.5L45 252a44.52 44.52 0 00-13 32 42.81 42.81 0 0013.5 30.84l131.24 126a44 44 0 0061.08-.18l124.11-120.28a15.6 15.6 0 018.23-4.29 69.21 69.21 0 0111.93-.86h.3a22.53 22.53 0 0015.84-38.59zM152.29 144.85l-41.53-41.52a20 20 0 010-28.34l5.16-5.15a20.07 20.07 0 0128.39 0L186 111.21z'/></svg>`,
      value: "success",
      onClick: () => {
        try {
          this.color = this.nextArrayItem(this.colorOptions, this.color);
          this.api.blocks
            .getBlockByIndex(this.api.blocks.getCurrentBlockIndex())
            .holder.querySelectorAll("ion-checkbox")
            .forEach((checkboxEl) => {
              checkboxEl.color = this.color;
            });
          this.api.blocks
            .getBlockByIndex(this.api.blocks.getCurrentBlockIndex())
            .holder.querySelector("ion-progress-bar").color = this.color;
        } catch (err) {
          console.log("Error setting button alignment!");
        }
      },
    },
  ];

  /**
   * Return all items elements
   *
   * @returns {Element[]}
   */
  get items(): any[] {
    return Array.from(
      this.elements.wrapper.querySelectorAll(`.${this.CSS.item}`)
    );
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
   * Allow to use native Enter behaviour
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
        '<svg width="15" height="15" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 15a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15zm0-2.394a5.106 5.106 0 1 0 0-10.212 5.106 5.106 0 0 0 0 10.212zm-.675-4.665l2.708-2.708 1.392 1.392-2.708 2.708-1.392 1.391-2.971-2.971L5.245 6.36l1.58 1.58z"/></svg>',
      title: "Tasklist",
    };
  }

  /**
   * Allow Checkbox Tool to be converted to/from other block
   *
   * @returns {{export: Function, import: Function}}
   */
  static get conversionConfig() {
    return {
      /**
       * To create exported string from the checkbox, concatenate items by dot-symbol.
       *
       * @param {TasklistData} data - tasklist data to create a string from that
       * @returns {string}
       */
      export: (data) => {
        return data.items.map(({ text }) => text).join(". ");
      },
      /**
       * To create a tasklist from other block's string, just put it at the first item
       *
       * @param {string} string - string to create list tool data from that
       * @returns {TasklistData}
       */
      import: (string) => {
        return {
          items: [
            {
              text: string,
              checked: false,
            },
          ],
        };
      },
    };
  }

  /**
   * Render plugin`s main Element and fill it with saved data
   *
   * @param {object} options - block constructor options
   * @param {TasklistData} options.data - previously saved data
   * @param {object} options.config - user config for Tool
   * @param {object} options.api - Editor.js API
   * @param {boolean} options.readOnly - read only mode flag
   */
  constructor({ data, api, readOnly }) {
    /**
     * HTML nodes
     *
     * @private
     */
    this.elements = {
      wrapper: null,
      items: [],
    };
    this.readOnly = readOnly;
    this.api = api;
    /**
     * Fill or create tool's data structure
     */
    this.data = data || {};
  }

  /**
   * Returns tasklist tag with items
   *
   * @returns {Element}
   */
  render() {
    this.elements.wrapper = make(
      "ion-list",
      [this.CSS.baseBlock, this.CSS.wrapper],
      {
        style: "padding-bottom: 0px;",
      }
    );

    /**
     * If there is no data, create first empty item
     */
    if (!this.data.items) {
      setTimeout(() => {
        this.elements.wrapper
          .querySelector("ion-item:first-of-type > ion-label")
          .focus();
      }, 200);
      this.data.items = [
        {
          text: "",
          checked: false,
        },
      ];
    }

    setTimeout(() => {
      this.progressBarEl = this.api.blocks
        .getBlockByIndex(this.api.blocks.getCurrentBlockIndex())
        .holder.querySelector("ion-progress-bar");
      this.setProgress();
    }, 200);

    this.data.items.forEach((item) => {
      const newItem = this.createTasklistItem(item);

      this.elements.wrapper.appendChild(newItem);
    });

    this.elements.wrapper.appendChild(
      make("ion-progress-bar", null, {
        color: this.color,
        value: this.progress,
      })
    );

    /**
     * If read-only mode is on, do not bind events
     */
    if (this.readOnly) {
      return this.elements.wrapper;
    }

    /**
     * Add event-listeners
     */
    this.elements.wrapper.addEventListener(
      "keydown",
      (event) => {
        const [ENTER, BACKSPACE] = [13, 8]; // key codes

        switch (event.keyCode) {
          case ENTER:
            this.enterPressed(event);
            break;
          case BACKSPACE:
            this.backspace(event);
            break;
        }
      },
      false
    );

    this.elements.wrapper.addEventListener("ionChange", (event) => {
      this.toggleCheckbox(event);
      this.setProgress();
    });

    return this.elements.wrapper;
  }

  setProgress() {
    let completed = 0;
    for (const item of this.items) {
      console.log(item);
      completed =
        completed + (item?.querySelector("ion-checkbox")?.checked ? 1 : 0);
    }
    const progressMath = completed / this.items.length;
    this.progress =
      isFinite(progressMath) && progressMath > 0 ? progressMath : 0;
    this.progressBarEl.value = this.progress;
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

  /**
   * Return Tasklist data
   *
   * @returns {TasklistData}
   */
  save() {
    /**
     * @type {TasklistItem[]}
     */
    let items = this.items.map((itemEl) => {
      const input = this.getItemInput(itemEl);

      return {
        text: getHTML(input),
        checked: itemEl.classList.contains(this.CSS.itemChecked),
      };
    });

    /**
     * Skip empty items
     */
    items = items.filter((item) => item.text.trim().length !== 0);

    return {
      items,
      color: this.color,
      progress: this.progress,
    };
  }

  /**
   * Validate data: check if Tasklist has items
   *
   * @param {TasklistData} savedData — data received after saving
   * @returns {boolean} false if saved data is not correct, otherwise true
   * @public
   */
  validate(savedData) {
    return !!savedData.items.length;
  }

  /**
   * Toggle tasklist item state
   *
   * @param {MouseEvent} event - click
   * @returns {void}
   */
  toggleCheckbox(event) {
    const tasklistItem = event.target.closest(`.${this.CSS.item}`);
    const checkbox = tasklistItem.querySelector(`.${this.CSS.checkbox}`);

    if (checkbox.contains(event.target)) {
      tasklistItem.classList.toggle(this.CSS.itemChecked);
    }
  }

  nextArrayItem(arr: any, currentIndex: string) {
    const i = arr.indexOf(currentIndex);
    if (i === -1) return undefined;
    return arr[(i + 1) % arr.length];
  }

  /**
   * Create Tasklist items
   *
   * @param {TasklistItem} item - data.item
   * @returns {Element} tasklistItem - new element of tasklist
   */
  createTasklistItem(
    item: {
      checked?: boolean;
      disabled?: boolean;
      text?: string;
    } = {}
  ) {
    const tasklistItem = make("ion-item", this.CSS.item);
    const checkbox = make("ion-checkbox", this.CSS.checkbox, {
      disabled: !!item.disabled,
      slot: "start",
      color: this.color,
    });
    const textField = make("ion-label", this.CSS.textField, {
      innerHTML: item.text ? item.text : "",
      contentEditable: !this.readOnly,
      style: "z-index: 2;",
    });

    if (item.checked) {
      tasklistItem.classList.add(this.CSS.itemChecked);
    }

    tasklistItem.appendChild(checkbox);
    tasklistItem.appendChild(textField);

    return tasklistItem;
  }

  /**
   * Append new elements to the list by pressing Enter
   *
   * @param {KeyboardEvent} event - keyboard event
   */
  enterPressed(event) {
    event.preventDefault();

    const items = this.items;
    const currentItem = document.activeElement.closest(`.${this.CSS.item}`);
    const currentItemIndex = items.indexOf(currentItem);
    const isLastItem = currentItemIndex === items.length - 1;

    /**
     * Prevent tasklist item generation if it's the last item and it's empty
     * and get out of tasklist
     */
    if (isLastItem && items.length > 1) {
      const currentItemText = getHTML(this.getItemInput(currentItem));
      const isEmptyItem = currentItemText.length === 0;

      if (isEmptyItem) {
        const currentBlockIndex = this.api.blocks.getCurrentBlockIndex();

        currentItem.remove();

        setTimeout(() => {
          this.setProgress();
        }, 200);

        this.api.blocks.insert();
        this.api.caret.setToBlock(currentBlockIndex + 1);

        return;
      }
    }

    /**
     * Cut content after caret
     */
    const fragmentAfterCaret = extractContentAfterCaret();
    const htmlAfterCaret = fragmentToHtml(fragmentAfterCaret);

    /**
     * Create new tasklist item
     */
    const newItem = this.createTasklistItem({
      text: htmlAfterCaret,
      checked: false,
    });

    /**
     * Insert new tasklist item as sibling to currently selected item
     */
    this.elements.wrapper.insertBefore(newItem, currentItem.nextSibling);

    /**
     * Move caret to contentEditable textField of new tasklist item
     */
    moveCaret(this.getItemInput(newItem), true);

    setTimeout(() => this.getItemInput(newItem).focus(), 100);

    this.setProgress();
  }

  /**
   * Handle backspace
   *
   * @param {KeyboardEvent} event - keyboard event
   */
  backspace(event) {
    const currentItem = event.target.closest(`.${this.CSS.item}`);
    const currentIndex = this.items.indexOf(currentItem);
    const prevItem = this.items[currentIndex - 1];

    if (!prevItem) {
      return;
    }

    const selection = window.getSelection();
    const caretAtTheBeginning = selection.focusOffset === 0;

    if (!caretAtTheBeginning) {
      return;
    }

    event.preventDefault();

    /**
     * Append content after caret to the previous item
     * and remove the current one
     */
    const fragmentAfterCaret = extractContentAfterCaret();
    const prevItemInput = this.getItemInput(prevItem);
    const prevItemChildNodesLength = prevItemInput.childNodes.length;

    prevItemInput.appendChild(fragmentAfterCaret);

    moveCaret(prevItemInput, undefined, prevItemChildNodesLength);

    currentItem.remove();
    this.setProgress();
  }

  /**
   * Styles
   *
   * @private
   * @returns {object<string>}
   */
  get CSS() {
    return {
      baseBlock: this.api.styles.block,
      wrapper: "enjin-tasklist",
      item: "enjin-tasklist__item",
      itemChecked: "enjin-tasklist__item--checked",
      checkbox: "enjin-tasklist__item-checkbox",
      textField: "enjin-tasklist__item-text",
    };
  }

  /**
   * Find and return item's content editable element
   *
   * @private
   * @param {Element} el - item wrapper
   * @returns {Element}
   */
  getItemInput(el) {
    return el.querySelector(`.${this.CSS.textField}`);
  }
}
