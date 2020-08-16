<template>
  <main
    id="page"
    :class="{
      themeDark: enforceDarkTheme,
      themeSystem: useSystemTheme
    }"
  >
    <div id="svgAnim" ref="svgAnim"></div>
    <div class="smShrinkSpace" :class="{ hidden: displayMusicBoard }"></div>
    <div id="errors">
      <template v-for="(item, index) in currentErrors">
        <ErrorBar :err="item" :key="'err-' + index"></ErrorBar>
      </template>
    </div>
    <div id="settings" :title="$t('Toggle chorus mode')">
      <input type="checkbox" value="multiPlay" v-model="settings" />
      <label for="isMutliplay">{{ $t("Do Not Click Me") }}</label>
      |<input type="checkbox" value="repeatThis" v-model="settings" />
      <label for="isRepeat">{{ $t("Repeat") }}</label>
    </div>
    <div id="mainWrapper" :class="{ shrinkable: !displayMusicBoard }">
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
          <template v-if="displayMusicBoard">
            <template v-for="(cat, catIndex) of categorizedSoundEntries">
              <div class="categoryTitle" :key="'ct-' + catIndex">
                {{ localizedName(categories[cat[0]]) }}
              </div>
              <BaseButton
                v-for="(item, index) of cat[1]"
                :item="item"
                :key="'cb-' + catIndex + '-' + index"
                class="normalBtn"
                @error="showError"
              ></BaseButton>
            </template>
            <div class="categoryTitle">{{ $t("Uncategorized") }}</div>
            <BaseButton
              v-for="(item, index) of sounds.filter(x => x.type !== 'center')"
              :item="item"
              :key="'cb-default-' + index"
              class="normalBtn"
              @error="showError"
            ></BaseButton>
          </template>
        </div>
        <span
          id="bigButtonText"
          :class="{ playingBtn }"
          :tabindex="displayMusicBoard ? -1 : 0"
          v-if="!displayMusicBoard"
          @error="showError"
        >
          {{ ehhhLocalizedName }}
        </span>
      </div>
    </div>
    <BaseButton
      id="virtualCentralButton"
      :item="sounds[0]"
      ref="centralButton"
      @started="playingBtn = true"
      @stopped="playingBtn = false"
      @error="showError"
    ></BaseButton>
    <div
      id="switchBtn"
      @click="
        freezeMainBtn();
        displayMusicBoard = !displayMusicBoard;
      "
      tabindex="0"
      class="animateBtn smallBtn"
    >
      {{ displayMusicBoard ? $t("Back") : $t("Music board") }}
    </div>
    <div id="bottom">
      <a
        class="bottonBtnLink"
        href="https://github.com/suisei-cn/starbuttons"
        aria-label="GitHub repository of suisei.moe"
        target="_blank"
      >
        <i class="icon-github"></i> </a
      >/
      <a
        class="bottonBtnLink"
        href="https://t.me/Hoshimachi_Suisei"
        aria-label="Telegram Fan Group"
        target="_blank"
      >
        <i class="icon-telegram"></i> <sup>(CN)</sup></a
      >/
      <a
        class="bottonBtnLink"
        href="https://discord.com/invite/suiseicord"
        aria-label="Discord Fan Group"
        target="_blank"
      >
        <i class="icon-discord"></i> <sup>(JP)</sup></a
      >/<a
        class="bottonBtnLink"
        href="https://discord.gg/4fmY8WC"
        aria-label="Discord Fan Group"
        target="_blank"
      >
        <i class="icon-discord"></i> <sup>(EN)</sup>
      </a>
      /
      <LanguageSwitch
        id="compLangSwitch"
        :lang="currLang"
        @requestLanguageChange="changeLang"
      ></LanguageSwitch>
    </div>
  </main>
</template>

<script lang="ts">
import { Component, Vue, Watch, Emit } from "vue-property-decorator";
import { Sound, CategorizedSounds, Categories, NameWithL10n } from "../types";
import Lottie from "lottie-web";
import { getItem, removeItem } from "../components/localStorageWrapper";
import BaseButton from "../components/BaseButton.vue";
import LanguageSwitch from "../components/LanguageSwitch.vue";
import { setLanguage } from "../components/setLanguage";
import ErrorBar from "../components/ErrorBar.vue";
const THEME_ENFORCEMENT_SETTINGS_ITEM = "enforced-theme";

@Component({
  components: {
    BaseButton,
    ErrorBar,
    LanguageSwitch
  }
})
export default class App extends Vue {
  // @ts-ignore
  private sounds: Sound[] = [];
  private categorizedSoundEntries: [string, Sound[]][] = [];
  private categories: Categories = {};
  private displayMusicBoard = false;
  private settings: string[] = [];
  private useSystemTheme = true;
  private enforceDarkTheme = true;
  private playingBtn = false;
  private currentSystemTheme = "light";
  private currentErrors: string[] = [];
  private dontRespond = false;
  private currLang = "";

  @Emit("error")
  private showError(text: string, timeout = 3000) {
    console.warn("Err");
    this.currentErrors.push(text);
    setTimeout(() => {
      const id = this.currentErrors.indexOf(text);
      this.currentErrors.splice(id, 1);
    }, timeout);
  }
  @Watch("settings")
  private updateSettings(newValue: string[]) {
    this.$status.player.multiPlay = newValue.includes("multiPlay");
    this.$status.player.repeatThis = newValue.includes("repeatThis");
  }

