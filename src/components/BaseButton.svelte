<div
  class="baseButton"
  class:active="{concurrentPlays !== 0}"
  on:click="{playSound}"
>
  {localizedName}
</div>

<script lang="ts">
  import { getContext, onMount } from 'svelte'
  import type { Sound } from '../types'
  import siteConfig from '../config'
  import type CentralPlayer from './centralPlayer'
  const assetBasePath = siteConfig.assets_path

  // Props
  export let item: Sound
  let playerCtx: CentralPlayer
  let concurrentPlays = 0

  $: localizedName = item?.name_l10n?.['ja'] || item.name

  // Methods
  function selectFile(): string {
    if (Array.isArray(item.file)) {
      return item.file[Math.floor(Math.random() * item.file.length)]
    } else {
      return item.file
    }
  }

  function playSound() {
    const audio = playerCtx.addAudio(assetBasePath + selectFile())
    audio.addEventListener('play', () => {
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
  @import '../styles/utils.scss';
</style>
