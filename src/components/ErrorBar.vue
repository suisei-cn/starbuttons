<template>
  <div class="error n" v-html="err"></div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class BaseButton extends Vue {
  @Prop() private err!: string;
}
</script>

<style lang="scss" scoped>
@import "../style/colorScheme.scss";

.error {
  text-align: center;
  color: var(--color-font);
  background-color: var(--color--box-background);
  padding: 1vh 1vw;
  border-radius: 5px;
  margin: 2vh 15vw;
}
</style>
