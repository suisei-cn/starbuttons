import Vue from "vue";
import VueI18n from "vue-i18n";
import i18n_zh from "./lang/zh";
import i18n_en from "./lang/en";
import i18n_ja from "./lang/ja";

Vue.use(VueI18n);

export const i18n = new VueI18n({
  locale: "zh",
  fallbackLocale: "en",
  messages: {
    en: i18n_en,
    ja: i18n_ja,
    zh: i18n_zh
  }
});
