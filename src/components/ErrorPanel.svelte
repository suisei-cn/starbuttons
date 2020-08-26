<div id="errors">
  {#each currentErrors as error}
    <div class="error">{error}</div>
  {/each}
</div>

<script lang="ts">
  import { onMount, setContext } from 'svelte'

  let currentErrors: string[] = []

  export function displayError(text: string, time: number = 1500) {
    currentErrors = [...currentErrors, text]
    setTimeout(() => {
      const id = currentErrors.indexOf(text)
      currentErrors = [
        ...currentErrors.slice(0, id),
        ...currentErrors.slice(id + 1),
      ]
    }, time)
  }

  onMount(() => {
    window.errorFormatter = displayError
  })
</script>

<style lang="scss">
  @import '../styles/variables';

  #errors {
    position: absolute;
    top: 4vh;
    opacity: 0.8;
    pointer-events: none;
  }

  .error {
    text-align: center;
    color: $color-font;
    background-color: $color--box-background;
    padding: 1vh 1vw;
    border-radius: 5px;
    margin: 2vh 15vw;
  }
</style>
