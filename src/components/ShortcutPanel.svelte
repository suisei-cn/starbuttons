<div id="modal" on:click|self="{() => dispatch('close')}">
  <div id="modalBox">
    <span id="modalClose" on:click="{() => dispatch('close')}" aria-label="{$_("Close")}">&times;</span>
    <div id="modalBody">
      {#if status === MsgStatus.PENDING}
        {$_('Loading...')}
      {:else if status === MsgStatus.REJECTED}
        {$_('Failed to load.')}
      {:else}
        <b id="title">{payload.title}</b>
        <div>
          <select id="audioSelect" bind:value="{audioSelectedFilename}">
            {#each payload.audios as item}
              <option value="{item}">{item}</option>
            {/each}
          </select>
          <button on:click="{prepareB64Audio}">OK</button>
        </div>
        <textarea id="b64textboard" cols="50" rows="5" readonly
          >{b64String}</textarea>
        <div>
          <button
            id="b64copybtn"
            data-clipboard-target="#b64textboard"
            disabled="{!audioReady}"
          >
            {$_('Copy to clipboard')}
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
  import { MsgStatus } from '../types'

  const assetBasePath = siteConfig.assets_path

  // Props
  export let payload: ButtonItem
  export let status: MsgStatus

  let clipboard
  let audioSelectedFilename = ''
  let b64String = ''
  $: audioFilename =
    payload.audios.length > 1 ? audioSelectedFilename : payload.audios[0]
  let audioReady = false

  const dispatch = createEventDispatcher()

  async function prepareB64Audio() {
    if (audioFilename === '') return
    audioReady = false
    b64String = $_('Fetching...')
    const musicFile = assetBasePath + audioFilename
    const fileBuf = await fetch(musicFile).then((x) => x.arrayBuffer())
    const fileArr = new Uint8Array(fileBuf)
    audioReady = true
    b64String = base64.fromByteArray(fileArr)
  }

  onMount(() => {
    clipboard = new ClipboardJS('#b64copybtn')
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
  #b64textboard {
    margin-bottom: 10px;
    width: 100%;
  }

  #modalBody {
    align-items: center;
    display: flex;
    flex-direction: column;
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
</style>
