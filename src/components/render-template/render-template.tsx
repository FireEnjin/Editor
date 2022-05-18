import { FireEnjinFetchEvent } from "@fireenjin/sdk";
import Debounce from "debounce-decorator";
import {
  Build,
  Component,
  ComponentInterface,
  Event,
  EventEmitter,
  Prop,
  h,
  Watch,
  State,
  Listen,
  Method,
  Host,
} from "@stencil/core";
import Handlebars from "handlebars";
import * as jsonLogic from "json-logic-js";

@Component({
  tag: "fireenjin-render-template",
  shadow: true,
})
export class RenderTemplate implements ComponentInterface {
  templateSlot: any;
  dataSlot: any;
  frameEl: any;

  @Event() fireenjinFetch: EventEmitter<FireEnjinFetchEvent>;

  @Prop() disableFrame = false;
  @Prop() resize = false;
  @Prop() zoom: number | string = 1;
  @Prop() allowFullscreen = false;
  @Prop() loading: "eager" | "lazy" = "lazy";
  @Prop() templateId: string;
  @Prop() name: string;
  @Prop({ mutable: true }) data: any = {};
  @Prop() enableClicks = false;
  @Prop({ mutable: true }) template: any = {};
  @Prop({ mutable: true }) partials: {
    id: string;
    html: string;
    [key: string]: any;
  }[] = [];
  @Prop() helpers: { [helperName: string]: any } = {
    formatUSD: (amount) => {
      const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
      });

