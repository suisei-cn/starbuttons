<div
  class="baseBtn stylizedBtn"
  class:active="{concurrentPlays !== 0}"
  class:baseBtnInList
  class:pending
  class:testHoverWidth
  style="min-width: {minWidth}"
  on:click="{playSound}"
  bind:this="{self}"
  tabindex="0"
>
  {localizedName}
</div>

<script lang="ts">
  import { getContext, onMount } from 'svelte'
  import { format, locale } from 'svelte-i18n'
  import type { ErrorFormatter, Sound } from '../types'
  import siteConfig from '../config'
  import type CentralPlayer from './centralPlayer'
  import { ln } from '../utils/i18n'
  const assetBasePath = siteConfig.assets_path

  // Props
  export let item: Sound
  export let baseBtnInList: boolean = true
  let playerCtx: CentralPlayer
  let concurrentPlays = 0
  let pending = false
  let testHoverWidth: boolean = false
  let self
  let minWidth = '0px'

  $: localizedName = ln($locale, item)

  // Methods
  function selectFile(): string {
    if (Array.isArray(item.file)) {
      return item.file[Math.floor(Math.random() * item.file.length)]
    } else {
      return item.file
    }
  }

  function scanHoverWidth() {
    minWidth = '0px'
    testHoverWidth = true
    requestAnimationFrame(() => {
      const width = self.offsetWidth
      minWidth = String(width - 16 + 'px')
      testHoverWidth = false
    })
  }

  export function playSound() {
    pending = true
    const audio = playerCtx.addAudio(assetBasePath + selectFile())
    const playTimeout = setTimeout(() => {
      window?.errorFormatter(
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
        window?.errorFormatter(
          $format('Error in the playback:') + ' ' + String(e)
        )
      })
  }

  onMount(() => {
    playerCtx = getContext('player')
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
