import {
  Build,
  Component,
  Event,
  EventEmitter,
  h,
  Listen,
  Method,
  Prop,
  State,
  Watch,
} from "@stencil/core";
import loader, { Monaco } from "@monaco-editor/loader";
import { editor } from "monaco-editor";
import { emmetHTML, emmetCSS, emmetJSX } from "emmet-monaco-es";

@Component({
  tag: "fireenjin-code-editor",
  styleUrl: "code-editor.css",
})
export class CodeEditor {
  ignoreEvent = false;
  private monaco: Monaco;
  codeEl: HTMLElement;
  editor: editor.IStandaloneCodeEditor;
  emmet: any;
  lastPosition: any;
  debounceResize;

  @Event() fireenjinCodeBlur: EventEmitter;
  @Event() fireenjinCodeChange: EventEmitter;
  @Event() fireenjinError: EventEmitter;

  @Prop() debounceTimer = 500;
  @Prop() name = "code";
  @Prop() monacoVsPath: string;
  @Prop({ mutable: true }) value: string;
  @Prop() theme = "vs-dark";
  @Prop() language = "html";
  @Prop() disableFocus = false;
  @Prop() options: any = {
    formatOnPaste: true,
    formatOnType: true,
  };
  @Prop() autoExpand = false;
  @Prop() readOnly = false;
  @Prop() outputObject = false;
  @Prop() disableEmmet = false;
  @Prop() indentSpaces = 4;
  @Prop() minimap: {
    /**
     * Enable the rendering of the minimap.
     * Defaults to true.
     */
    enabled?: boolean;
    /**
     * Control the side of the minimap in editor.
     * Defaults to 'right'.
     */
    side?: "right" | "left";
    /**
     * Control the minimap rendering mode.
     * Defaults to 'actual'.
     */
    size?: "proportional" | "fill" | "fit";
    /**
     * Control the rendering of the minimap slider.
     * Defaults to 'mouseover'.
     */
    showSlider?: "always" | "mouseover";
    /**
     * Render the actual text on a line (as opposed to color blocks).
     * Defaults to true.
     */
    renderCharacters?: boolean;
    /**
     * Limit the width of the minimap to render at most a certain number of columns.
     * Defaults to 120.
     */
    maxColumn?: number;
    /**
     * Relative size of the font in the minimap. Defaults to 1.
     */
    scale?: number;
  } = {
    enabled: false,
  };

  @State() width: number;
  @State() height: number;

  @Listen("resize", { target: "window" })
  onWindowResize() {
    this.debounceResize();
  }

