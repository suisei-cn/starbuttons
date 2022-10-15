{#if display}
  <header>
    <span>
      <a
        href="https://www.youtube.com/watch?v=LtqzI9y5yII"
        target="_blank"
        rel="noopener noreferrer"
      >
        STELLAR into the GALAXY →
      </a>
    </span>
    <svg
      id="close"
      on:click="{(_) => (display = false)}"
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
  let display = false
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
