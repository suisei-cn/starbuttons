<div id="settings">
  <input
    id="isMutliplay"
    type="checkbox"
    on:change="{chg}"
    bind:checked="{multiPlay}"
  />
  <label for="isMutliplay">{$_('Do Not Click Me')}</label>
  |
  <input
    id="isRepeat"
    type="checkbox"
    on:change="{chg}"
    bind:checked="{repeatThis}"
  />
  <label for="isRepeat">{$_('Repeat')}</label>
</div>

<script lang="ts">
  import { getContext, onMount } from 'svelte'
  import { _ } from 'svelte-i18n'
  import type CentralPlayer from './centralPlayer'

  let playerCtx: CentralPlayer = getContext('player')
  let multiPlay: boolean
  let repeatThis: boolean

  function chg() {
    // Tricky!
    setTimeout(() => {
      playerCtx.multiPlay = multiPlay
      playerCtx.repeatThis = repeatThis
    }, 0)
  }

  onMount(() => {
    multiPlay = playerCtx.multiPlay
    repeatThis = playerCtx.repeatThis
  })
</script>

<style lang="scss">
  #settings {
    display: flex;
    justify-content: center;
    margin-top: 15vh;
  }

  label {
    font-variant-caps: small-caps;
    font-variant-numeric: oldstyle-nums;
    font-weight: 400;
    font-size: 16px;
  }
</style>
