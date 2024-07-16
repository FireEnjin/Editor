define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        defaut: {
            name: "Default",
            props: {
                value: "<p>Test</p>",
                autoExpand: true,
            },
            hooks: {
                onComponentDidLoad: function () {
                    setTimeout(function () {
                        document.querySelector("fireenjin-code-editor").focus();
                    }, 5000);
                },
            },
        },
        editor: {
            name: "JSON Editor",
            props: {
                value: "{}",
                outputObject: true,
            },
        },
    };
});
