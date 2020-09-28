<header>
  {$_('Suisei Channel reaches 500k subscribers!')}
  <a
    href="https://twitter.com/suisei_hosimati/status/1310208318338510850"
    target="_blank"
  >
    {$_('3rd YouTube Live on Oct 19')}
  </a>
</header>

<script lang="ts">
  import { _ } from 'svelte-i18n'
</script>

<style lang="scss">
  header {
    position: absolute;
    height: 30px;
    line-height: 30px;
    width: 100vw;
    text-align: center;
    background: #000;
    z-index: 10;

    a {
      color: aqua;
      font-weight: 600;
      text-decoration: none;
      &:focus,
      &:hover {
        text-decoration: underline;
      }
    }
  }

  @media (max-width: 750px) {
    header {
      display: none;
    }
  }
</style>
