import Vue from 'vue';
import App from './App.vue';
import store from './store';
import { i18n } from './i18n-setup';

Vue.config.productionTip = false;

new Vue({
  store,
  i18n,
  render: (h) => h(App),
}).$mount('#app');
