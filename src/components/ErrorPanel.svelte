<div id="errors">
  {#each currentErrors as error}
    <div
      class="error"
      on:mouseover="{(_) => mouseIn(error)}"
      on:mouseout="{(_) => mouseOut(error)}"
      on:click="{(_) => close(error.slug)}"
    >
      {@html error.html}
      <p id="closeTip">
        {$_('Click to close')}
        {#if error.defaultTime !== -1}
          {$_('or it will automatically close later')}
        {/if}
      </p>
    </div>
  {/each}
</div>

<script lang="ts">
  import { onMount } from 'svelte'
  import config from '../config'
  import { getKey, setKey } from '../utils/storage'
  import type { ErrorObject } from '../types'
  import { _ } from 'svelte-i18n'

  let currentErrors: ErrorObject[] = []
  let timerData: { [key: string]: NodeJS.Timeout } = {}
  const DEFAULT_DISPLAY_TIME = 2500

  function close(slug: string) {
    currentErrors = currentErrors.filter((x) => x.slug !== slug)
  }

  export function displayError(
    text: string,
    time: number = DEFAULT_DISPLAY_TIME
  ) {
    const thisError = createError(text, time)
    currentErrors = [...currentErrors, thisError]
    mouseOut(thisError)
  }

  function mouseIn(item: ErrorObject) {
    if (item.defaultTime < 0) return
    clearTimeout(timerData[item.slug])
    delete timerData[item.slug]
  }

  function mouseOut(item: ErrorObject) {
    if (item.defaultTime < 0) return
    timerData[item.slug] = setTimeout(() => {
      close(item.slug)
      delete timerData[item.slug]
    }, item.defaultTime)
  }

  function createError(
    text: string,
    time: number = DEFAULT_DISPLAY_TIME,
    slug: string = ''
  ): ErrorObject {
    return {
      html: text,
      slug: slug === '' ? slug : String(Math.random()),
      defaultTime: time,
    }
  }

  onMount(() => {
    window.errorFormatter = displayError
    fetch(config.notice)
      .then((x) => x.json())
      .catch((_) => [])
      .then((x) => {
        // This is in a Promise so feel free to throw errors
        const lastDateStr = getKey('last_notification_date')
        const lastDate = lastDateStr
          ? new Date(Number(lastDateStr))
          : new Date(0)
        const nowDate = Number(new Date())
        let totalDisplayLimit = 3
        for (const i of x
          .filter((x: any) => Number(new Date(x.date)) <= nowDate)
          .sort(
            (b: any, a: any) =>
              Number(new Date(a.date)) - Number(new Date(b.date))
          )) {
          if (Number(new Date(i.date)) < Number(lastDate)) break
          if (totalDisplayLimit === 0) break
          console.log(Number(new Date(i.date)), Number(lastDate))
          displayError(i.content, i.time || DEFAULT_DISPLAY_TIME)
          totalDisplayLimit--
        }
        setKey('last_notification_date', String(nowDate))
      })
      .catch()
  })
</script>

<style lang="scss">
  @import '../styles/variables';

  #errors {
    position: absolute;
    top: 4vh;
    opacity: 0.8;
    cursor: pointer;
    z-index: 4;
  }

  .error {
    text-align: center;
    color: $color-font;
    background-color: $color--box-background;
    padding: 1vh 1vw;
    border-radius: 5px;
    margin: 2vh 15vw;
    max-width: 80vw;
    word-wrap: anywhere;
  }

  #closeTip {
    color: #fffa;
  }
</style>
