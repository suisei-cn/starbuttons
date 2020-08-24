<div class="baseButton" on:click="{playSound}">{localizedName}</div>

<script lang="ts">
  import type { Sound } from '../types'
  import siteConfig from '../config'
  const assetBasePath = siteConfig.assets_path

  // Props
  export let item: Sound

  $: localizedName = item?.name_l10n?.['ja'] || item.name

  // Methods
  function playSound() {
    const audio = new Audio(assetBasePath + item.file)
    audio.play()
  }
</script>

<style lang="scss">
  @import '../styles/BaseButton.scss';
  @import '../styles/utils.scss';
</style>