  private localizedName(nameseq: NameWithL10n) {
    return (nameseq?.name_l10n || {})[this.$i18n.locale] || nameseq?.name || "";
  }

  get ehhhLocalizedName() {
    return this.localizedName(this?.sounds[0] as Sound);
  }

  private freezeMainBtn() {
    this.dontRespond = true;
    setTimeout(() => {
      this.dontRespond = false;
    }, 500);
  }

  private playEhhh() {
    if (this.dontRespond) return;
    if (!this.displayMusicBoard) {
      // @ts-ignore
      this.$refs.centralButton.play();
    }
  }

  private updateThemeSettings() {
    this.currentSystemTheme = (() => {
      try {
        return getComputedStyle(document.getElementById("page") as HTMLElement)
          .getPropertyValue("--theme-preference")
          .includes("light")
          ? "light"
          : "dark";
      } catch (e) {
        return "light";
      }
    })();
    const enforcedTheme = getItem(THEME_ENFORCEMENT_SETTINGS_ITEM);
    if (enforcedTheme === null) return;
    if (this.currentSystemTheme === enforcedTheme) {
      removeItem(THEME_ENFORCEMENT_SETTINGS_ITEM);
    } else {
      this.useSystemTheme = false;
      this.settings.push(`enforceMode__${enforcedTheme}`);
    }
  }

  private setupBackgroundAnimations() {
    Lottie.loadAnimation({
      container: this.$refs.svgAnim as Element,
      renderer: "svg",
      loop: !0,
      autoplay: !0,
      path: "/bg-anim.json"
    });
  }

  private putSoundsIntoCategories() {
    const soundsNoCat: Sound[] = [];
    const categorizedSounds: CategorizedSounds = {};
    for (const i of this.sounds) {
      if (!i.category) {
        soundsNoCat.push(i);
        continue;
      }
      const categories = Array.isArray(i.category) ? i.category : [i.category];
      for (const category of categories) {
        if (!categorizedSounds[category]) categorizedSounds[category] = [];
        categorizedSounds[category].push(i);
      }
    }
    const categorizedSoundEntries = Object.entries(categorizedSounds).sort(
      (a, b) =>
        (this.categories[a[0]]?.order || 999) -
        (this.categories[b[0]]?.order || 999)
    );
    console.log(categorizedSoundEntries.map(x => x[0]));
    this.categorizedSoundEntries = categorizedSoundEntries;
    this.sounds = soundsNoCat;
  }

  private changeLang(lang: string) {
    this.$i18n.locale = lang;
    history.pushState({ lang }, "", `/?lang=${lang}`);
  }

  private async mounted() {
    this.settings = ["multiPlay"];
    this.sounds = (await fetch("/sounds.json")
      .then(x => x.json())
      .catch(e => {
        // tslint:disable-next-line:no-console
        console.error("Sound data fetch error. Exiting.");
        this.showError(this.$t("Sound list fetch error:") + e.toString());
      })) as Sound[];
    this.categories = (await fetch("/categories.json")
      .then(x => x.json())
      .catch(e => {
        // tslint:disable-next-line:no-console
        console.error("Sound data fetch error. Exiting.");
        this.showError(this.$t("Sound list fetch error:") + e.toString());
      })) as Categories;
    this.putSoundsIntoCategories();
    this.currLang = setLanguage(window, navigator, this);

    this.updateThemeSettings();
    this.setupBackgroundAnimations();
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
body {
  overflow: hidden;
}

#page {
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
  background: transparent
    linear-gradient(
      180deg,
      #431f79 0%,
      #15161e 3%,
      #33394f 45%,
      #6a6faf 60%,
      #6b71b0 88%,
      #9a9ccc 99%,
      #eadab9 100%
    )
    0% 0% no-repeat padding-box;
  color: var(--color-font);
}

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

@import "../style/style";
</style>

<style lang="scss" scoped>
$table-height: 52vh;

#errors {
  position: absolute;
  top: 4vh;
  opacity: 0.8;
  pointer-events: none;
}

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
  box-shadow: var(--box-shadow);

  &:hover {
    box-shadow: var(--box-shadow-hover);
  }

  transition: box-shadow 0.23s ease-in-out, font-weight 0.23s ease-in-out;
  color: var(--color-font-button);
}

.smallBtn {
  font-size: 1.6rem;
  @media screen and (max-width: 1340px) {
    font-size: 1rem !important;
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

@media screen and (max-width: 600px) {
  .smShrinkSpace {
    height: 20vh;
  }
  .smShrinkSpace.hidden {
    height: 0;
    transition: height 0.1s ease-in-out;
  }
  #mainWrapper.shrinkable {
    height: 15vh;
  }
  .animateBtn.bigBtn {
    font-size: 1rem !important;
    margin-top: 0;
    width: 30vh;
    height: 13vh;
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
    text-overflow: ellipsis;
    overflow: hidden;
  }
  #bigButtonText {
    opacity: 0;
  }
}

.categoryTitle {
  font-weight: bold;
  font-size: 1.3rem;
  margin: 12px;
  width: 100%;
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

#compLangSwitch {
  margin-left: 0.5vw;
  outline: none;
  border: none;
  background: none;
  color: var(--bottom-link-color);
  cursor: pointer;
}

#compLangSwitch /deep/ option {
  color: initial;
}
</style>
