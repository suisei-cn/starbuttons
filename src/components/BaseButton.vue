<template>
  <div
    @click="play"
    ref="self"
    :class="{
      playingBtn: playLayer > 0,
      testHoverWidth,
      pending: pendingNetwork
    }"
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
import * as Sentry from "@sentry/browser";

async function sleep(time: number) {
  await new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}

async function evaluate(obj: () => boolean, times = 20) {
  for (let i = 0; i < times; i++) {
    if (obj()) return;
    await sleep(500);
  }
}

@Component
export default class BaseButton extends Vue {
  @Prop() private item!: Sound;
  @Prop() private noclickplay!: boolean;
  private playLayer = 0;
  private pendingNetwork = false;
  private testHoverWidth = false;
  private minWidth = "0px";
  private timeouts: number[] = [];
  private mounted() {
    this.testHoverWidth = true;
    this.scanHoverWidth();
  }
  private async scanHoverWidth() {
    await evaluate(() => {
      return this.$refs.self;
    }, 4);
    const width = (this.$refs.self as HTMLElement).offsetWidth;
    this.minWidth = String(width - 16 + "px");
    this.testHoverWidth = false;
  }
  get localizedName() {
    return (
      (this?.item?.name_l10n || {})[this.$i18n.locale] || this?.item?.name || ""
    );
  }

  public clearAllLoadingTimeout() {
    for (const i of this.timeouts) {
      clearTimeout(i);
    }
    this.timeouts = [];
  }

  public emitError(e: Error) {
    this.clearAllLoadingTimeout();
    this.$emit(
      "error",
      this.$t("Error in sound playing: ").toString() +
        e.toString() +
        "\n" +
        this.$t("We've known about it and will work on it soon.").toString()
    );
  }

  public play() {
    try {
      this.playHandler();
    } catch (e) {
      this.emitError(e);
      throw e;
    }
  }

  private playHandler() {
    if (this.noclickplay) return;
    if (!this.item) {
      return;
    }
    if (!this.item.file) {
      this.emitError(this.$t("Still loading..."));
      return;
    }
    let audioFilename;
    if (typeof this.item.file === "string") {
      audioFilename = this.item.file;
    } else if (Array.isArray(this.item.file)) {
      audioFilename = this.item.file[
        Math.floor(Math.random() * this.item.file.length)
      ];
    } else {
      this.emitError(this.$t("Unrecognized sound list."));
      // @ts-ignore
      // eslint-disable-next-line no-undef
      const err = new Error();
      err.name = "BadSoundsJsonError";
      err.message = JSON.stringify(this.item);
      Sentry.captureException(err);
    }
    this.pendingNetwork = true;
    let audio: HTMLAudioElement | null = null;
    let playPromise;
    const notifyUserOfLongLoadingTime = setTimeout(() => {
      this.$emit(
        "error",
        this.$t("Voices are still loading. Please be patient...")
      );
    }, 1500);
    this.timeouts.push(notifyUserOfLongLoadingTime);
    try {
      audio = this.$status.player.addAudio(`assets/${audioFilename}`);
      this.$status.player.stopAllWhenNonMultiPlay();
      playPromise = audio?.play();
    } catch (err) {
      this.$status.player.stopAllWhenNonMultiPlay();
      playPromise = audio?.play();
    }

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          clearTimeout(notifyUserOfLongLoadingTime);
          this.pendingNetwork = false;
          this.playLayer += 1;
          if (this.playLayer === 1) {
            this.$emit("started");
          }
        })
        .catch(e => {
          this.emitError(e);
          throw e;
        });
    }

    audio?.addEventListener("pause", () => {
      this.playLayer -= 1;
      if (this.playLayer === 0) {
        this.$emit("stopped");
      }
    });
  }
}
</script>

<style lang="scss" scoped>
.pending {
  opacity: 0.8;
}
</style>
