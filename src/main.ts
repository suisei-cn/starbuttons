import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { i18n } from "./i18n-setup";
import CentralPlayer from "./components/centralPlayer";
import * as Sentry from "@sentry/browser";
import { Vue as VueIntegration } from "@sentry/integrations";
import "./assets/sounds.yml";
import "./assets/categories.yml";

import "./registerServiceWorker";

Vue.prototype.$status = {
  darkMode: false,
  playCount: 0,
  player: new CentralPlayer()
};

Sentry.init({
  dsn:
    "https://fea8a42155df4851b95de0a8de86cb17@o407537.ingest.sentry.io/5276695",
  integrations: [new VueIntegration({ Vue, attachProps: true })]
});

Vue.config.productionTip = false;

new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount("#app");
