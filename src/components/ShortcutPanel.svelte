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
            on:click="{downloadAudio}"
            disabled="{audioSelectedFilename === ''}"
          >
            {$_('Download')}</button
          >
          ({$_("What's this?")}
          <span id="helpLink">
            <a
              href="https://youtube.com/watch?v=UARzqq93XPY"
              target="_blank"
              rel="noopener noreferrer">YT</a
            >/<a
              href="https://www.bilibili.com/video/av375437164"
              target="_blank"
              rel="noopener noreferrer">BILI</a
            ></span
          >)
        </div>
        <div>
          <button
            on:click="{prepareB64Audio}"
            disabled="{audioSelectedFilename === ''}">{$_('Select')}</button
          >
          →
          <button
            id="b64copybtn"
            data-clipboard-text="{b64String}"
            disabled="{audioSelectedFilename !== audioBlobFilename ||
              audioSelectedFilename === '' ||
              b64String === ''}"
          >
            {$_('Copy to clipboard')}
          </button>
          →
          <a
            href="https://www.icloud.com/shortcuts/90544f62b04d4ab68a536e55e3d05316"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button>{$_('Shortcut')}</button></a
          >
        </div>
        <div>
          {#if audioStatus === AudioStatus.WAITING_FOR_INPUT}
            {$_('Select a clip first')}
          {:else if audioStatus === AudioStatus.PENDING}
            {$_('Fetching...')}
          {:else if audioStatus === AudioStatus.REJECTED}
            {$_('Failed to load.')}
          {:else if audioStatus === AudioStatus.COPIED}
            {$_('Copied!')}
          {/if}
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
  let audioBlobFilename = ''
  let audioBlobUrl = ''
  let b64String = ''
  let audioStatus: AudioStatus = AudioStatus.WAITING_FOR_INPUT

  $: musicFile = assetBasePath + audioSelectedFilename

  const dispatch = createEventDispatcher()

  async function prepareAudio() {
    if (audioBlobFilename === audioSelectedFilename) return true
    b64String = ''
    audioStatus = AudioStatus.PENDING
    const blob = await fetch(musicFile)
      .then((x) => x.blob())
      .catch(() => {
        audioStatus = AudioStatus.REJECTED
        return
      })
    if (blob === undefined) return false
    audioBlobUrl = URL.createObjectURL(blob)
    audioBlobFilename = audioSelectedFilename
    audioStatus = AudioStatus.RESOLVED
    return true
  }

  async function prepareB64Audio() {
    const ret = await prepareAudio()
    if (ret === false) return
    const fileBuf = await fetch(audioBlobUrl).then((x) => x.arrayBuffer())
    const fileArr = new Uint8Array(fileBuf)
    b64String = base64.fromByteArray(fileArr)
  }

  async function downloadAudio() {
    const ret = await prepareAudio()
    if (ret === false) return
    const link = document.createElement('a')
    link.href = audioBlobUrl
    link.setAttribute('download', audioSelectedFilename)
    link.click()
  }

  async function playAudio() {
    const ret = await prepareAudio()
    if (ret === false) return
    const audio = new Audio(audioBlobUrl)
    audio.play()
  }

  onMount(() => {
    clipboard = new ClipboardJS('#b64copybtn')
    clipboard.on('success', () => {
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
    font-family: system-ui, -apple-system, sans-serif;
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

  #helpLink {
    font-size: 0.83em;
    position: relative;
    top: -0.5em;
  }
</style>
