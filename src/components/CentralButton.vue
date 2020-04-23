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
import BaseButton from './BaseButton.vue';

@Component
export default class CentralButton extends BaseButton { }
</script>

<style scoped lang="scss">
.btn {
  height: 40vh;
  width: 40vw;
  margin-top: 9vh;
  line-height: 40vh;
  font-size: 5rem;
}

@media screen and (max-width: 1000px) {
  .btn {
    font-size: 2rem !important;
  }
}
@media screen and (max-width: 600px) {
  .btn {
    font-size: 1rem !important;
  }
}
@media screen and (max-width: 300px) {
  .btn {
    font-size: 0 !important;
  }
}
</style>
