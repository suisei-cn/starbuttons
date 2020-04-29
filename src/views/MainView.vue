<template>
  <div id="app">
    <div class="settingsBtn" :title="$t('Toggle chorus mode')">
      <input type="checkbox" id="isMutliplay" v-model="multiPlay" />
      <label for="isMutliplay">{{ $t("Do Not Click Me") }}</label>
    </div>
    <div id="board">
      <div
        id="musicTable"
        class="overturnBase shadow"
        :class="{ overturn: musicTableFlipped }"
      >
        <template v-for="(item, index) of sounds">
          <BaseButton :item="item" :key="index" class="normalBtn"></BaseButton>
        </template>
      </div>
      <template v-for="(item, index) of sounds">
        <CentralButton
          :item="item"
          :key="index"
          class="overturnBase"
          :class="{ overturn: musicButtonFlipped }"
          v-if="item.type == 'center'"
        ></CentralButton>
      </template>
    </div>
    <div id="switchBtn" @click="flipTable" class="btn animateBtn">
      {{ musicButtonFlipped ? $t("Back") : $t("Music board") }}
    </div>
    <div id="bottom">
      <a
        class="bottonBtnLink"
        href="https://github.com/suisei-cn/starbuttons"
        target="_blank"
      >
        {{ $t("GitHub") }}</a
      >/
      <a
        class="bottonBtnLink"
        href="https://t.me/suiseihosimati"
        target="_blank"
      >
        {{ $t("Telegram") }}
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Sound } from "../types";
import CentralButton from "../components/CentralButton.vue";
import BaseButton from "../components/BaseButton.vue";

@Component({
  components: {
    CentralButton,
    BaseButton
  }
})
export default class App extends Vue {
  private sounds: Sound[] = [];
  private musicTableFlipped = true;
  private musicButtonFlipped = false;
  private flipping = false;

  private flipTable() {
    if (this.flipping) {
      return;
    }
    const that = this;
    this.flipping = true;
    if (this.musicTableFlipped) {
      this.musicButtonFlipped = true;
      setTimeout(() => {
        that.musicTableFlipped = false;
        setTimeout(() => {
          that.flipping = false;
        }, 500);
      }, 500);
    } else {
      this.musicTableFlipped = true;
      setTimeout(() => {
        that.musicButtonFlipped = false;
        setTimeout(() => {
          that.flipping = false;
        }, 500);
      }, 500);
    }
  }

  get multiPlay() {
    return this.$store.state.multiPlay;
  }
  set multiPlay(value) {
    this.$store.commit("setMultiPlay", value);
  }

  private async mounted() {
    this.sounds = (await fetch("/sounds.json")
      .then(x => x.json())
      .catch(() => {
        // tslint:disable-next-line:no-console
        console.error("Sound data fetch error. Exiting.");
      })) as Sound[];
    const lang =
      (
        window.location.search.match(/lang=([a-zA-Z-]+)/)?.[1] ||
        (navigator as any).language ||
        (navigator as any).userLanguage
      ).split("-")[0] || "zh";
    this.$i18n.locale = lang;
  }
}
</script>

<style lang="scss">
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
}
</style>

<style lang="scss" scoped>
@import "../style/style";

$table-height: 52vh;

label {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  font-variant-caps: small-caps;
  font-variant-numeric: oldstyle-nums;
  font-weight: 400;
  font-size: 16px;
}

.settingsBtn {
  margin-top: 15vh;
  height: 6vh;
}

#board {
  height: $table-height;
  margin-bottom: 2vh;
}

#musicTable {
  display: flex;
  height: $table-height;
  width: 80vw;
  margin-left: -20vw;
  padding: 5px;
  border-radius: 12px;
  background-color: #97cbed44;
  position: absolute;
  flex-wrap: wrap;
  align-content: flex-start;
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
}
.bottonBtnLink {
  margin: 0 0.5vw;
  text-decoration: none;
}

.overturnBase {
  transition: transform 0.5s ease-in-out;
}

.overturn {
  transform: rotateY(90deg);
}
</style>
