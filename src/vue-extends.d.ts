import Vue, { VueConstructor } from 'vue';

declare module 'vue/types/vue' {
    interface Vue {
        $status: any;
    }
    interface VueConstructor {
        $status: any;
    }
}