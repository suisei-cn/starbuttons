<main>
  {#each sounds as sound}
    <BaseButton item="{sound}" />
  {/each}
</main>

<script lang="ts">
  import { onMount } from 'svelte'
  import BaseButton from './components/BaseButton.svelte'
  import type { SiteConfig, Sound } from './types'

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
