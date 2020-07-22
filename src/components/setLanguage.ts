export function setLanguage(window: Window, navigator: Navigator, vue: Vue) {
  const lang =
    (
      window.location.search.match(/lang=([a-zA-Z-]+)/)?.[1] ||
      (navigator as Navigator).language ||
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (navigator as any).userLanguage
    ).split("-")[0] || "zh";
  // Fallback yue to zh for now
  if (lang === "yue") lang = "zh";
  vue.$i18n.locale = lang;
}