      return formatter.format(amount ? amount : 0);
    },
    logic: (context, rules, tempData) =>
      jsonLogic.apply(JSON.parse(rules.replace('"@tempData"', tempData)), {
        ...context,
        tempData,
      }),
  };

  @State() html = "";
  @State() currentPartials: string[] = [];
  @State() currentHelpers: string[] = [];

  async componentWillLoad() {
    if (!Build?.isBrowser) return;
    if (this.helpers && Object.keys(this.helpers)?.length) this.setHelpers();
    if (this.partials?.length) this.setPartials();
    if (this.templateId) this.getTemplate(this.templateId);
    if (this.template) this.backoff(10, this.renderTemplate.bind(this));
  }

  async componentDidLoad() {
    if (!Build?.isBrowser || this.template?.html || this.templateId) return;
    const templateHtml = this.templateSlot?.assignedNodes?.()?.[0]?.innerHTML;
    const dataStr = this.dataSlot?.assignedNodes?.()?.[0]?.innerHTML;
    try {
      this.data = JSON.parse(dataStr);
    } catch (e) {
      console.log("Error parsing JSON");
    }
    this.renderTemplate(templateHtml);
  }

  async backoff(retries: number, fn: () => any, delay = 500) {
    const pause = (duration) => new Promise((res) => setTimeout(res, duration));
    return new Promise(async (resolve, reject) => {
      if (!fn || typeof fn !== "function")
        reject("Callback function is required!");
      try {
        const res = await fn();
        resolve(res);
      } catch (err) {
        if (retries > 1) {
          await pause(delay);
          this.backoff(retries - 1, fn, delay * 2);
        } else {
          reject(err);
        }
      }
    });
  }

  getBlobURL(code, type) {
    const blob = new Blob([code], { type });
    return URL.createObjectURL(blob);
  }

  getTemplate(id: string) {
    this.fireenjinFetch.emit({
      endpoint: "findTemplate",
      name: this.name,
      params: {
        id,
      },
    });
  }

  @Method()
  async fetchData(input?: { templateId?: string }) {
    this.getTemplate(input?.templateId || this.templateId);
  }

  @Method()
  async unsetPartials() {
    for (const partialName of this.currentPartials) {
      Handlebars.unregisterPartial(partialName);
    }
    this.currentPartials = [];
    this.partials = [];
  }

  @Method()
  @Debounce(1000)
  @Watch("partials")
  async setPartials(partials?: any[]) {
    try {
      Handlebars.registerPartial(null, "");
    } catch {
      // Make sure handlebars doesn't error when null as partial name
    }
    try {
      if (partials?.length && this.partials !== partials) {
        this.partials = partials;
      }
      for (const partial of this.partials) {
        try {
          if (this.currentPartials.includes(partial?.id))
            Handlebars.unregisterPartial(partial?.id);
          Handlebars.registerPartial(partial?.id, partial?.html || "");
          if (!this.currentPartials.includes(partial?.id))
            this.currentPartials = [...this.currentPartials, partial?.id];
        } catch {
          console.log(`Error setting partial ${partial?.id}.`);
        }
      }
    } catch {
      console.log("Error setting partials.");
    }
  }

  @Method()
  @Debounce(1000)
  @Watch("helpers")
  async setHelpers(helpers?: { [helperName: string]: any }) {
    try {
      if (helpers && this.helpers !== helpers) {
        this.helpers = helpers;
      }
      for (const [helperName, helperFn] of Object.entries(this.helpers)) {
        try {
          if (this.currentHelpers.includes(helperName))
            Handlebars.unregisterHelper(helperName);
          Handlebars.registerHelper(helperName, helperFn);
          if (!this.currentHelpers.includes(helperName))
            this.currentHelpers = [...this.currentHelpers, helperName];
        } catch {
          console.log(`Error setting helper ${helperName}.`);
        }
      }
    } catch {
      console.log("Error setting helpers.");
    }
  }

  @Method()
  async renderTemplate(html?: string) {
    this.html = Handlebars.compile(html || this.template?.html || "")(
      this.data ? this.data : {}
    );
  }

  @Listen("fireenjinSuccess", { target: "body" })
  onSuccess(event) {
    if (
      event?.detail?.endpoint === "findTemplate" &&
      event.detail?.data?.template?.id === this.templateId
    ) {
      this.template = event?.detail?.data?.template
        ? event.detail.data.template
        : null;
    }
  }

  @Watch("templateId")
  onTemplateId() {
    this.fireenjinFetch.emit({
      endpoint: "findTemplate",
      params: {
        id: this.templateId,
      },
    });
  }

  @Watch("data")
  onData() {
    this.backoff(10, this.renderTemplate.bind(this));
  }

  @Watch("template")
  onTemplate() {
    this.backoff(10, this.renderTemplate.bind(this));
  }

  @Method()
  async fullscreen() {
    this.frameEl.requestFullscreen();
  }

  @Method()
  async getFrameEl() {
    return this.frameEl;
  }

  render() {
    const percentPosition =
      this.zoom && (1 / parseFloat(this.zoom as string)) * 100;
    return (
      <Host
        style={{
          position: "relative",
          display: "block",
          resize: this.resize ? "both" : "initial",
          overflow: "auto",
          height: "100%",
        }}
      >
        <div style={{ display: "none" }}>
          <slot ref={(el) => (this.templateSlot = el)} name="template" />
          <slot ref={(el) => (this.dataSlot = el)} name="data" />
        </div>
        <div
          class="render-wrapper"
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            pointerEvents: this.enableClicks ? "initial" : "none",
          }}
        >
          {this.disableFrame ? (
            <div
              ref={(el) => (this.frameEl = el)}
              style={{
                display: "block",
                transform: `scale(${this.zoom || 1})`,
                transformOrigin: "0 0",
                height: this.zoom ? `${percentPosition}%` : "100%",
                width: this.zoom ? `${percentPosition}%` : "100%",
              }}
              innerHTML={this.html}
            />
          ) : (
            <iframe
              ref={(el) => (this.frameEl = el)}
              style={{
                display: "block",
                transform: `scale(${this.zoom || 1})`,
                transformOrigin: "0 0",
                height: this.zoom ? `${percentPosition}%` : "100%",
                width: this.zoom ? `${percentPosition}%` : "100%",
              }}
              allowFullScreen={this.allowFullscreen}
              src={this.getBlobURL(this.html, "text/html")}
              frameBorder={0}
              loading={this.loading}
            />
          )}
        </div>
        {this.allowFullscreen && (
          <ion-button
            style={{
              position: "absolute",
              top: "var(--fullscreen-button-top, 0px)",
              left: "var(--fullscreen-button-left, auto)",
              bottom: "var(--fullscreen-button-bottom, auto)",
              right: "var(--fullscreen-button-right, 0px)",
              "--background":
                "var(--fullscreen-button-background, transparent)",
              "--color": "var(--fullscreen-button-color, black)",
            }}
            fill="clear"
            onClick={() => this.fullscreen()}
          >
            <ion-icon
              style={{
                height: "var(--fullscreen-icon-size, 25px)",
                width: "var(--fullscreen-icon-size, 25px)",
              }}
              slot="icon-only"
              name="resize"
            />
          </ion-button>
        )}
      </Host>
    );
  }
}
