import {
  ComponentInterface,
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Prop,
  Method,
  Host,
  State,
  Build,
  Watch,
} from "@stencil/core";
import EditorJSStyle from "editorjs-style";
import ChangeCase from "editorjs-change-case";
import EditorJS from "@editorjs/editorjs";
import ImageTool from "@editorjs/image";
import List from "@editorjs/list";
import Embed from "@editorjs/embed";
import Header from "@editorjs/header";
import Paragraph from "editorjs-paragraph-with-alignment";
import edjsParser from "editorjs-parser";
import Table from "@editorjs/table";
import Undo from "./blocks/Undo";
import { MDParser, MDImporter } from "./blocks/Markdown";
import Button from "./blocks/Button";
import ComponentBlock from "./blocks/Component";
import Tasklist from "./blocks/Tasklist";
import Code from "./blocks/Code";
import Input from "./blocks/Input";

@Component({
  tag: "fireenjin-editor",
  styleUrl: "editor.css",
})
export class EnjinEditor implements ComponentInterface {
  @Element() editorEl: HTMLElement;

  /**
   * The placholder text to show when the editor is empty
   */
  @Prop() placeholder = "Let's Write Something!";
  /**
   * The userId of the author
   */
  @Prop() userId: string;
  /**
   * The folder to put images uploaded via the editor in
   */
  @Prop() fileStoragePath: string;
  /**
   * Custom tools you want to pass to Editor.js
   */
  @Prop() tools: any = {};
  /**
   *  A list of template partials to use or a function to run to get template partials
   */
  @Prop() partials: any[];
  /**
   *  Is the editor in read only mode
   */
  @Prop() readOnly = false;
  /**
   *  Should the editor focus on load
   */
  @Prop() autofocus = true;
  /**
   * The callback to be run when a file is uploaded
   */
  @Prop() uploadCallback: (
    event,
  ) => Promise<{ success: boolean; file: { url: string } }>;
  /**
   * The data to load into the editor
   */
  @Prop() data: any;

  @Prop() embedConfig: any = {
    services: {
      youtube: true,
      coub: true,
      facebook: true,
      twitter: true,
      instagram: true,
      twitch: true,
      vimeo: true,
      miro: true,
      codepen: true,
      gfycat: true,
      imgur: true,
      vine: true,
      "yandex-music-track": true,
      "yandex-music-album": true,
      "yandex-music-playlist": true,
      pinterest: true,
      github: true,
    },
  };

  @State() editorJS: EditorJS;

  /**
   * An event emitted on each change in the editor
   */
  @Event() fireenjinChange: EventEmitter;

  /**
   * Get the Editor.js instance
   */
  @Method()
  async getInstance(): Promise<any> {
    return this.editorJS;
  }

  @Method()
  async getBlock(id: string): Promise<any> {
    return this.editorJS?.blocks?.getById?.(id);
  }

  @Method()
  async updateBlock(id: string, data: any): Promise<any> {
    return this.editorJS?.blocks?.update?.(id, data);
  }

  @Method()
  async getBlockByIndex(index: number): Promise<any> {
    return this.editorJS?.blocks?.getBlockByIndex?.(index);
  }

  @Method()
  async moveBlock(toIndex: number, fromIndex: number): Promise<any> {
    return this.editorJS?.blocks?.move?.(toIndex, fromIndex);
  }

  @Method()
  async clearBlocks(): Promise<any> {
    return this.editorJS?.blocks?.clear?.();
  }

  @Method()
  async deleteBlock(id: number) {
    return this.editorJS?.blocks?.delete?.(id);
  }

  /**
   * Save the editor and return the JSON output
   */
  @Method()
  async exportJSON() {
    return this.editorJS?.save?.() as any;
  }

  /**
   * Clear the editor
   */
  @Method()
  async clear() {
    return this.editorJS?.clear?.();
  }

