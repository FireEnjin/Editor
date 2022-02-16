const fs = require("fs-extra");

fs.readFile("node_modules/@editorjs/editorjs/types/api/tooltip.d.ts", {
  encoding: "utf-8",
}).then((brokenFile) => {
  const fixedFile = brokenFile.replace(
    `import {TooltipContent, TooltipOptions} from 'codex-tooltip';`,
    `import TooltipOptions from "codex-tooltip"\n
import TooltipContent from "codex-tooltip"`
  );
  console.log(fixedFile);
  fs.writeFile(
    "node_modules/@editorjs/editorjs/types/api/tooltip.d.ts",
    fixedFile,
    { encoding: "utf-8" }
  );
});
