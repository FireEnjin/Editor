import { Component, h, Host, Method, Prop } from "@stencil/core";

@Component({
  tag: "fireenjin-modal-partial-select",
})
export class ModalPartialSelect {
  @Prop() partials: any[];
  @Prop() blockId: string;

  @Method()
  async selectPartial(partial: any, event?: any) {
    if (event) event.preventDefault();
    document.dispatchEvent(
      new CustomEvent("fireenjinEditorClick", {
        detail: {
          event: event,
          template: {
            id: partial.id,
            name: partial.name ? partial.name : partial.subject,
            html: partial.html,
          },
          blockId: this.blockId,
        },
      })
    );
  }

  render() {
    return (
      <Host>
        <ion-header>
          <ion-toolbar>
            <ion-title>Select a Template</ion-title>
            <ion-buttons slot="primary">
              <ion-button
                onClick={(event) =>
                  document.dispatchEvent(
                    new CustomEvent("fireenjinModalClose", {
                      detail: { event },
                    })
                  )
                }
              >
                <ion-icon slot="icon-only" name="close"></ion-icon>
              </ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <ion-grid>
            <ion-row>
              {(this.partials || []).map((partial) => (
                <ion-col size="12" sizeMd="6">
                  <ion-item
                    onClick={(event) => this.selectPartial(partial, event)}
                    detail="true"
                    href="#"
                  >
                    <ion-label>
                      <h2>{partial?.name || partial?.subject || "No Name"}</h2>
                      <fireenjin-render-template
                        template={{
                          html: partial?.html || "",
                          id: "partial",
                        }}
                        zoom={0.5}
                        partials={this.partials}
                        style={{
                          height: "250px",
                          width: "250px",
                        }}
                      />
                    </ion-label>
                  </ion-item>
                </ion-col>
              ))}
            </ion-row>
          </ion-grid>
        </ion-content>
      </Host>
    );
  }
}
