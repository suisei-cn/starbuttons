<div id="svgAnim" bind:this="{svgAnim}"></div>

<script>
  import { onMount } from 'svelte'
  import lottie from 'lottie-web'

  let svgAnim

  onMount(async () => {
    lottie.loadAnimation({
      container: svgAnim,
      renderer: 'svg',
      loop: !0,
      autoplay: !0,
      path: '/assets/bg-anim.json',
    })
  })
</script>

<style lang="scss">
  #svgAnim {
    position: absolute;
    left: 0;
    top: auto;
    right: 0;
    bottom: 0;
    width: 100%;
    min-width: 100%;
    height: 100%;
    pointer-events: none;
  }
</style>
