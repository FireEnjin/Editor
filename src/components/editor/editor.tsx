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
} from "@stencil/core";
import EditorJS from "@editorjs/editorjs";
import ImageTool from "@editorjs/image";
import List from "@editorjs/list";
import Embed from "@editorjs/embed";
import Header from "@editorjs/header";
import Paragraph from "editorjs-paragraph-with-alignment";
import EditorJSStyle from "editorjs-style";
import edjsParser from "editorjs-parser";
import Table from "@editorjs/table";
import Undo from "./blocks/Undo";
import DragDrop from "./blocks/DragDrop";
import { MDParser, MDImporter } from "./blocks/Markdown";
import Button from "./blocks/Button";
import Page from "./blocks/Page";
import Partial from "./blocks/Partial";
import Tasklist from "./blocks/Tasklist";
import Code from "./blocks/Code";
import Input from "./blocks/Input";

@Component({
  tag: "fireenjin-editor",
  styleUrl: "editor.css",
})
export class EnjinEditor implements ComponentInterface {
  @Element() editorEl: any;

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
  @Prop() partials: any;
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
  @Prop() uploadCallback: (event) => Promise<{ success: boolean; file: { url: string } }>

  @State() editorJS: EditorJS;

  /**
   * An event emitted on each change in the editor
   */
  @Event() enjinChange: EventEmitter;

  /**
   * Get the Editor.js instance
   */
  @Method()
  async getInstance(): Promise<any> {
    return this.editorJS;
  }

  /**
   * Export the editor as a string of HTML
   */
  @Method()
  async exportHTML(): Promise<string> {
    if (!this.editorJS?.save) return;
    return new edjsParser(null, {
      button: (data) => {
        const classes =
          data.align === "center"
            ? "enjin-align-center"
            : data.align === "right"
              ? "enjin-align-right"
              : "enjin-align-left";
        return `<ion-button shape="${data.shape ? data.shape : "square"
          }" color="${data.color ? data.color : "primary"
          }" class="${classes}" href="${data.href ? data.href : "#"}">${data.text
          }</ion-button>`;
      },
      partial: (data) => {
        return `<div class="editor-partial">{{> ${data.templateId}}}</div>`;
      },
      tasklist: (data) => {
        const color = data?.color ? data.color : "success";
        const progress = data?.progress ? data.progress : 0;
        const html = ["<ion-list>"];
        for (const item of data?.items ? data.items : []) {
          html.push(
            `<ion-item><ion-checkbox slot="start" color="${color}" ${item.checked ? `checked="true"` : ""
            }></ion-checkbox><ion-label>${item.text}</ion-label></ion-item>`
          );
        }
        html.push(
          `<ion-progress-bar color="${color}" value="${progress}"></ion-progress-bar>`,
          "</ion-list>"
        );
        return html.join("");
      },
      code: (data) => data.html,
    }).parse(await this.editorJS.save());
  }

  async componentDidLoad() {
    this.editorJS = new EditorJS({
      onChange: () => {
        this.enjinChange.emit({ instance: this.editorJS });
      },
      onReady: () => {
        new DragDrop(this.editorJS as any);
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
                }
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
          page: Page,
          code: Code,
          partial: {
            class: Partial,
            config: {
              partials: this.partials ? this.partials : null,
            },
          },
          editorJSStyle: EditorJSStyle,
          markdownParser: MDParser,
          markdownImporter: MDImporter,
          embed: {
            class: Embed,
          },
        },
        ...this.tools,
      },
    });
  }

  render() {
    return <Host />;
  }
}
