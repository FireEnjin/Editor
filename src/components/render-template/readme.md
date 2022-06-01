# fireenjin-render-template

<!-- Auto Generated Below -->


## Properties

| Property          | Attribute          | Description | Type                                                  | Default                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ----------------- | ------------------ | ----------- | ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `allowFullscreen` | `allow-fullscreen` |             | `boolean`                                             | `false`                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `data`            | `data`             |             | `any`                                                 | `{}`                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `disableFrame`    | `disable-frame`    |             | `boolean`                                             | `false`                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `enableClicks`    | `enable-clicks`    |             | `boolean`                                             | `false`                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `helpers`         | --                 |             | `{ [helperName: string]: any; }`                      | `{     formatUSD: (amount) => {       const formatter = new Intl.NumberFormat("en-US", {         style: "currency",         currency: "USD",         minimumFractionDigits: 2,       });        return formatter.format(amount ? amount : 0);     },     logic: (context, rules, tempData) =>       jsonLogic.apply(JSON.parse(rules.replace('"@tempData"', tempData)), {         ...context,         tempData,       }),   }` |
| `loading`         | `loading`          |             | `"eager" \| "lazy"`                                   | `"lazy"`                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `name`            | `name`             |             | `string`                                              | `undefined`                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `partials`        | --                 |             | `{ [key: string]: any; id: string; html: string; }[]` | `[]`                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `rawHtml`         | `raw-html`         |             | `string`                                              | `undefined`                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `resize`          | `resize`           |             | `boolean`                                             | `false`                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `template`        | `template`         |             | `any`                                                 | `{}`                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `templateId`      | `template-id`      |             | `string`                                              | `undefined`                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `zoom`            | `zoom`             |             | `number \| string`                                    | `1`                                                                                                                                                                                                                                                                                                                                                                                                                            |


## Events

| Event            | Description | Type                               |
| ---------------- | ----------- | ---------------------------------- |
| `fireenjinFetch` |             | `CustomEvent<FireEnjinFetchEvent>` |


## Methods

### `fetchData(input?: { templateId?: string; }) => Promise<void>`



#### Returns

Type: `Promise<void>`



### `fullscreen() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `getFrameEl() => Promise<any>`



#### Returns

Type: `Promise<any>`



### `renderTemplate(html?: string) => Promise<void>`



#### Returns

Type: `Promise<void>`



### `setHelpers(helpers?: { [helperName: string]: any; }) => Promise<void>`



#### Returns

Type: `Promise<void>`



### `setPartials(partials?: any[]) => Promise<void>`



#### Returns

Type: `Promise<void>`



### `unsetPartials() => Promise<void>`



#### Returns

Type: `Promise<void>`




## Dependencies

### Used by

 - [fireenjin-modal-partial-select](..)

### Depends on

- ion-button
- ion-icon

### Graph
```mermaid
graph TD;
  fireenjin-render-template --> ion-button
  fireenjin-render-template --> ion-icon
  ion-button --> ion-ripple-effect
  fireenjin-modal-partial-select --> fireenjin-render-template
  style fireenjin-render-template fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
