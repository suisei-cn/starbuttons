import { addMessages, init, getLocaleFromNavigator } from 'svelte-i18n'

import en from '../lang/en'
import ja from '../lang/ja'
import zh from '../lang/zh'

export default () => {
  addMessages('en', en)
  addMessages('zh', zh)
  addMessages('ja', ja)

  init({
    fallbackLocale: 'ja',
    initialLocale: getLocaleFromNavigator(),
  })
}
