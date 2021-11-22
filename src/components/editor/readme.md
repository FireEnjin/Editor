# enjin-editor



<!-- Auto Generated Below -->


## Properties

| Property          | Attribute           | Description                                                                      | Type                                                                     | Default                    |
| ----------------- | ------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------ | -------------------------- |
| `autofocus`       | `autofocus`         | Should the editor focus on load                                                  | `boolean`                                                                | `true`                     |
| `fileStoragePath` | `file-storage-path` | The folder to put images uploaded via the editor in                              | `string`                                                                 | `undefined`                |
| `partials`        | `partials`          | A list of template partials to use or a function to run to get template partials | `any`                                                                    | `undefined`                |
| `placeholder`     | `placeholder`       | The placholder text to show when the editor is empty                             | `string`                                                                 | `"Let's Write Something!"` |
| `readOnly`        | `read-only`         | Is the editor in read only mode                                                  | `boolean`                                                                | `false`                    |
| `tools`           | `tools`             | Custom tools you want to pass to Editor.js                                       | `any`                                                                    | `{}`                       |
| `uploadCallback`  | --                  | The callback to be run when a file is uploaded                                   | `(event: any) => Promise<{ success: boolean; file: { url: string; }; }>` | `undefined`                |
| `userId`          | `user-id`           | The userId of the author                                                         | `string`                                                                 | `undefined`                |


## Events

| Event         | Description                                   | Type               |
| ------------- | --------------------------------------------- | ------------------ |
| `enjinChange` | An event emitted on each change in the editor | `CustomEvent<any>` |


## Methods

### `exportHTML() => Promise<string>`

Export the editor as a string of HTML

#### Returns

Type: `Promise<string>`



### `getInstance() => Promise<any>`

Get the Editor.js instance

#### Returns

Type: `Promise<any>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
