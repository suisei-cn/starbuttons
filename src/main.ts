import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { i18n } from "./i18n-setup";
import CentralPlayer from "./components/centralPlayer";

import "./registerServiceWorker";

Vue.prototype.$status = {
  darkMode: false,
  playCount: 0,
  player: new CentralPlayer()
};

Vue.config.productionTip = false;

new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount("#app");
