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
    left: calc(50vw - 89vh);
    top: auto;
    bottom: 0;
    width: 178vh;
    height: 100%;
    pointer-events: none;
  }
</style>
