<main>
  <FullscreenAnim />
  <TopSettings />
  <Board config="{siteConfig}" />
  <BottomBar />
</main>

<script lang="ts">
  import { onMount } from 'svelte'
  import FullscreenAnim from './components/FullscreenAnim.svelte'
  import TopSettings from './components/TopSettings.svelte'
  import BottomBar from './components/BottomBar.svelte'
  import Board from './components/Board.svelte'
  import type { SiteConfig } from './types'
  import { waitLocale, _ } from 'svelte-i18n'
  import _fontface from './styles/fontface.scss'

  export async function preload() {
    return waitLocale()
  }

  export let siteConfig: SiteConfig
</script>

<style lang="scss">
  @import './styles/variables';

  :global(body) {
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
