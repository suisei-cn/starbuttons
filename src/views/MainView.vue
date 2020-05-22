<template>
  <div id="app" :class="{ themeDark: darkMode, themeSystem: !darkMode }">
    <div id="settings" :title="$t('Toggle chorus mode')">
      <input type="checkbox" id="isMutliplay" v-model="multiPlay" />
      <label for="isMutliplay">{{ $t("Do Not Click Me") }}</label>
      |
      <input type="checkbox" id="isDarkMode" v-model="darkMode" />
      <label for="isDarkMode">{{ $t("Dark Theme") }}</label>
    </div>
    <div id="mainWrapper">
      <div
        id="board"
        :class="{
          musicBoard: displayMusicBoard,
          animateBtn: !displayMusicBoard
        }"
        class="bigBtn"
        @click="playEhhh"
      >
        <div id="boardWrapper">
          <template v-for="(item, index) of sounds">
            <BaseButton
              :item="item"
              :key="index"
              class="normalBtn"
              v-if="displayMusicBoard"
            ></BaseButton>
          </template>
        </div>
        <span id="bigButtonText">
          {{ ehhhLocalizedName }}
        </span>
      </div>
    </div>
    <BaseButton
      id="virtualCentralButton"
      :item="sounds[0]"
      ref="centralButton"
    ></BaseButton>
    <div
      id="switchBtn"
      @click="displayMusicBoard = !displayMusicBoard"
      class="animateBtn smallBtn"
    >
      {{ displayMusicBoard ? $t("Back") : $t("Music board") }}
    </div>
    <div id="bottom">
      <a
        class="bottonBtnLink"
        href="https://github.com/suisei-cn/starbuttons"
        target="_blank"
      >
        <i class="icon-github"></i> </a
      >/
      <a
        class="bottonBtnLink"
        href="https://t.me/Hoshimachi_Suisei"
        target="_blank"
      >
        <i class="icon-telegram"></i> <sup>(CN)</sup></a
      >/
      <a
        class="bottonBtnLink"
        href="https://discord.gg/9fJGBZz"
        target="_blank"
      >
        <i class="icon-discord"></i> <sup>(JP)</sup></a
      >/<a
        class="bottonBtnLink"
        href="https://discord.gg/4fmY8WC"
        target="_blank"
      >
        <i class="icon-discord"></i> <sup>(EN)</sup>
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Sound } from "../types";
import BaseButton from "../components/BaseButton.vue";
import { setLanguage } from "../components/setLanguage";

@Component({
  components: {
    BaseButton
  }
})
export default class App extends Vue {
  // @ts-ignore
  private sounds: Sound[] = [{}];
  private displayMusicBoard = false;

  get multiPlay() {
    return this.$store.state.multiPlay;
  }
  set multiPlay(value) {
    this.$store.commit("setMultiPlay", value);
  }

  get darkMode() {
    return this.$store.state.darkMode;
  }
  set darkMode(value) {
    this.$store.commit("setDarkMode", value);
  }

  get ehhhLocalizedName() {
    return (
      (this?.sounds[0].name_l10n || {})[this.$i18n.locale] ||
      this?.sounds[0].name ||
      ""
    );
  }

  private playEhhh() {
    if (!this.displayMusicBoard) {
      // @ts-ignore
      this.$refs.centralButton.play();
    }
  }

  private async mounted() {
    this.sounds = (await fetch("/sounds.json")
      .then(x => x.json())
      .catch(() => {
        // tslint:disable-next-line:no-console
        console.error('Sound data fetch error. Exiting.');
      })) as Sound[];
    setLanguage(window, navigator, this);
  }
}
</script>

<style lang="scss">
// Frames
@keyframes button-appear {
  from {
    opacity: 0;
  }
  50% {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

// Styles
#app {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  /* what the hell */
  margin: 0;
  position: absolute;
  left: 0;
  top: 0;
  background-color: var(--color-background);
  color: var(--color-font);
}
</style>

<style lang="scss" scoped>
@import "../style/style";

$table-height: 52vh;

label {
  font-display: swap;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  font-variant-caps: small-caps;
  font-variant-numeric: oldstyle-nums;
  font-weight: 400;
  font-size: 16px;
}

#settings {
  margin-top: 15vh;
  height: 6vh;
}

#mainWrapper {
  height: 60vh;
}

#board {
  transition: width 0.25s ease-in-out, height 0.25s ease-in-out,
    background 0.25s linear;
  position: relative; // for #bigButtonText
}

#bigButtonText {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.animateBtn {
  text-align: center;
  overflow: hidden;
  font-family: Fira Code, iA Writer Mono V, IBM Plex Mono, Roboto Mono, Courier,
    monospace;
  border-radius: 8px;
  cursor: pointer;
  background: linear-gradient(var(--color-1), var(--color-2));
  user-select: none;
  box-shadow: 0 0.9px 2.2px rgba(0, 0, 0, 0.02),
    0 2.1px 5.3px rgba(0, 0, 0, 0.028), 0 4px 10px rgba(0, 0, 0, 0.035),
    0 7.1px 17.9px rgba(0, 0, 0, 0.042), 0 13.4px 33.4px rgba(0, 0, 0, 0.05),
    0 32px 80px rgba(0, 0, 0, 0.07);

  &:hover {
    box-shadow: 0 2.2px 2.2px rgba(176, 201, 239, 0.2),
      0 5.3px 5.3px rgba(176, 201, 239, 0.28),
      0 10px 10px rgba(176, 201, 239, 0.35),
      0 17.9px 17.9px rgba(0, 0, 0, 0.042), 0 33.4px 33.4px rgba(0, 0, 0, 0.05),
      0 80px 80px rgba(0, 0, 0, 0.07);
  }

  transition: box-shadow 0.23s ease-in-out, font-weight 0.23s ease-in-out;
  color: var(--color-font-button);
}

.smallBtn {
  font-size: 1.6rem;
  @media screen and (max-width: 1340px) {
    font-size: 1rem !important;
  }
  @media screen and (max-width: 600px) {
    font-size: 0.5rem !important;
  }
  @media screen and (max-width: 300px) {
    font-size: 0 !important;
  }
}

.animateBtn.bigBtn {
  height: 40vh;
  width: 40vw;
  margin-top: 9vh;
  line-height: 40vh;
  font-size: 5rem;
  @media screen and (max-width: 1340px) {
    font-size: 2rem !important;
  }
  @media screen and (max-width: 600px) {
    font-size: 1rem !important;
  }
  @media screen and (max-width: 300px) {
    font-size: 0 !important;
  }
}

#boardWrapper {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
}

.musicBoard {
  overflow-y: scroll;
  height: $table-height;
  width: 80vw;
  padding: 5px;
  border-radius: 12px;
  background: var(--board-color);

  font-display: swap;
  .normalBtn {
    animation: 0.66s button-appear;
    z-index: 1;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  #bigButtonText {
    opacity: 0;
  }
}

#virtualCentralButton {
  display: none;
}

#switchBtn {
  height: 6vh;
  line-height: 6vh;
  width: 30vh;
}

#bottom {
  margin-top: 4vh;
  margin-bottom: 11vh;
  display: flex;
  line-height: 1em;
  align-items: center;
}

.bottonBtnLink {
  margin: 0 0.5vw;
  text-decoration: none;
  color: var(--bottom-link-color);
}
</style>
