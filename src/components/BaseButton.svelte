<div class="baseButton" on:click="{playSound}">
    test
</div>

<script lang="ts">
    import type {Sound} from '../types'
    // Props
    let item: Sound;
    let noclickplay: boolean;

    // Methods
    function playSound() {
        item.file
    }
</script>

<style lang="scss">
    @import '../styles/BaseButton.scss';
    @import '../styles/utils.scss';
</style>