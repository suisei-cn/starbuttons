<div id="board">
  {#each sounds as sound}
    <BaseButton item="{sound}" />
  {/each}
</div>

<script lang="ts">
  import type { SiteConfig, Sound } from '../types'
  import { onMount } from 'svelte'
  import BaseButton from './BaseButton.svelte'

  export let config: SiteConfig

  let sounds: Sound[] = []

  onMount(async () => {
    sounds = await fetch(config.sounds)
      .then((x) => x.json())
      .catch(() => {
        console.error('Failed to fetch sounds')
        return []
      })
  })
</script>

<style lang="scss">
  @import '../styles/variables';

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
    .normalBtn {
      animation: 0.66s button-appear;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    #bigButtonText {
      opacity: 0;
    }
  }
</style>
