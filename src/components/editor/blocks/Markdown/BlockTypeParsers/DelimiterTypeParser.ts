export function parseDelimiterToMarkdown(_data) {
  const delimiter = "---";

  return delimiter.concat("\n");
}

export function parseMarkdownToDelimiter(_data?) {
  let delimiterData = {};

  delimiterData = {
    data: {
      items: [],
    },
    type: "delimiter",
  };

  return delimiterData;
}
