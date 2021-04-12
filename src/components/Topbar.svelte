{#if display}
  <header>
    <span>
      {$_('4thLiveInfo_Header')}
      <a
        href="https://www.youtube.com/watch?v=Ajwv4ANSSg0"
        target="_blank"
      >
        {$_('4thLiveInfo_Link')}
      </a>
    </span>
    <svg
      id="close"
      on:click="{(e) => (display = false)}"
      viewBox="0 0 4 4"
      stroke="white"
      stroke-width="0.25"
      stroke-linecap="round"
      stroke-linejoin="round"
      fill="none"
    >
      <path d="M3 1L1 3"></path>
      <path d="M1 1l2 2"></path>
    </svg>
  </header>
{/if}

<script lang="ts">
  import { _ } from 'svelte-i18n'
  let display = true
</script>

<style lang="scss">
  $header-height: 40px;
  header {
    position: absolute;
    height: $header-height;
    line-height: $header-height;
    width: 100vw;
    text-align: center;
    background: #000;
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;

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

  #close {
    position: absolute;
    right: 20px;
    height: $header-height * 0.6;
    cursor: pointer;
  }

  @media (max-width: 750px) {
    header {
      display: none;
    }
  }
</style>
