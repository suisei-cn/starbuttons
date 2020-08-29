<main>
  <FullscreenAnim />
  <ErrorPanel />
  {#if !disableAll}
    <TopSettings />
  {/if}
  <Board
    config="{siteConfig}"
    on:changeok="{(e) => {
      boardMode = !boardMode
    }}"
    bind:this="{board}"
  />
  {#if !disableAll}
    <div
      id="switchBtn"
      class="stylizedBtn nonBaseBtn"
      on:click="{(e) => {
        board.toggleBoard()
      }}"
      tabindex="0"
    >
      {#if boardMode}{$_('Back')}{:else}{$_('Music board')}{/if}
    </div>
  {/if}
  <BottomBar />
</main>

<script lang="ts">
  import { onMount } from 'svelte'
  import FullscreenAnim from './components/FullscreenAnim.svelte'
  import ErrorPanel from './components/ErrorPanel.svelte'
  import TopSettings from './components/TopSettings.svelte'
  import BottomBar from './components/BottomBar.svelte'
  import Board from './components/Board.svelte'
  import type { SiteConfig } from './types'
  import { format, _ } from 'svelte-i18n'
  import _fontface from './styles/fontface.scss'
  import { initGlobalContext } from './globalCtx'

  export let siteConfig: SiteConfig
  export let testingConfig: SiteConfig

  let boardMode = false
  let board
  let disableAll = false

  function updateLocalizedTitle() {
    document.title = $format('Starbuttons')
  }

  onMount(() => {
    if (new URL(String(window.location)).searchParams.get('testing') === '1') {
      board.load(testingConfig)
    } else {
      board.load(siteConfig)
    }
    updateLocalizedTitle()
    window.addEventListener('languagechange', updateLocalizedTitle)
    window.addEventListener('loadfailed', () => {
      disableAll = true
    })
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
    width: $option-button-width;

    font-size: 1.6rem;
    @media screen and (max-height: 750px) {
      font-size: 1rem !important;
    }
    @media screen and (max-width: 1340px) {
      font-size: 1rem !important;
    }
    @media screen and (max-width: 300px) {
      font-size: 0 !important;
    }
  }
</style>
