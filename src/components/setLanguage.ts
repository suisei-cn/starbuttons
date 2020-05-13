export function setLanguage(window: Window, navigator: Navigator, vue: Vue) {
  const lang =
    (
      window.location.search.match(/lang=([a-zA-Z-]+)/)?.[1] ||
      (navigator as any).language ||
      (navigator as any).userLanguage
    ).split("-")[0] || "zh";
  console.log("Locale", lang);
  vue.$i18n.locale = lang;
}
