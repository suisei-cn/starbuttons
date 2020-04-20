<template>
  <div
    class="btn animateBtn"
    @click="play"
    :class="{ playingBtn: playLayer > 0 }"
  >
    {{ localizedName }}
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Sound } from '../types';

@Component
export default class BaseButton extends Vue {
  @Prop() private item!: Sound;
  private playLayer: number = 0;
  private lang: string = "zh";
  mounted() {
    this.lang = this.$i18n.locale;
  }
  get localizedName() {
    return this.item.name_l10n![this.lang] || this.item.name || '';
  }
  private play() {
    if (this.$store.getters.playing > 0 && !this.$store.state.multiPlay) {
      return;
    }
    let audioFilename;
    if (typeof (this.item.file) === 'string') {
      audioFilename = this.item.file;
    } else {
      audioFilename = this.item.file[Math.floor(Math.random() * this.item.file.length)];
    }
    const audio = new Audio(`assets/${audioFilename}`);
    const that = this;
    audio.addEventListener('play', () => {
      that.playLayer += 1;
      that.$store.commit('playOne');
    });
    audio.addEventListener('ended', () => {
      that.playLayer -= 1;
      that.$store.commit('stopOne');
    });
    audio.play();
  }
}
</script>

<style scoped lang="scss">
@import url("../style/style.scss");
</style>
