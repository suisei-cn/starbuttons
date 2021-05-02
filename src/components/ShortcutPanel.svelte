<div id="modal" on:click|self="{() => dispatch('close')}">
  <div id="modalBox">
    <span
      id="modalClose"
      on:click="{() => dispatch('close')}"
      aria-label="{$_('Close')}">&times;</span
    >
    <div id="modalBody">
      {#if status === MsgStatus.PENDING}
        {$_('Loading...')}
      {:else if status === MsgStatus.REJECTED}
        {$_('Failed to load.')}
      {:else}
        <b id="title">{payload.title}</b>
        <div>
          <select id="audioSelect" bind:value="{audioSelectedFilename}">
            <option value="" selected>---</option>
            {#each payload.audios as item}
              <option value="{item}">{item}</option>
            {/each}
          </select>
        </div>
        <div class="oprBar">
          <button
            on:click="{playAudio}"
            disabled="{audioSelectedFilename === ''}"
          >
            {$_('Play')}
          </button>
          <button
            on:click="{generateB64Audio}"
            disabled="{audioSelectedFilename === ''}">OK</button
          >
        </div>
        <div>
          <button
            id="b64copybtn"
            data-clipboard-text="{b64String}"
            disabled="{audioStatus !== AudioStatus.RESOLVED &&
              audioStatus !== AudioStatus.COPIED}"
          >
            {#if audioStatus === AudioStatus.WAITING_FOR_INPUT}
              {$_('Select a clip first')}
            {:else if audioStatus === AudioStatus.PENDING}
              {$_('Fetching...')}
            {:else if audioStatus === AudioStatus.REJECTED}
              {$_('Failed to load.')}
            {:else if audioStatus === AudioStatus.COPIED}
              {$_('Copied!')}
            {:else}
              {$_('Copy to clipboard')}
            {/if}
          </button>
          →
          <a
            href="https://www.icloud.com/shortcuts/90544f62b04d4ab68a536e55e3d05316"
            target="_blank"
          >
            <button>{$_('Shortcut')}</button></a
          >
        </div>
      {/if}
    </div>
  </div>
</div>

<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte'
  import ClipboardJS from 'clipboard'
  import base64 from 'base64-js'
  import { _ } from 'svelte-i18n'

  import siteConfig from '../config'
  import type { ButtonItem } from '../types'
  import { MsgStatus, AudioStatus } from '../types'

  const assetBasePath = siteConfig.assets_path

  // Props
  export let payload: ButtonItem
  export let status: MsgStatus

  let clipboard
  let audioSelectedFilename = ''
  let b64String = ''
  let audioStatus: AudioStatus = AudioStatus.WAITING_FOR_INPUT

  const dispatch = createEventDispatcher()

  async function prepareB64Audio() {
    audioStatus = AudioStatus.PENDING
    b64String = ''
    const musicFile = assetBasePath + audioSelectedFilename
    const fileBuf = await fetch(musicFile).then((x) => x.arrayBuffer())
    const fileArr = new Uint8Array(fileBuf)
    audioStatus = AudioStatus.RESOLVED
    b64String = base64.fromByteArray(fileArr)
  }

  function generateB64Audio() {
    prepareB64Audio().catch((_) => {
      audioStatus = AudioStatus.REJECTED
    })
  }

  function playAudio() {
    const audio = new Audio(assetBasePath + audioSelectedFilename)
    audio.play()
  }

  onMount(() => {
    clipboard = new ClipboardJS('#b64copybtn')
    clipboard.on('success', function (e) {
      const wasStatus = audioStatus
      audioStatus = AudioStatus.COPIED
      setTimeout(() => {
        audioStatus = wasStatus
      }, 800)
    })
  })
</script>

<style lang="scss">
  @import '../styles/variables';

  #modal {
    position: fixed;
    z-index: 3;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    overflow: auto;
    background-color: black;
    background-color: rgba(0, 0, 0, 0.4);
  }

  #modalBox {
    background-color: #fafafa;
    border-radius: 15px;
    color: black;
    padding: 20px;
    position: absolute;
    top: 50%;
    transform: translate(50%, -50%);
    right: 50%;
    width: min(500px, 80vw);
  }

  #title {
    text-align: center;
  }

  #modalBody {
    align-items: center;
    display: flex;
    flex-direction: column;

    > div {
      margin-top: 10px;
    }
  }

  #modalClose {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
    margin-right: -5px;
    padding-left: 5px;

    &:hover,
    &:focus {
      color: black;
      text-decoration: none;
      cursor: pointer;
    }
  }

  .oprBar {
    display: flex;
    align-items: center;
    :not(:last-child) {
      margin-right: 7px;
    }
  }
</style>
