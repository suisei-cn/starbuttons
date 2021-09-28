<!-- svelte-ignore a11y-no-onchange -->
<select id="langSelect" bind:value="{selected}" on:change="{switchLanguage}">
  <option value="zh">中文</option>
  <option value="ja">日本語</option>
  <option value="en">English</option>
</select>

<script lang="ts">
  import { GLOBAL_DEFAULT_LANG } from '../utils/i18n'

  import { onMount } from 'svelte'
  import { locale } from 'svelte-i18n'

  let selected: string
  let changeEvent = new Event('languagechange')

  function switchLanguage() {
    if ($locale === selected) return
    $locale = selected
    window.dispatchEvent(changeEvent)
  }

  onMount(() => {
    selected = $locale || GLOBAL_DEFAULT_LANG
  })
</script>

<style lang="scss">
  @import '../styles/variables';

  #langSelect {
    margin-left: 0.5vw;
    outline: none;
    border: none;
    background: none;
    color: $bottom-link-color;
    cursor: pointer;
  }
</style>
