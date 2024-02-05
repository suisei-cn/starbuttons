import App from './App.svelte'
import config, { testingConfig } from './config'
import initi18n from './utils/i18n'

initi18n()

const app = new App({
  target: document.body,
  props: {
    siteConfig: config,
    testingConfig,
  },
})

export default app

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://www.snowpack.dev/#hot-module-replacement
if (import.meta.hot) {
  import.meta.hot.accept()
  import.meta.hot.dispose(() => {
    app.$destroy()
  })
}
