var LANG = "";
var STRINGS = {};

function _(text, lang = LANG) {
  if (!STRINGS[lang]) return text;
  return STRINGS[lang][text] || text;
}

function setLang(lang) {
  LANG = lang;
}

async function loadLang(lang) {
  STRINGS[lang] = await fetch(`l10n/${lang}.json`).then((x) => x.json());
  LANG = lang;
}