  debounce(func, wait, immediate = false) {
    var timeout;
    return function () {
      var context = this,
        args = arguments;
      var later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

  async injectScript(src) {
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

  @Watch("value")
  async onValueChange(value: any) {
    const currentValue = await this.checkEditorValue();
    if (
      (typeof value === "object" && this.deepEqual(currentValue, value)) ||
      currentValue === value
    )
      return;
    this.editor.setValue(
      typeof value === "string"
        ? value
        : JSON.stringify(value, null, this.indentSpaces || 4)
    );
  }

  @Method()
  async resize() {
    if (this.ignoreEvent) return;
    const lineHeight = 22;
    const lineCount = this.editor.getModel()?.getLineCount() || 1;
    this.height = Math.min(
      Math.max(60, this.editor.getTopForLineNumber(lineCount + 1) + lineHeight),
      (document?.body?.offsetHeight || 600) / 2
    );
    this.width = Math.min(
      document?.body?.offsetWidth,
      this.codeEl?.offsetWidth
    );
    this.codeEl.style.width = `${this.width}px`;
    this.codeEl.style.height = `${this.height}px`;
    try {
      this.ignoreEvent = true;
      this.editor.layout({ width: this.width, height: this.height });
    } finally {
      this.ignoreEvent = false;
    }
  }

  @Method()
  async getValue(options: any) {
    if (!this.editor?.getValue) return;
    return this.editor.getValue(options);
  }

  @Method()
  async format() {
    if (!this.editor?.getAction) return;
    return this.editor.getAction("editor.action.formatDocument").run();
  }

  @Method()
  async setFocus() {
    this.editor?.focus?.();
    this.editor?.setPosition?.(this.lastPosition);
    return true;
  }

  @Method()
  async setPosition(options: any) {
    return this.editor?.setPosition?.(options);
  }

  @Method()
  async getPosition() {
    this.lastPosition = this.editor?.getPosition?.();
    return this.lastPosition;
  }

  @Method()
  async updateOptions(options: any) {
    this.editor.updateOptions(options);
  }

  deepEqual(obj1: any, obj2: any): boolean {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) {
      return false;
    }

    for (const key of keys1) {
      if (!keys2.includes(key)) {
        return false;
      }

      const val1 = obj1[key];
      const val2 = obj2[key];

      if (typeof val1 !== typeof val2) {
        return false;
      }

      if (typeof val1 === "object" && val1 !== null) {
        if (!this.deepEqual(val1, val2)) {
          return false;
        }
      } else if (val1 !== val2) {
        return false;
      }
    }

    return true;
  }

  @Method()
  async checkEditorValue(
    event?: any,
    {
      onError,
    }: {
      onError?: (data: {
        event?: any;
        name?: string;
        error: any;
      }) => Promise<void>;
    } = {}
  ) {
    const value = this.editor.getValue();
    try {
      return this.outputObject && value?.length ? JSON.parse(value) : value;
    } catch (error) {
      const errorData = {
        event,
        name: "parseError",
        error,
      };
      this.fireenjinError.emit(errorData);
      if (typeof onError === "function") await onError(errorData);
      console.log("Error parsing as valid JSON", error);
      return value;
    }
  }

  async componentDidLoad() {
    if (!Build?.isBrowser) return;

    if (this.monacoVsPath) {
      loader.config({
        paths: {
          vs: this.monacoVsPath,
        },
      });
    }
    this.debounceResize = this.debounce(
      () => this.resize(),
      this.debounceTimer
    );
    this.monaco = await loader.init();
    this.editor = this.monaco.editor.create(this.codeEl, {
      value: this.value,
      language: this.language,
      theme: this.theme,
      readOnly: this.readOnly,
      automaticLayout: true,
      ...this.options,
    });
    this.editor.onDidBlurEditorText(async (event) => {
      this.value = await this.checkEditorValue(event);
      this.fireenjinCodeBlur.emit({
        event,
        name: this.name,
        editor: this.editor,
        value: this.value,
      });
    });
    this.editor.onDidChangeModelContent(async (event) => {
      this.value = await this.checkEditorValue(event);
      this.fireenjinCodeChange.emit({
        event,
        name: this.name,
        editor: this.editor,
        value: this.value,
      });
    });
    if (this.autoExpand)
      this.editor.onDidContentSizeChange(this.debounceResize);
    if (!this.disableFocus) this.editor.focus();
    if (!this.disableEmmet) {
      if (this.language === "html") {
        this.emmet = emmetHTML(this.monaco, ["html", "php"]);
      } else if (this.language === "css") {
        this.emmet = emmetCSS(this.monaco, ["css"]);
      } else if (
        ["javascript", "typescript", "ts", "tsx", "js", "jsx"].includes(
          this.language
        )
      ) {
        this.emmet = emmetJSX(this.monaco, ["javascript", "typescript"]);
      }
    }
  }

  disconnectedCallback() {
    if (!Build?.isBrowser || !this.editor?.dispose) return;
    this.editor.dispose();
    if (!this.emmet) return;
    this.emmet();
    this.emmet = null;
  }

  render() {
    return (
      <code
        id={`editor-${this.name}`}
        class={{
          "auto-expand": this.autoExpand,
        }}
        ref={(el) => (this.codeEl = el)}
      />
    );
  }
}
