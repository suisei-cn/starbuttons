<main>
  <FullscreenAnim />
  <TopSettings />
  <Board
    config="{siteConfig}"
    on:changeok="{(e) => {
      boardMode = !boardMode
    }}"
    bind:this="{board}"
  />
  <div
    id="switchBtn"
    class="stylizedBtn"
    on:click="{(e) => {
      board.toggleBoard()
    }}"
  >
    {#if boardMode}{$_('Back')}{:else}{$_('Music board')}{/if}
  </div>
  <BottomBar />
</main>

<script lang="ts">
  import { onMount } from 'svelte'
  import FullscreenAnim from './components/FullscreenAnim.svelte'
  import TopSettings from './components/TopSettings.svelte'
  import BottomBar from './components/BottomBar.svelte'
  import Board from './components/Board.svelte'
  import type { SiteConfig } from './types'
  import { format, _ } from 'svelte-i18n'
  import _fontface from './styles/fontface.scss'
  import { initGlobalContext } from './globalCtx'

  export let siteConfig: SiteConfig

  let boardMode = false
  let board

  function updateLocalizedTitle() {
    document.title = $format('Starbuttons')
  }

  onMount(() => {
    updateLocalizedTitle()
  })

  initGlobalContext()
</script>

<style lang="scss">
  @import './styles/variables';
  @import './styles/common';

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

  #switchBtn {
    height: 6vh;
    line-height: 6vh;
    width: 30vh;
  }
</style>
