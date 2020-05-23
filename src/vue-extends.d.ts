import { PageStatus } from "./types";

declare module "vue/types/vue" {
  interface Vue {
    $status: PageStatus;
  }
  interface VueConstructor {
    $status: PageStatus;
  }
}
