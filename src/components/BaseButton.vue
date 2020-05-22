<template>
  <div
    @click="play"
    ref="self"
    :class="{ playingBtn: playLayer > 0, testHoverWidth }"
    :style="{
      minWidth
    }"
    tabindex="0"
  >
    {{ localizedName }}
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Sound } from "../types";

@Component
export default class BaseButton extends Vue {
  @Prop() private item!: Sound;
  @Prop() private noclickplay!: boolean;
  private playLayer = 0;
  private testHoverWidth = false;
  private minWidth = "0px";
  private mounted() {
    this.testHoverWidth = true;
    this.$nextTick(() => {
      const width = (this.$refs.self as HTMLElement).offsetWidth;
      this.minWidth = String(width - 16 + "px");
      this.testHoverWidth = false;
    });
  }
  get localizedName() {
    return (
      (this?.item.name_l10n || {})[this.$i18n.locale] || this?.item.name || ""
    );
  }
  public play() {
    if (this.noclickplay) return;
    if (!this.item) {
      return;
    }
    if (this.$store.getters.playing > 0 && !this.$store.state.multiPlay) {
      return;
    }
    let audioFilename;
    if (typeof this.item.file === "string") {
      audioFilename = this.item.file;
    } else {
      audioFilename = this.item.file[
        Math.floor(Math.random() * this.item.file.length)
      ];
    }
    const audio = new Audio(`assets/${audioFilename}`);
    const that = this;
    audio.addEventListener("play", () => {
      that.playLayer += 1;
      that.$store.commit("playOne");
    });
    audio.addEventListener("ended", () => {
      that.playLayer -= 1;
      that.$store.commit("stopOne");
    });
    audio.play();
  }
}
</script>
