<div
  class="baseBtn stylizedBtn"
  class:active="{concurrentPlays !== 0}"
  class:pending
  on:click="{playSound}"
>
  {localizedName}
</div>

<script lang="ts">
  import { getContext, onMount } from 'svelte'
  import { locale } from 'svelte-i18n'
  import type { Sound } from '../types'
  import siteConfig from '../config'
  import type CentralPlayer from './centralPlayer'
  import { ln } from '../utils/i18n'
  const assetBasePath = siteConfig.assets_path

  // Props
  export let item: Sound
  let playerCtx: CentralPlayer
  let concurrentPlays = 0
  let pending = false

  $: localizedName = ln($locale, item)

  // Methods
  function selectFile(): string {
    if (Array.isArray(item.file)) {
      return item.file[Math.floor(Math.random() * item.file.length)]
    } else {
      return item.file
    }
  }

  function playSound() {
    pending = true
    const audio = playerCtx.addAudio(assetBasePath + selectFile())

    audio.addEventListener('play', () => {
      pending = false
      concurrentPlays++
    })
    audio.addEventListener('pause', () => {
      concurrentPlays--
    })
    audio.play()
  }

  onMount(() => {
    playerCtx = getContext('player')
  })
</script>

<style lang="scss">
  @import '../styles/BaseButton.scss';
  @import '../styles/common.scss';

  .pending {
    opacity: 0.8;
  }
</style>
