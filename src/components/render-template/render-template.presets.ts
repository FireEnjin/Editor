import { ComponentPresets } from "@fireenjin/docs";

export default {
  default: {
    name: "Default",
    props: {
      zoom: 0.5,
      resize: true,
      template: {
        html: "<p>testing {{user.firstName}}</p>",
      },
      data: {
        location: {
          name: "Bobby",
          phone: "666-6666",
        },
      },
    },
    hooks: {
      onComponentDidLoad: ({ organismEl }) => {
        setTimeout(() => {
          organismEl.querySelector("fireenjin-render-template").template = {
            html: `
<!DOCTYPE html>
<html lang="en">
  <head>
    <link rel="preconnect" href="https://apis.google.com" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin />
    <link
      rel="preconnect"
      href="https://firebasestorage.googleapis.com"
      crossorigin
    />
    <link rel="preconnect" href="https://unpkg.com" crossorigin />
    <title>
      {{location.name}} Water Damage & Flood Restoration | The Flood Team
    </title>
    <meta charset="utf-8" />
    <meta
      name="description"
      content="If you have water damage in your home or business contact The Flood Team of {{location.name}} for an immediate, FREE quote. We're your best bet when things get wet!"
    />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap@3.4.1/dist/css/bootstrap.min.css"
    />
    <script
      defer
      src="https://cdn.jsdelivr.net/npm/bootstrap@3.4.1/dist/js/bootstrap.min.js"
    ></script>
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css?Work+Sans:400,500,700"
    />
    <link
      href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@5.15.4/css/all.css"
      rel="stylesheet"
    />
    <script
      type="module"
      src="https://unpkg.com/@floodteam/sdk@latest/dist/floodteam/floodteam.esm.js"
    ></script>
    <script
      nomodule
      src="https://unpkg.com/@floodteam/sdk@latest/dist/floodteam/floodteam.js"
    ></script>
    <link
      href="https://unpkg.com/@floodteam/sdk@latest/dist/floodteam/floodteam.css"
      rel="stylesheet"
    />
    <script
      async
      defer
      src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBenUMQZUJg7qRUoFUJOS5tjK-JnOeQtjM&libraries=places"
      type="text/javascript"
    ></script>
    <style>
      body {
        overflow: auto !important;
        position: initial !important;
      }

      body,
      p {
        font-size: 16px;
        line-height: 28px;
        font-family: "Work Sans", sans-serif;
        font-weight: 500;
        letter-spacing: normal;
        color: #979595;
      }

      p {
        margin-bottom: 25px;
      }

      .subtitle {
        font-size: 24px;
        font-weight: 700;
        color: #1e3955;
      }

      h1 {
        font-size: 3em;
        font-weight: 700;
        color: #1e3955;
        margin-bottom: 24px;
      }

      h2 {
        font-size: 43px;
        line-height: 50px;
        margin-bottom: 25px;
        letter-spacing: -1px;
        color: #1e3955;
        font-weight: 600;
      }

      h3 {
        font-size: 24px;
        line-height: 34px;
        letter-spacing: normal;
        color: #1e3955;
        margin-bottom: 17px;
        font-weight: 600;
      }

      h4 {
        font-size: 18px;
        line-height: 24px;
        font-weight: 700;
        color: #1e3955;
        margin-top: 30px;
      }

      a.location-phone {
        font-size: 43px;
        line-height: 1.2;
        text-decoration: underline !important;
        font-weight: 700;
      }

      .white p,
      .white h1,
      .white h2,
      .white,
      .white a,
      white a:focus {
        color: white;
        text-decoration: none;
      }

      .white a:hover {
        text-decoration: underline;
      }

      .bgwhite {
        background-color: white;
      }

      .bgnavy {
        background-color: #1e3955;
        padding: 38px;
      }

      .bggrey {
        background-color: #f5f6f6;
      }

      .headertop {
        background-color: #38b;
        height: 53px;
        padding: 10px 0;
      }

      .headertoptxt {
        margin-right: 50px;
        font-size: 13px;
        font-weight: 400;
      }

      .headernav {
        display: flex;
        align-items: center;
      }

      .logo {
        display: block;
        padding: 5px;
        width: 167px;
        height: 62px;
      }

      .headerbottom {
        background-color: #1e3955;
        color: #fff;
        padding: 20px 15px;
      }

      .tele-header {
        margin: 0px;
        text-align: right;
      }

      .tele-header a,
      .tele-header a:focus,
      .bgnavy a,
      .bgnavy a:focus {
        color: #7dd19f;
        text-decoration: none;
      }

      .tele-header a:hover,
      .bgnavy a:hover {
        color: #7dd19f;
        text-decoration: underline;
      }

      .hero-inner-margin {
        margin-top: 115px;
      }

      .heroimg {
        height: 750px;
        padding: 0px 15px;
        background-color: white;
        background: url("https://firebasestorage.googleapis.com/v0/b/fireenjin-live.appspot.com/o/floodteam%2Fflood-team-hero-image.jpg?alt=media&token=09425666-2027-4bd0-90ab-8b18ecac695f");
        background-size: cover;
        background-position: center;
        background-repeat: none;
      }

      .herotxt {
        padding-top: 128px;
        color: white;
      }

      .herotxt p {
        font-size: 20px;
      }

      .btn-green {
        background-color: #7dd19f;
        color: #fff;
        border: none;
        font-size: 16px;
        font-weight: 700;
        padding: 15px 30px;
        border-radius: 0px;
      }

      a:hover .btn-green {
        background-color: #3ea7e0 !important;
      }

      .cta-padding {
        padding: 50px;
      }

      .main-padding {
        padding-top: 430px 15px 0px;
      }

      .topmargin {
        margin-top: 70px;
      }

      .toppadding {
        padding-top: 30px;
      }

      .services {
        padding: 64px 0;
        margin-bottom: 29px;
      }

      /*  .row {             display: flex;         flex-wrap: wrap;             margin-right: -15px;         margin-left: -15px;} */
      i {
        font-size: 16px;
      }

      .fab,
      .fa {
        font-size: 16px;
        border-radius: 95px;
        background-color: #3ea7e0;
        padding: 9px;
      }

      .fab.fa-facebook-f {
        font-size: 14px;
        padding-left: 12px;
        padding-right: 12px;
      }

      .footer a i {
        color: #fff;
      }

      .paddingfooter {
        padding-right: 15px;
        padding-left: 15px;
        padding-top: 30px;
        padding-bottom: 30px;
      }

      .footer a i:hover,
      a i:hover {
        color: #3ea7e0;
        background-color: #fff;
      }

      .services i {
        color: #3ea7e0;
      }

      .services:hover i,
      .services:hover h4 {
        color: #fff;
      }

      .services:hover {
        background-color: #3ea7e0;
      }

      img {
        max-width: 100%;
      }

      .paddingsides {
        padding-left: 30px;
        padding-right: 30px;
      }

      .ion-button {
        background-color: #7dd19f;
        color: #fff;
        border: none;
        font-size: 16px;
        font-weight: 700;
        border-radius: 0px;
        text-transform: capitalize;
        --box-shadow: none;
        margin: 10px;
      }

      .ion-button:hover {
        background-color: #3ea7e0;
      }

      /* Media Queries */
      @media (max-width: 5200px) and (min-width: 1026px) {
        .paddingfooter {
          padding-right: 15px;
          padding-left: 15px;
          padding-top: 30px;
          padding-bottom: 0px;
        }
      }

      @media (max-width: 1025px) and (min-width: 769px) {
        .numimg {
          width: 50px;
        }
      }

      @media (max-width: 768px) and (min-width: 668px) {
        .numimg {
          width: 60px;
        }

        .toppadding {
          padding-top: 15px;
        }

        h1 {
          font-size: 31px;
        }
      }

      @media (max-width: 667px) and (min-width: 569px) {
        .numimg {
          width: 70px;
        }

        .headertopsocial {
          padding-top: 57px;
        }

        .toppadding {
          padding-top: 15px;
        }

        h1 {
          font-size: 31px;
        }
      }

      @media (max-width: 568px) and (min-width: 421px) {
        .numimg {
          width: 70px;
        }

        .headertoptxt {
          margin-right: 10px;
        }

        .headertopsocial {
          padding-top: 57px;
        }

        h1 {
          font-size: 31px;
        }

        .herotxt {
          padding-top: 30px;
          padding-bottom: 30px;
        }

        .heroimg {
          height: auto;
        }

        .toppadding {
          padding-top: 38px;
        }

        .topmargin {
          margin-top: 30px;
        }
      }

      @media (max-width: 420px) and (min-width: 0px) {
        .numimg {
          width: 70px;
        }

        .headertoptxt {
          margin-right: 10px;
        }

        .headertopsocial {
          padding-top: 0px;
        }

        h1 {
          font-size: 31px;
        }

        a.location-phone {
          font-size: 31px;
        }

        .toppadding {
          padding-top: 38px;
        }

        .topmargin {
          margin-top: 30px;
        }

        .herotxt {
          padding-top: 30px;
          padding-bottom: 30px;
        }

        .heroimg {
          height: auto;
        }
      }
    </style>
  </head>

  <body>
    <!-- Google Tag Manager (noscript) -->
    <noscript
      ><iframe
        src="https://www.googletagmanager.com/ns.html?id={{location.googleTagManagerId}}"
        height="0"
        width="0"
        style="display: none; visibility: hidden"
      ></iframe
    ></noscript>
    <!-- End Google Tag Manager (noscript) -->
    <div class="headertop white">
      <div class="container-fluid">
        <div class="container">
          <div class="pull-left headertopphone">
            <span><i class="fa fa-phone"></i></span>
            <span class="headertoptxt"
              ><a href="tel:+1{{location.phone}}">{{location.phone}}</a></span
            >
            <span><i class="fa fa-sync"></i></span>
            <span class="headertoptxt">24/7 Immediate Response</span>
          </div>
          <div class="pull-right headertopsocial">
            <span
              ><a href="https://www.facebook.com/thefloodteam/" target="_blank"
                ><i class="fab fa-facebook-f"></i></a
            ></span>
            <span
              ><a
                href="https://www.linkedin.com/company/the-flood-team-llc/"
                target="_blank"
                ><i class="fab fa-linkedin-in"></i></a
            ></span>
            <span
              ><a href="https://www.instagram.com/thefloodteam/" target="_blank"
                ><i class="fab fa-instagram"></i></a
            ></span>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <ion-img
            class="logo"
            src="https://firebasestorage.googleapis.com/v0/b/fireenjin-live.appspot.com/o/floodteam%2Flogo.png?alt=media&token=50c6a2aa-6d98-4f28-b76a-ab378d17995c"
            alt="flood team logo"
          />
        </div>
      </div>
    </div>
    <div class="headerbottom">
      <div class="container">
        <div class="row">
          <div class="col-lg-6"></div>
          <div class="col-lg-6">
            <h4 class="tele-header white">
              Call now:
              <a href="tel:+1{{location.phone}}" target="_blank"
                >{{location.phone}}</a
              >
            </h4>
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid heroimg">
      <div class="container herotxt">
        <div class="row">
          <div class="col-sm-8 white">
            <h1>Don't Stress Over Water Damage!</h1>
            <p>
              If you have water damage in your home or business contact The
              Flood Team now for an immediate, FREE repair quote. Our team of
              certified restoration specialists is ready to tackle whatever
              Mother Nature throws at you 365 days a year. From flooding and
              sewage backups to pipe breaks and mold remediation, The Flood Team
              has you covered throughout.
            </p>
            <a href="tel:+1{{location.phone}}" target="_blank"
              ><button class="btn-green">{{location.phone}}</button></a
            >
          </div>
          <div class="col-sm-4"></div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row topmargin">
        <div class="col-md-6">
          <div class="bgnavy white">
            <h2>24/7 Immediate Response</h2>
            <p class="subtitle">
              Schedule a flood team certified specialist today to evaluate your
              home or business!
            </p>
            <p class="subtitle">Call Now</p>
            <a href="tel:+1{{location.phone}}" class="location-phone"
              >{{location.phone}}</a
            >
          </div>
        </div>
        <div class="col-md-6">
          <ion-img
            src="https://firebasestorage.googleapis.com/v0/b/fireenjin-live.appspot.com/o/floodteam%2Fblog__placeholder2.jpg?alt=media&token=328f7717-2cbd-4c2c-ae98-8e9136a04fb8"
          />
        </div>
      </div>
    </div>
    <div class="container-fluid bggrey topmargin">
      <div class="container">
        <div class="row toppadding">
          <div class="col-md-6">
            <h2>24/7 Full-Service Water Restoration in {{location.name}}</h2>
            <p>
              Eliminate the hassles of unexpected water damage in your home or
              business, The Flood Team is your local expert for any flooding or
              water leaks. No job is too big or too small for our range of
              serivces. When it comes to response, immediate action is necessary
              to limit permanent damages from water and mold. Contact us today
              for 24/7 - 365 response!
            </p>
          </div>
          <div class="col-md-6">
            <h2>What to do, you ask?</h2>
            <div class="row">
              <div class="col-md-2">
                <ion-img
                  class="numimg"
                  src="https://firebasestorage.googleapis.com/v0/b/fireenjin-live.appspot.com/o/floodteam%2F01.png?alt=media&token=adfe55ea-6eb0-4050-88a4-932836e56f62"
                  width="100%"
                  style="padding-top: 5px"
                />
              </div>
              <div class="col-md-10">
                <h3>Give us a call</h3>
                <p>
                  Contact our water experts in this type of situation and we
                  will walk you through the entire restoration process.
                </p>
              </div>
              <div class="col-md-2">
                <ion-img
                  class="numimg"
                  src="https://firebasestorage.googleapis.com/v0/b/fireenjin-live.appspot.com/o/floodteam%2F02.png?alt=media&token=5768ee17-2bc7-4986-95f4-de99483454f1"
                  width="100%"
                  style="padding-top: 5px"
                />
              </div>
              <div class="col-md-10">
                <h3>What to expect</h3>
                <p>
                  A flood team expert will arrive in little to no time for a
                  free evaluation and put a plan in place towards remediation of
                  your property.
                </p>
              </div>
              <div class="col-md-2">
                <ion-img
                  class="numimg"
                  src="https://firebasestorage.googleapis.com/v0/b/fireenjin-live.appspot.com/o/floodteam%2F03.png?alt=media&token=cb022142-565f-42b3-9904-6694932a2738"
                  width="100%"
                  style="padding-top: 5px"
                />
              </div>
              <div class="col-md-10">
                <h3>Restoring your situation</h3>
                <p>
                  Our experts will get your property back up and running and
                  provide you with any additional services that may be required.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="row">
          <div class="col-xs-12">
            <h2 class="text-center">Our Services</h2>
          </div>
          <div class="col-sm-3 col-md-3 col-lg-3">
            <div class="bgwhite services text-center">
              <i class="fas fa-2x fa-water"></i>
              <h4>Basement Flooding</h4>
            </div>
          </div>
          <div class="col-sm-3 col-md-3 col-lg-3">
            <div class="bgwhite services text-center">
              <i class="fas fa-2x fa-toilet"></i>
              <h4>Sewage Backup</h4>
            </div>
          </div>
          <div class="col-sm-3 col-md-3 col-lg-3">
            <div class="bgwhite services text-center">
              <i class="fas fa-2x fa-tint"></i>
              <h4>Water Damage</h4>
            </div>
          </div>
          <div class="col-sm-3 col-md-3 col-lg-3">
            <div class="bgwhite services text-center">
              <i class="fas fa-2x fa-city"></i>
              <h4>Commercial</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid toppadding">
      <div class="container">
        <div class="row">
          <div class="col-md-6 toppadding paddingsides">
            <div class="row">
              <p class="subtitle">Serving {{location.name}}</p>
              <p>
                Contact The Flood Team 24/7 for a professional, immediate
                response for all flooding and water damage.
              </p>
            </div>
            <div class="row">
              <div class="col-md-6">
                <h4>Manager:</h4>
                <p>{{locaiton.owner.firstName}} {{location.owner.lastName}}</p>
              </div>
              <div class="col-md-6">
                <h4>Phone:</h4>
                <a href="tel:+1{{location.phone}}" target="_blank"
                  >{{location.phone}}</a
                >
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <floodteam-init token="{{location.token}}"></floodteam-init>
            <floodteam-book-now
              referring="true"
              location-id="{{location.id}}"
            ></floodteam-book-now>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="bggrey paddingfooter">
        <div class="container">
          <div class="row">
            <div class="col-md-3">
              <ion-img
                src="https://firebasestorage.googleapis.com/v0/b/fireenjin-live.appspot.com/o/floodteam%2Flogo.png?alt=media&token=50c6a2aa-6d98-4f28-b76a-ab378d17995c"
              />
              <br /><br />
              <a href="tel:+1{{location.phone}}" target="_blank"
                >{{location.phone}}</a
              >
              <p>
                <a href="mailto:info@thefloodteam.com" target="_blank"
                  >info@thefloodteam.com</a
                >
              </p>
            </div>
            <div class="col-md-3"></div>
            <div class="col-md-3"></div>
            <div class="col-md-3">
              <h4 style="margin-top: 0px">Connect with us!</h4>
              <div class="whitelink">
                <span>
                  <a
                    href="https://www.facebook.com/thefloodteam/"
                    target="_blank"
                    ><i class="fab fa-facebook-f"></i></a
                ></span>
                <span
                  ><a
                    href="https://www.linkedin.com/company/the-flood-team-llc/"
                    target="_blank"
                    ><i class="fab fa-linkedin-in"></i></a
                ></span>
                <span
                  ><a
                    href="https://www.instagram.com/thefloodteam/"
                    target="_blank"
                    ><i class="fab fa-instagram"></i></a
                ></span>
              </div>
              <br />
              {{location.address.street}}<br />
              {{location.address.city}}, {{location.address.state}}
              {{location.address.zip}}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid">
      <div
        class="container toppadding"
        style="padding-right: 15px; padding-left: 15px"
      >
        <div class="row">
          <div class="col-md-6">
            <p>&copy; 2021 The Flood Team. All rights reserved.</p>
          </div>
          <div class="col-md-6">
            <p><a class="/privacy-policy/">Privacy Policy</a></p>
          </div>
        </div>
      </div>
    </div>
    <!-- Google Tag Manager -->
    <script>
      (function (w, d, s, l, i) {
        w[l] = w[l] || [];
        w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
        var f = d.getElementsByTagName(s)[0],
          j = d.createElement(s),
          dl = l != "dataLayer" ? "&l=" + l : "";
        j.async = true;
        j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
        f.parentNode.insertBefore(j, f);
      })(
        window,
        document,
        "script",
        "dataLayer",
        "{{location.googleTagManagerId}}"
      );
    </script>
    <!-- End Google Tag Manager -->
  </body>
</html>
`,
          };
        }, 4000);
      },
    },
  },
} as ComponentPresets;
