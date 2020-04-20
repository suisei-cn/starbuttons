<template>
  <div id="app">
    <div class="settingsBtn" :title="$t('Toggle chorus mode')">
      <input type="checkbox" id="isMutliplay" v-model="multiPlay" />
      <label for="isMutliplay">{{ $t("Do Not Click Me") }}</label>
    </div>
    <template v-for="(item, index) of sounds">
      <CentralButton
        :item="item"
        :key="index"
        v-if="item.type == 'center'"
      ></CentralButton>
    </template>
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
    const lang = (window.location.hash.substr(1) || (navigator as any).language || (navigator as any).userLanguage).split('-')[0] || 'zh';
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
@import url("style/style.scss");

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

#bottom {
  margin-top: 14vh;
  margin-bottom: 11vh;
  display: flex;
}
.bottonBtnLink {
  margin: 0 0.5vw;
  text-decoration: none;
}

@import url("style/style.scss");
</style>
