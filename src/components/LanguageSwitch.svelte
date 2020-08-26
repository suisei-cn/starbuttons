<select id="langSelect" bind:value={selected} on:blur="{()=>{$locale = selected}}">
    <option value="zh">中文</option>
    <option value="ja">日本語</option>
    <option value="en">English</option>
</select>

<script lang="ts">
    import { onMount } from "svelte"
    import { locale } from "svelte-i18n"

    let selected :string
    let changeEvent = new Event('languagechange')

    onMount(()=>{
        selected = $locale
        window.dispatchEvent(changeEvent)
    })
</script>

<style lang="scss">
  @import '../styles/variables';

  #langSelect {
    margin-left: .5vw;
    outline: none;
    border: none;
    background: none;
    color: $bottom-link-color;
    cursor: pointer;
  }
</style>