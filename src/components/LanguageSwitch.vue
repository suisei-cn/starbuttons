<template>
  <select
    name="lang"
    id="selLangSelect"
    :value="lang"
    ref="vs"
    @change="changeLang"
  >
    <option value="zh">中文</option>
    <option value="ja">日本語</option>
    <option value="en">English</option>
  </select>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class BaseButton extends Vue {
  @Prop() private lang!: string;
  private changeLang() {
    this.$emit(
      "requestLanguageChange",
      (this.$refs.vs as HTMLSelectElement).value
    );
  }
}
</script>

<style lang="scss" scoped></style>
