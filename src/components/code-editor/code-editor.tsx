import { Build, Component, Event, EventEmitter, h, Method, Prop, Watch } from '@stencil/core';
// import * as monaco from "monaco-editor";
import { emmetHTML, emmetCSS, emmetJSX } from 'emmet-monaco-es';

@Component({
    tag: 'fireenjin-code-editor',
    styleUrl: 'code-editor.css'
})
export class CodeEditor {
    codeEl: HTMLElement;
    editor: any;
    emmet: any;
    lastPosition: any;

    @Event() fireenjinCodeChange: EventEmitter;

    @Prop() name = "code";
    @Prop({ mutable: true }) value: string;
    @Prop() theme = 'vs-dark';
    @Prop() language = "html";
    @Prop() disableFocus = false;
    @Prop() options: any = {
        formatOnPaste: true,
        formatOnType: true
    };
    @Prop() disableEmmet = false;
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
        side?: 'right' | 'left';
        /**
         * Control the minimap rendering mode.
         * Defaults to 'actual'.
         */
        size?: 'proportional' | 'fill' | 'fit';
        /**
         * Control the rendering of the minimap slider.
         * Defaults to 'mouseover'.
         */
        showSlider?: 'always' | 'mouseover';
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
            enabled: false
        };

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
    onValueChange(value, oldValue) {
        if (oldValue === value) return;
        this.editor.setValue(value);
    }

    @Method()
    async getValue(options: any) {
        return this.editor.getValue(options);
    }

    @Method()
    async format() {
        return this.editor.getAction('editor.action.formatDocument').run();
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

    async componentDidLoad() {
        if (Build.isBrowser) {
            if (!window?.require) {
                await this.injectScript("https://unpkg.com/monaco-editor@latest/min/vs/loader.js");
            }
            (window as any).require.config({ paths: { 'vs': 'https://unpkg.com/monaco-editor@latest/min/vs' } });
            (window as any).MonacoEnvironment = { getWorkerUrl: () => proxy };

            let proxy = URL.createObjectURL(new Blob([`
                self.MonacoEnvironment = {
                    baseUrl: 'https://unpkg.com/monaco-editor@latest/min/'
                };
                importScripts('https://unpkg.com/monaco-editor@latest/min/vs/base/worker/workerMain.js');
            `], { type: 'text/javascript' }));

            (window as any).require(["vs/editor/editor.main"], () => {
                //const editor = monaco.editor.create(this.codeEl, {
                this.editor = (window as any).monaco.editor.create(this.codeEl, {
                    value: this.value,
                    language: this.language,
                    theme: this.theme,
                    minimap: this.minimap,
                    ...this.options
                });
                //this.editor = editor;
                if (!this.disableFocus) this.editor.focus();
                this.editor.onKeyUp(() => {
                    this.fireenjinCodeChange.emit({
                        name: this.name,
                        editor: this.editor,
                        value: this.editor.getValue()
                    });
                });
                this.editor.onDidPaste(() => {
                    this.fireenjinCodeChange.emit({
                        name: this.name,
                        editor: this.editor,
                        value: this.editor.getValue()
                    });
                });
                this.editor.onMouseUp(() => {
                    this.fireenjinCodeChange.emit({
                        name: this.name,
                        editor: this.editor,
                        value: this.editor.getValue()
                    });
                });
                if (!this.disableEmmet) {
                    if (this.language === "html") {
                        this.emmet = emmetHTML(
                            (window as any).monaco,
                            ["html", "php"]
                        );
                    } else if (this.language === "css") {
                        this.emmet = emmetCSS(
                            (window as any).monaco,
                            ["css"]
                        );
                    } else if (["javascript", "typescript", "ts", "tsx", "js", "jsx"].includes(this.language)) {
                        this.emmet = emmetJSX(
                            (window as any).monaco,
                            ["javascript", "typescript"]
                        );
                    }
                }

            });
        }
    }

    disconnectedCallback() {
        this.emmet();
        this.emmet = null;
    }

    render() {
        return (
            <code ref={el => this.codeEl = el} />
        );
    }
}