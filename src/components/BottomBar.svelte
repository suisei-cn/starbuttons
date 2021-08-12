<footer>
  <a
    href="https://github.com/suisei-cn/starbuttons"
    aria-label="GitHub repository of suisei.moe"
    target="_blank"
  >
    <i class="icon-github"></i>
  </a>
  /
  <a
    href="https://t.me/Hoshimachi_Suisei"
    aria-label="Telegram Fan Group"
    target="_blank"
  >
    <i class="icon-telegram"></i>
    <sup>(CN)</sup>
  </a>
  /
  <a
    href="https://discord.gg/suiseicord"
    aria-label="Discord Fan Group"
    target="_blank"
  >
    <i class="icon-discord"></i>
    <sup>(JP)</sup>
  </a>
  /
  <a
    href="https://discord.gg/hoshiyomi"
    aria-label="Discord Fan Group"
    target="_blank"
  >
    <i class="icon-discord"></i>
    <sup>(EN)</sup>
  </a>/
  <a
    href="https://www.youtube.com/channel/UC5CwaMl1eIgY8h02uZw7u8A"
    aria-label="YouTube: Suisei Channel"
    target="_blank"
  >
    <i class="icon-youtube"></i>
  </a>
  <a
    href="https://twitter.com/suisei_hosimati"
    aria-label="Twitter: @suisei_hosimati"
    target="_blank"
  >
    <i class="icon-twitter"></i>
  </a>
  /
  <LanguageSwitch />
</footer>

<script lang="ts">
  import { _ } from 'svelte-i18n'
  import LanguageSwitch from './LanguageSwitch.svelte'
</script>

<style lang="scss">
  @import '../styles/variables';

  footer {
    text-align: center;
    margin-bottom: 11vh;
    line-height: 1em;
  }

  a {
    margin: 0 0.5vw;
    text-decoration: none;
    color: $bottom-link-color;
  }
</style>
