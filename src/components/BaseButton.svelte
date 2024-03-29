<div
  use:longPressOrRightClick
  on:long-press="{showB64CopyPanel}"
  class="baseBtn stylizedBtn"
  class:active="{concurrentPlays !== 0}"
  class:baseBtnInList
  class:pending
  class:testHoverWidth
  style="min-width: {minWidth}"
  on:click="{playSound}"
  on:keypress="{playSound}"
  bind:this="{self}"
  tabIndex="0"
>
  {localizedName}
</div>

<script lang="ts">
  import { getContext, onMount } from 'svelte'
  import { format, locale } from 'svelte-i18n'
  import type { ButtonItem, Sound } from '../types'
  import siteConfig from '../config'
  import type CentralPlayer from './centralPlayer'
  import { GLOBAL_DEFAULT_LANG, ln } from '../utils/i18n'
  import { longPressOrRightClick } from '../actions/longPressOrRightClick'
  const assetBasePath = siteConfig.assets_path

  // Props
  export let item: Sound
  export let baseBtnInList: boolean = true
  let playerCtx: CentralPlayer = getContext('player')
  let concurrentPlays = 0
  let pending = false
  let testHoverWidth: boolean = false
  let self: any
  let minWidth = '0px'

  $: localizedName = ln($locale || GLOBAL_DEFAULT_LANG, item)

  // Methods
  function selectFile(): string {
    if (Array.isArray(item.file)) {
      return item.file[Math.floor(Math.random() * item.file.length)]
    } else {
      return item.file
    }
  }

  function updateHoverWidth() {
    const width = self.offsetWidth
    if (!width) {
      requestAnimationFrame(updateHoverWidth)
      return
    }
    minWidth = String(width - 16 + 'px')
    testHoverWidth = false
  }

  function scanHoverWidth() {
    minWidth = '0px'
    testHoverWidth = true
    requestAnimationFrame(updateHoverWidth)
  }

  export function playSound() {
    pending = true
    const audio = playerCtx.addAudio(assetBasePath + selectFile())
    const playTimeout = setTimeout(() => {
      window.errorFormatter?.(
        $format('Voices are still loading. Please be patient...')
      )
    }, 1500)
    audio.addEventListener('play', () => {
      concurrentPlays++
    })
    audio.addEventListener('pause', () => {
      concurrentPlays--
    })
    audio
      .play()
      .then(() => {
        pending = false
        clearTimeout(playTimeout)
      })
      .catch((e) => {
        window?.errorFormatter?.(
          $format('Error in the playback:') + ' ' + String(e)
        )
      })
  }

  function showB64CopyPanel() {
    const passItem: ButtonItem = {
      title: localizedName,
      audios: Array.isArray(item.file) ? item.file : [item.file],
    }
    window.dispatchEvent(
      new CustomEvent('showb64window', {
        detail: JSON.stringify(passItem),
      })
    )
  }

  onMount(() => {
    if (baseBtnInList) {
      scanHoverWidth()
      window.addEventListener('languagechange', scanHoverWidth)
    }
  })
</script>

<style lang="scss">
  @import '../styles/BaseButton.scss';
  @import '../styles/common.scss';

  .pending {
    opacity: 0.8;
  }
</style>
