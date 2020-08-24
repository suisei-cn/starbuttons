import App from './App.svelte'
import config from './config'

const app = new App({
  target: document.body,
  props: {
    siteConfig: config,
  },
})

export default app
