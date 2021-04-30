<div id="modal" on:click|self="{() => dispatch('close')}">
  <div id="modalBox">
    <span id="modalClose" on:click="{() => dispatch('close')}">&times;</span>
    <div id="modalBody">
      <textarea id="b64textboard" cols="50" rows="10" readonly>{text}</textarea>
      <div>
        <button
          id="b64copybtn"
          data-clipboard-target="#b64textboard"
          disabled="{!ready}"
        >
          Copy to clipboard
        </button>
        →
        <a
          href="https://www.icloud.com/shortcuts/90544f62b04d4ab68a536e55e3d05316"
          target="_blank"
        >
          <button>Shortcut</button></a
        >
      </div>
    </div>
  </div>
</div>

<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte'
  import ClipboardJS from 'clipboard'

  // Props
  export let text: string
  export let ready: boolean

  let clipboard

  const dispatch = createEventDispatcher()

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
