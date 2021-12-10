import Editor from "./editor";

export default class Diagram {
  settings = [];
  data: any;
  api: any;
  diagram: any;

  static get toolbox() {
    return {
      title: "Diagram",
      icon: `<svg width="20px" height="20px" fill="currentColor" version="1.1" viewBox="0 0 752 752" xmlns="http://www.w3.org/2000/svg"> <defs> <clipPath id="a"> <path d="m139.21 139.21h473.58v473.58h-473.58z"/> </clipPath> </defs> <g clip-path="url(#a)"> <path d="m505.77 480.61-185.38-247.16c7.3086-7.3398 12.559-16.727 14.855-27.207l104.16 48.613c2.543 43.094 36.582 77.801 79.418 81.312l14.223 135.13c-9.8633 1.2227-19.09 4.4766-27.285 9.3125m-34.191 50.676-111.66-34.887c-2.918-55.016-46.133-99.445-100.67-104.12l28.598-142.99c7.1523-0.85156 13.883-3.0391 19.938-6.3516l185.37 247.15c-11.355 10.703-19.164 25.062-21.57 41.203m77.32-60.211-14.207-134.98c43.797-4.3789 78.109-41.453 78.109-86.383 0-47.871-38.953-86.82-86.824-86.82-43.805 0-80.043 32.645-85.898 74.855l-103.8-48.43c-2.6055-28.062-26.27-50.105-54.984-50.105-30.469 0-55.25 24.793-55.25 55.25 0 27.23 19.828 49.875 45.793 54.383l-28.66 143.27c-57.887 3.418-103.96 51.449-103.96 110.17 0 60.934 49.566 110.5 110.5 110.5 57.355 0 104.62-43.941 109.96-99.934l111.34 34.781c3.0039 36.418 33.551 65.152 70.734 65.152 39.168 0 71.039-31.867 71.039-71.039 0-36.758-28.07-67.082-63.902-70.676" fill-rule="evenodd"/> </g> </svg>`,
    };
  }

  constructor({ data, api }) {
    this.data = data;
    this.api = api;
  }

  render() {
    const container = document.createElement("div");
    container.classList.add("diagram-wrapper");

    this.diagram = Editor({
      container,
    });

    const canvas = this.diagram.get("canvas");
    const elementFactory = this.diagram.get("elementFactory");

    // add root
    var root = elementFactory.createRoot();

    canvas.setRootElement(root);

    // add shapes
    var shape1 = elementFactory.createShape({
      x: 150,
      y: 100,
      width: 100,
      height: 80,
    });

    canvas.addShape(shape1, root);

    var shape2 = elementFactory.createShape({
      x: 290,
      y: 220,
      width: 100,
      height: 80,
    });

    canvas.addShape(shape2, root);

    var connection1 = elementFactory.createConnection({
      waypoints: [
        { x: 250, y: 180 },
        { x: 290, y: 220 },
      ],
      source: shape1,
      target: shape2,
    });

    canvas.addConnection(connection1, root);

    var shape3 = elementFactory.createShape({
      x: 450,
      y: 80,
      width: 100,
      height: 80,
    });

    canvas.addShape(shape3, root);

    var shape4 = elementFactory.createShape({
      x: 425,
      y: 50,
      width: 300,
      height: 200,
      isFrame: true,
    });

    canvas.addShape(shape4, root);

    // (3) interact with the diagram via API

    const selection = this.diagram.get("selection");

    console.log(selection);

    selection.select(shape3);

    return container;
  }

  renderSettings() {
    const wrapper = document.createElement("div");
    this.settings.forEach((setting) => {
      let button = document.createElement("div");
      button.classList.add("cdx-settings-button");
      button.innerHTML = setting.icon;
      button.addEventListener("click", (event) => {
        try {
          document.body.dispatchEvent(
            new CustomEvent("enjinToggleMenu", {
              detail: {
                event,
                selectingPage: true,
                blockIndex: this.api.blocks.getCurrentBlockIndex(),
              },
            })
          );
        } catch (err) {
          console.log("Error setting button shape!");
        }
      });

      wrapper.appendChild(button);
    });

    return wrapper;
  }

  save(diagramEl) {
    return {
      name: diagramEl?.name || "diagram",
    };
  }
}
