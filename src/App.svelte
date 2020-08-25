<main>
  {#each sounds as sound}
    <BaseButton item="{sound}" />
  {/each}
  <BottomBar />
</main>

<script lang="ts">
  import { onMount } from 'svelte'
  import BaseButton from './components/BaseButton.svelte'
  import BottomBar from './components/BottomBar.svelte'
  import type { SiteConfig, Sound } from './types'
  import { waitLocale, _ } from 'svelte-i18n'
  import _fontface from './styles/fontface.scss'

  export async function preload() {
    return waitLocale()
  }

  export let siteConfig: SiteConfig
  let sounds: Sound[] = []

  onMount(async () => {
    sounds = await fetch(siteConfig.sounds)
      .then((x) => x.json())
      .catch(() => {
        console.error('Failed to fetch sounds')
        return []
      })
  })
</script>

<style lang="scss">

</style>
