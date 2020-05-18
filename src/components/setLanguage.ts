export function setLanguage(window: Window, navigator: Navigator, vue: Vue) {
  const lang =
    (
      window.location.search.match(/lang=([a-zA-Z-]+)/)?.[1] ||
      (navigator as Navigator).language ||
      // @ts-ignore no-implicit-any
      (navigator as any).userLanguage
    ).split("-")[0] || "zh";
  vue.$i18n.locale = lang;
}
