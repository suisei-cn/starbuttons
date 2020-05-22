import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    concurPlay: 0,
    multiPlay: true,
    darkMode: false
  },
  getters: {
    playing: state => state.concurPlay > 0
  },
  mutations: {
    playOne(state) {
      state.concurPlay += 1;
    },
    stopOne(state) {
      if (state.concurPlay > 0) {
        state.concurPlay -= 1;
      }
    },
    setMultiPlay(state, option) {
      state.multiPlay = option;
    },
    setDarkMode(state, option) {
      state.darkMode = option;
    }
  }
});
