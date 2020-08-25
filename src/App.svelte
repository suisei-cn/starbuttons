<main>
  <FullscreenAnim />
  <TopSettings />
  {#each sounds as sound}
    <BaseButton item="{sound}" />
  {/each}
  <BottomBar />
</main>

<script lang="ts">
  import { onMount } from 'svelte'
  import FullscreenAnim from './components/FullscreenAnim.svelte'
  import BaseButton from './components/BaseButton.svelte'
  import TopSettings from './components/TopSettings.svelte'
  import BottomBar from './components/BottomBar.svelte'
  import type { SiteConfig, Sound } from './types'
  import { waitLocale, _ } from 'svelte-i18n'
  import _fontface from './styles/fontface.scss'

  export async function preload() {
    return waitLocale()
  }

  export let siteConfig: SiteConfig
  let sounds: Sound[] = []

  onMount(async () => {
    sounds = await fetch(siteConfig.sounds)
      .then((x) => x.json())
      .catch(() => {
        console.error('Failed to fetch sounds')
        return []
      })
  })
</script>

<style lang="scss">
  @import './styles/variables';

  body {
    overflow: hidden;
  }

  main {
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    /* what the hell */
    margin: 0;
    position: absolute;
    left: 0;
    top: 0;
    background: $main-background;
    color: $color-font;
  }
</style>
