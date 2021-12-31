import { Build, Component, h, Method, Prop, Watch } from '@stencil/core';
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

    @Prop() name = "code";
    @Prop() value: string;
    @Prop() theme = 'vs-dark';
    @Prop() language = "html";
    @Prop() options: any = {};
    @Prop() disableEmmet = false;

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
    onValueChange(val) {
        this.editor.setValue(val);
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
                this.editor = (window as any).monaco.editor.create(this.codeEl, {
                    value: this.value,
                    language: this.language,
                    theme: this.theme,
                    ...this.options
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
                    } else if (this.language === "jsx" || this.language === "tsx") {
                        this.emmet = emmetJSX(
                            (window as any).monaco,
                            ["jsx", "tsx"]
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