import edjsParser from "editorjs-parser";

/**
 * Editor.JS editor output to HTML
 */
export default async function editorToHtml(
  editor: any,
  {
    parserConfig,
    customParsers,
    embedMarkup,
  }: {
    parserConfig?: any;
    customParsers?: any;
    embedMarkup?: any;
  } = {}
): Promise<string> {
  const parser = new edjsParser(
    parserConfig || null,
    customParsers || {
      button: (data) => {
        const classes =
          data.align === "center"
            ? "enjin-align-center"
            : data.align === "right"
            ? "enjin-align-right"
            : "enjin-align-left";
        return `<ion-button shape="${
          data.shape ? data.shape : "square"
        }" color="${
          data.color ? data.color : "primary"
        }" class="${classes}" href="${data.href ? data.href : "#"}">${
          data.text
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
            `<ion-item><ion-checkbox slot="start" color="${color}" ${
              item.checked ? `checked="true"` : ""
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
      FrameHolder: () => "{{#if @partial-block}} {{> @partial-block }} {{/if}}",
    },
    embedMarkup || null
  );

  return parser.parse(editor);
}
