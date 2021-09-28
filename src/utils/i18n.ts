import {
  addMessages,
  init,
  getLocaleFromNavigator,
  getLocaleFromQueryString,
} from 'svelte-i18n'

import en from '../lang/en'
import ja from '../lang/ja'
import zh from '../lang/zh'
import type { NameWithL10n } from '../types'

export const GLOBAL_DEFAULT_LANG = 'zh'

export default () => {
  addMessages('en', en)
  addMessages('zh', zh)
  addMessages('ja', ja)

  init({
    fallbackLocale: GLOBAL_DEFAULT_LANG,
    initialLocale: (
      getLocaleFromQueryString('lang') ||
      getLocaleFromNavigator() ||
      GLOBAL_DEFAULT_LANG
    ).split('-')[0],
  })
}

export function ln(lang: string, str: NameWithL10n) {
  return str?.name_l10n?.[lang] || str?.name || ''
}
