import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { i18n } from "./i18n-setup";

import "./registerServiceWorker";

Vue.prototype.$status = {
  multiPlay: true,
  darkMode: false,
  playCount: 0
};

Vue.config.productionTip = false;

new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount("#app");
