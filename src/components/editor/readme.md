# fireenjin-editor

<!-- Auto Generated Below -->


## Properties

| Property          | Attribute           | Description                                                                      | Type                                                                     | Default                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ----------------- | ------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `autofocus`       | `autofocus`         | Should the editor focus on load                                                  | `boolean`                                                                | `true`                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `embedConfig`     | `embed-config`      |                                                                                  | `any`                                                                    | `{     services: {       youtube: true,       coub: true,       facebook: true,       twitter: true,       instagram: true,       twitch: true,       vimeo: true,       miro: true,       codepen: true,       gfycat: true,       imgur: true,       vine: true,       "yandex-music-track": true,       "yandex-music-album": true,       "yandex-music-playlist": true,       pinterest: true,       github: true,     },   }` |
| `fileStoragePath` | `file-storage-path` | The folder to put images uploaded via the editor in                              | `string`                                                                 | `undefined`                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `partials`        | --                  | A list of template partials to use or a function to run to get template partials | `any[]`                                                                  | `undefined`                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `placeholder`     | `placeholder`       | The placholder text to show when the editor is empty                             | `string`                                                                 | `"Let's Write Something!"`                                                                                                                                                                                                                                                                                                                                                                                                         |
| `readOnly`        | `read-only`         | Is the editor in read only mode                                                  | `boolean`                                                                | `false`                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `tools`           | `tools`             | Custom tools you want to pass to Editor.js                                       | `any`                                                                    | `{}`                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `uploadCallback`  | --                  | The callback to be run when a file is uploaded                                   | `(event: any) => Promise<{ success: boolean; file: { url: string; }; }>` | `undefined`                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `userId`          | `user-id`           | The userId of the author                                                         | `string`                                                                 | `undefined`                                                                                                                                                                                                                                                                                                                                                                                                                        |


## Events

| Event             | Description                                   | Type               |
| ----------------- | --------------------------------------------- | ------------------ |
| `fireenjinChange` | An event emitted on each change in the editor | `CustomEvent<any>` |


## Methods

### `clear() => Promise<void>`

Clear the editor

#### Returns

Type: `Promise<void>`



### `clearBlocks() => Promise<any>`



#### Returns

Type: `Promise<any>`



### `deleteBlock(id: number) => Promise<void>`



#### Returns

Type: `Promise<void>`



### `exportHTML(options?: { parsers?: any; customParsers?: any; }) => Promise<string>`

Export the editor as a string of HTML

#### Returns

Type: `Promise<string>`



### `exportJSON() => Promise<any>`

Save the editor and return the JSON output

#### Returns

Type: `Promise<any>`



### `getBlock(id: string) => Promise<any>`



#### Returns

Type: `Promise<any>`



### `getBlockByIndex(index: number) => Promise<any>`



#### Returns

Type: `Promise<any>`



### `getInstance() => Promise<any>`

Get the Editor.js instance

#### Returns

Type: `Promise<any>`



### `moveBlock(toIndex: number, fromIndex: number) => Promise<any>`



#### Returns

Type: `Promise<any>`



### `updateBlock(id: string, data: any) => Promise<any>`



#### Returns

Type: `Promise<any>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