  /**
   * Export the editor as a string of HTML
   */
  @Method()
  async exportHTML(options?: {
    parsers?: any;
    customParsers?: any;
  }): Promise<string> {
    if (!this.editorJS?.save) return;
    return new edjsParser(options?.parsers || null, {
      button: (data) => {
        const classes =
          data.align === "center"
            ? "enjin-align-center"
            : data.align === "right"
              ? "enjin-align-right"
              : "enjin-align-left";
        return `<ion-button style="text-transform: none;" shape="${data.shape ? data.shape : "square"
          }" color="${data.color ? data.color : "primary"}" fill="${data.fill ? data.fill : "solid"
          }" ${data?.expand ? `expand="${data.expand}"` : ""
          } class="${classes}" href="${data.href ? data.href : "#"}">${data.text
          }</ion-button>`;
      },
      component: (data) => {
        return `<div class="editor-component">{{> ${data.templateId}}}</div>`;
      },
      tasklist: (data) => {
        const color = data?.color ? data.color : "success";
        const progress = data?.progress ? data.progress : 0;
        const html = ["<ion-list>"];
        for (const item of data?.items ? data.items : []) {
          html.push(
            `<ion-item><ion-checkbox slot="start" color="${color}" ${item.checked ? `checked="true"` : ""
            }></ion-checkbox><ion-label>${item.text}</ion-label></ion-item>`,
          );
        }
        html.push(
          `<ion-progress-bar color="${color}" value="${progress}"></ion-progress-bar>`,
          "</ion-list>",
        );
        return html.join("");
      },
      code: (data) => data.html,
      ...(options?.customParsers || {}),
    }).parse(await this.editorJS.save());
  }

  @Method()
  async setData(data: any) {
    if (!data) return;
    this.editorJS?.blocks?.clear?.();
    this.editorJS?.blocks?.render?.(
      typeof data === "string" ? JSON.parse(data) : this.data,
    );
  }

  @Watch("data")
  onDataChange() {
    this.setData(this.data);
  }

  async disconnectedCallback() {
    if (!this.editorJS?.destroy) return;
    this.editorJS.destroy();
  }

  async componentDidLoad() {
    if (!Build?.isBrowser) return;
    const data = this.data || this.editorEl.getAttribute("data") || null;
    this.editorJS = new EditorJS({
      data: typeof data === "string" ? JSON.parse(data) : data,
      onChange: () => {
        this.fireenjinChange.emit({ instance: this.editorJS });
      },
      onReady: () => {
        new Undo({ editor: this.editorJS });
      },
      placeholder: this.placeholder,
      holder: this.editorEl,
      readOnly: this.readOnly,
      autofocus: this.autofocus,
      tools: {
        ...{
          paragraph: {
            class: Paragraph,
            inlineToolbar: true,
          },
          header: {
            class: Header,
            inlineToolbar: true,
          },
          button: {
            class: Button,
            inlineToolbar: true,
          },
          component: {
            class: ComponentBlock,
            config: {
              partials: this.partials || null,
            },
          },
          image: {
            class: ImageTool,
            config: {
              uploader: {
                uploadByFile: async (file) => {
                  return await this.uploadCallback({ type: "file", file });
                },
                uploadByUrl: async (url) => {
                  return await this.uploadCallback({ type: "url", url });
                },
              },
            },
          },
          list: {
            class: List,
            inlineToolbar: true,
          },
          tasklist: {
            class: Tasklist,
            inlineToolbar: true,
          },
          input: {
            class: Input,
          },
          table: {
            class: Table,
          },
          code: Code,
          markdownParser: MDParser,
          markdownImporter: MDImporter,
          style: EditorJSStyle.StyleInlineTool,
          embed: {
            class: Embed,
            config: this.embedConfig,
          },
          changeCase: {
            class: ChangeCase,
            config: {
              showLocaleOption: true, // enable locale case options
              locale: "tr", // or ['tr', 'TR', 'tr-TR']
            },
          },
        },
        ...this.tools,
      },
    });
  }

  render() {
    return <Host style={{ width: "90%", marginLeft: "10%" }} />;
  }
}
