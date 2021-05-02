<main class:modalUp>
  <FullscreenAnim />
  <Topbar />
  <ErrorPanel />
  {#if !disableAll}
    <TopSettings />
  {/if}
  <Board
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
{#if modalUp}
  <ShortcutPanel
    payload="{b64Payload}"
    status="{b64MsgStat}"
    on:close="{() => (modalUp = false)}"
  />
{/if}

<script lang="ts">
  import { onMount } from 'svelte'
  import FullscreenAnim from './components/FullscreenAnim.svelte'
  import ErrorPanel from './components/ErrorPanel.svelte'
  import TopSettings from './components/TopSettings.svelte'
  import BottomBar from './components/BottomBar.svelte'
  import Board from './components/Board.svelte'
  import Topbar from './components/Topbar.svelte'
  import ShortcutPanel from './components/ShortcutPanel.svelte'
  import type { ButtonItem, SiteConfig } from './types'
  import { MsgStatus } from './types'
  import { format, _ } from 'svelte-i18n'
  // @ts-ignore
  import _fontface from './styles/fontface.scss'
  import { initGlobalContext } from './globalCtx'

  export let siteConfig: SiteConfig
  export let testingConfig: SiteConfig

  let boardMode = false
  let board
  let disableAll = false

  let modalUp = false
  let b64Payload: ButtonItem = {
    title: '',
    audios: [],
  }
  let b64MsgStat: MsgStatus = MsgStatus.RESOLVED

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
    window.addEventListener('showb64window', async (evt: CustomEventInit) => {
      b64MsgStat = MsgStatus.PENDING
      modalUp = true
      try {
        b64Payload = JSON.parse(await evt.detail)
        b64MsgStat = MsgStatus.RESOLVED
      } catch (e) {
        b64MsgStat = MsgStatus.REJECTED
        throw e
      }
    })
  })

  initGlobalContext()
</script>

<style lang="scss">
  @import './styles/variables';
  @import './styles/common';

  :global(body) {
    height: 100vh;
    width: 100vw;
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

    &.modalUp {
      filter: blur(10px);
      transition: all ease-in-out 0.3s;
    }
  }

  #switchBtn {
    height: 6vh;
    line-height: 6vh;
    width: $option-button-width;
    margin: 3vh 0;

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
