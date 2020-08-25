<div id="boardWrapper">
  {#if boardMode}
    <div id="board">
      {#each sounds as sound}
        <BaseButton item="{sound}" />
      {/each}
    </div>
  {:else}
    <div id="bigBtn" class="stylizedBtn">{centralSoundName}</div>
    <div class="hidden">
      <BaseButton item="{centralSound}" />
    </div>
  {/if}
</div>

<script lang="ts">
  import type { SiteConfig, Sound } from '../types'
  import { onMount } from 'svelte'
  import { locale } from 'svelte-i18n'
  import BaseButton from './BaseButton.svelte'

  export let config: SiteConfig
  export let boardMode: boolean

  let sounds: Sound[] = []
  let centralSound: Sound = { name: '', file: '', type: 'center' }
  $: centralSoundName = centralSound?.name_l10n?.[$locale] || centralSound.name

  onMount(async () => {
    const allSounds = await fetch(config.sounds)
      .then((x) => x.json())
      .catch(() => {
        console.error('Failed to fetch sounds')
        return []
      })

    sounds = allSounds.filter((x) => x.type !== 'center')
    centralSound = allSounds.filter((x) => x.type === 'center')[0]
    if (!centralSound) {
      boardMode = true
    }
  })
</script>

<style lang="scss">
  @import '../styles/variables';
  @import '../styles/common';

  #board {
    overflow-y: scroll;
    height: $table-height;
    width: 80vw;
    padding: 5px;
    border-radius: 12px;
    background: $board-color;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    font-display: swap;
  }

  #bigBtn {
    line-height: 40vh;
    font-size: 5rem;
    width: 40vw;
  }

  #boardWrapper {
    z-index: 1;
  }
</style>
