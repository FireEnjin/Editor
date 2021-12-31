# code-editor



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute       | Description | Type                                                                                                                                                                                               | Default                                  |
| -------------- | --------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| `disableEmmet` | `disable-emmet` |             | `boolean`                                                                                                                                                                                          | `false`                                  |
| `language`     | `language`      |             | `string`                                                                                                                                                                                           | `"html"`                                 |
| `minimap`      | --              |             | `{ enabled?: boolean; side?: "right" \| "left"; size?: "proportional" \| "fill" \| "fit"; showSlider?: "always" \| "mouseover"; renderCharacters?: boolean; maxColumn?: number; scale?: number; }` | `{             enabled: false         }` |
| `name`         | `name`          |             | `string`                                                                                                                                                                                           | `"code"`                                 |
| `options`      | `options`       |             | `any`                                                                                                                                                                                              | `{}`                                     |
| `theme`        | `theme`         |             | `string`                                                                                                                                                                                           | `'vs-dark'`                              |
| `value`        | `value`         |             | `string`                                                                                                                                                                                           | `undefined`                              |


## Events

| Event                 | Description | Type               |
| --------------------- | ----------- | ------------------ |
| `fireenjinCodeChange` |             | `CustomEvent<any>` |


## Methods

### `getValue(options: any) => Promise<any>`



#### Returns

Type: `Promise<any>`



### `updateOptions(options: any) => Promise<void>`



#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*