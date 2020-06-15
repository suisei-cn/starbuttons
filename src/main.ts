import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { i18n } from "./i18n-setup";
import CentralPlayer from "./components/centralPlayer";
import * as Sentry from "@sentry/browser";
import { Vue as VueIntegration } from "@sentry/integrations";

import "./registerServiceWorker";

Vue.prototype.$status = {
  darkMode: false,
  playCount: 0,
  player: new CentralPlayer()
};

Sentry.init({
  dsn: "https://571ceb23ed804c08bc4a59087b4ba079@o407498.ingest.sentry.io/5276537",
  integrations: [new VueIntegration({ Vue, attachProps: true })],
});

Vue.config.productionTip = false;

new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount("#app");