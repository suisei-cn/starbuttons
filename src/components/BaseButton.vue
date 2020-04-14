<template>
  <div id="btn" class="animateBtn" @click="play">
    {{ localizedName }}
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Sound } from '../types';

@Component
export default class BaseButton extends Vue {
  @Prop() private item!: Sound;
  private lang: string = ((navigator as any).language || (navigator as any).userLanguage).split('-')[0];
  get localizedName() {
    return this.item.name_l10n![this.lang] || this.item.name || '';
  }
  private play() {
    let audioFilename;
    if (typeof (this.item.file) === 'string') {
      audioFilename = this.item.file;
    } else {
      audioFilename = this.item.file[Math.floor(Math.random() * this.item.file.length)];
    }
    const audio = new Audio(`assets/${audioFilename}`);
    audio.play();
  }
}
</script>

<style scoped lang="scss">
#btn {
  text-align: center;
  overflow: hidden;
  font-family: Fira Code, iA Writer Mono V, IBM Plex Mono, Roboto Mono, Courier,
    monospace;
  color: white;
  background: linear-gradient(#97cbed, #6375bc);
}
</style>
