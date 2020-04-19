<template>
  <div id="app">
    <div class="settingsBtn">
      <input type="checkbox" id="isMutliplay" v-model="multiPlay" />
      <label for="isMutliplay">{{ $t("Multiplay") }}
      style="font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,sans-serif;font-variant-caps: small-caps;font-variant-numeric: oldstyle-nums;font-weight: 400;font-size: 16px;"
      </label>
    </div>
    <template v-for="(item, index) of sounds">
      <CentralButton
        :item="item"
        :key="index"
        v-if="item.type == 'center'"
      ></CentralButton>
    </template>
    <div id="bottom">
      <style lang="scss">
      #app {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,sans-serif;
        font-variant-caps: small-caps;
        font-weight: 600;
      }
      <a
        class="bottonBtnLink"
        href="https://github.com/suisei-cn"
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
import { Component, Vue } from 'vue-property-decorator';
import { Sound } from './types';
import CentralButton from './components/CentralButton.vue';
import BaseButton from './components/BaseButton.vue';

@Component({
  components: {
    CentralButton,
    BaseButton,
  },
})
export default class App extends Vue {
  private sounds: Sound[] = [];

  get multiPlay() {
    return this.$store.state.multiPlay;
  }
  set multiPlay(value) {
    this.$store.commit('setMultiPlay', value);
  }

  private async mounted() {
    this.sounds = (await fetch('/sounds.json').then((x) => x.json()).catch((err) => {
      // tslint:disable-next-line:no-console
      console.error('Sound data fetch error. Exiting.');
    }) as Sound[]);
    const lang = ((navigator as any).language || (navigator as any).userLanguage).split('-')[0] || 'zh';
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

.animateBtn {
  box-shadow: 0 0.9px 2.2px rgba(0, 0, 0, 0.02),
    0 2.1px 5.3px rgba(0, 0, 0, 0.028), 0 4px 10px rgba(0, 0, 0, 0.035),
    0 7.1px 17.9px rgba(0, 0, 0, 0.042), 0 13.4px 33.4px rgba(0, 0, 0, 0.05),
    0 32px 80px rgba(0, 0, 0, 0.07);
  transition: box-shadow 0.23s ease-in-out, font-weight 0.23s ease-in-out;
  border-radius: 8px;
  cursor: pointer !important;
}

.playingBtn,
.animateBtn:hover {
  font-weight: 900;
  box-shadow: 0 2.2px 2.2px rgba(176, 201, 239, 0.2),
    0 5.3px 5.3px rgba(176, 201, 239, 0.28),
    0 10px 10px rgba(176, 201, 239, 0.35), 0 17.9px 17.9px rgba(0, 0, 0, 0.042),
    0 33.4px 33.4px rgba(0, 0, 0, 0.05), 0 80px 80px rgba(0, 0, 0, 0.07);
  transition: box-shadow 0.23s ease-in-out, font-weight 0.23s ease-in-out;
}
</style>

<style lang="scss" scoped>
.settingsBtn {
  margin-top: 15vh;
  height: 6vh;
}

#bottom {
  margin-top: 14vh;
  margin-bottom: 11vh;
  display: flex;
}
.bottonBtnLink {
  margin: 0 0.5vw;
  text-decoration: none;
}

@import url("./style.scss");
</style>
