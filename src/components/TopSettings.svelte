<div id="settings" :title="$t('Toggle chorus mode')">
  <input type="checkbox" value="multiPlay" v-model="settings" />
  <label for="isMutliplay">{$_('Do Not Click Me')}</label>
  |
  <input type="checkbox" value="repeatThis" v-model="settings" />
  <label for="isRepeat">{$_('Repeat')}</label>
</div>

<script>
  import { _ } from 'svelte-i18n'
</script>

<style lang="scss">
  #settings {
    display: flex;
    justify-content: center;
    margin-top: 15vh;
  }

  label {
    font-variant-caps: small-caps;
    font-variant-numeric: oldstyle-nums;
    font-weight: 400;
    font-size: 16px;
  }
</style>
