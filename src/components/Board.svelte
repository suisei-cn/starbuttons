<div id="boardWrapper" class:wideView="{wideMode}">
  {#if boardMode}
    <div id="board" class="boardPart" class:wideMode transition:fade>
      <div id="boardContext">
        {#each soundGroups as soundGroup}
          <h2>{ln($locale, categories[soundGroup.slug])}</h2>
          {#each soundGroup.sounds as sound}
            <BaseButton item="{sound}" />
          {/each}
        {/each}
        {#if uncategoriedSounds.length}
          <h2>{$_('Uncategorized')}</h2>
          {#each uncategoriedSounds as sound}
            <BaseButton item="{sound}" />
          {/each}
        {/if}
      </div>
    </div>
  {:else}
    <div
      id="bigBtn"
      class="boardPart"
      class:wideMode
      transition:fade
      tabindex="0"
    >
      <BaseButton item="{centralSound}" baseBtnInList="{false}" />
    </div>
  {/if}
</div>
{#if contentReady !== 1}
  <div id="placeholder">
    {#if contentReady === 0}
      <p>{$_('Loading...')}</p>
    {:else if contentReady === -1}
      <p>{$_('Failed to fetch sounds list. Please try refreshing.')}</p>
    {/if}
  </div>
{/if}

<script lang="ts">
  import type { Categories, SiteConfig, Sound, SoundCategory } from '../types'
  import { onMount, createEventDispatcher } from 'svelte'
  import { fade } from 'svelte/transition'
  import { format, locale, _ } from 'svelte-i18n'
  import { ln } from '../utils/i18n'
  import BaseButton from './BaseButton.svelte'

  export let config: SiteConfig
  let contentReady: -1 | 0 | 1 = 0
  let boardMode: boolean = false
  let wideMode: boolean
  let soundGroups: SoundCategory[] = []
  let uncategoriedSounds: Sound[] = []
  let categories: Categories = {}
  let centralSound: Sound = { name: '', file: '', type: 'center' }
  const dispatch = createEventDispatcher()

  export function toggleBoard() {
    boardMode = !boardMode
    setTimeout(() => {
      wideMode = boardMode
      setTimeout(() => {
        dispatch('changeok')
      }, 250)
    }, 0)
  }

  function generateSoundGroups(
    sounds: Sound[],
    cats: Categories
  ): [SoundCategory[], Sound[]] {
    const categorizedSounds: { [name: string]: Sound[] } = {}
    const soundNoCat = []

    for (const i of sounds) {
      if (!i.category) {
        soundNoCat.push(i)
        continue
      }
      // For backward compat
      if (!Array.isArray(i.category)) i.category = [i.category]
      for (const cat of i.category) {
        if (!categorizedSounds[cat]) categorizedSounds[cat] = []
        categorizedSounds[cat].push(i)
      }
    }

    const sortedCats = Object.entries(categorizedSounds).sort(
      (a, b) => (cats[a[0]]?.order || 999) - (cats[b[0]]?.order || 999)
    )
    const soundCategory: SoundCategory[] = []
    for (const i of sortedCats) {
      soundCategory.push({
        slug: i[0],
        sounds: i[1],
      })
    }

    return [soundCategory, soundNoCat]
  }

  onMount(async () => {
    const allSounds: Sound[] = await fetch(config.sounds)
      .then((x) => x.json())
      .catch((e) => {
        contentReady = -1
        const err = new Event('loadfailed')
        window.dispatchEvent(err)
        window?.errorFormatter(
          $format('Sound list fetch error:') + ' ' + String(e)
        )
        console.error('Failed to fetch sounds')
        return []
      })

    if (contentReady !== -1) {
      contentReady = 1
    }

    categories = await fetch(config.categories)
      .then((x) => x.json())
      .catch((e) => {
        window?.errorFormatter(
          $format('Categories fetch error:') + ' ' + String(e)
        )
        console.error('Failed to fetch categories')
        return {}
      })

    const sounds = allSounds.filter((x) => x.type !== 'center')
    ;[soundGroups, uncategoriedSounds] = generateSoundGroups(sounds, categories)
    centralSound = allSounds.filter((x) => x.type === 'center')[0]
    if (!centralSound && contentReady === 1) {
      boardMode = true
    }
  })
</script>

<style lang="scss">
  @import '../styles/variables';
  @import '../styles/common';

  #board {
    padding: 5px;
    overflow-y: scroll;
    height: $table-height;
    border-radius: 12px;
    background: $board-color;
  }

  #boardContext {
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    box-sizing: border-box;
  }

  :global(#bigBtn .baseBtn) {
    margin-top: ($table-height - $main-btn-height)/2;
    line-height: $main-btn-height;
    background: $btn-gradient-background;
    font-size: 5rem;

    @media screen and (max-width: 1340px) {
      font-size: 2rem !important;
    }
    @media screen and (max-width: 600px) {
      font-size: 1rem !important;
    }
    @media screen and (max-width: 300px) {
      font-size: 0 !important;
    }
  }

  .boardPart {
    position: absolute;
    width: $board-narrow-width;
    transition: width 0.25s ease-in-out, height 0.25s ease-in-out,
      background 0.25s linear;
    &.wideMode {
      width: $board-wide-width;
    }
  }

  #boardWrapper {
    transition: transform 0.25s;
    position: relative;
    min-height: $table-height;
    transform: translateX(-$board-narrow-width / 2);
    &.wideView {
      transform: translateX(-$board-wide-width / 2);
    }
  }

  h2 {
    font-weight: 700;
    font-size: 1.3rem;
    margin: 12px;
    width: 100%;
  }

  @media screen and (max-width: 600px) {
    :global(#bigBtn .baseBtn) {
      margin-left: $xs-board-narrow-width-diff;
      margin-right: $xs-board-narrow-width-diff;
    }
  }

  #placeholder {
    position: absolute;
    height: 100vh;
    width: 100vw;
    left: 0;
    top: 0;
    font-size: 3rem;
    color: $color-placeholder-text;
    text-align: center;
    pointer-events: none;
    display: flex;
    justify-content: center;
    align-items: center;
    p {
      margin: 0 5vw;
    }
  }
</style>
