import App from './App.svelte'
import config from './config'
import initi18n from './utils/i18n'

initi18n()

const app = new App({
  target: document.body,
  props: {
    siteConfig: config,
  },
})

export default app
