import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { i18n } from "./i18n-setup";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faGithub,
  faDiscord,
  faTelegram
} from "@fortawesome/free-brands-svg-icons";

import "./registerServiceWorker";

Vue.config.productionTip = false;

library.add(faGithub);
library.add(faDiscord);
library.add(faTelegram);
Vue.component("font-awesome-icon", FontAwesomeIcon);

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
