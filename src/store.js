import Vue from 'vue';
import Vuex from 'vuex';
import color from 'color';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    format: {
      rgb: {
        r: 255,
        g: 255,
        b: 255
      },
      hsv: {
        h: 360,
        s: 100,
        v: 100
      }
    },
    colorFormat: 'hex',
    fromColor: '#112233',
    toColor: '#FFFFFF'
  },
  mutations: {
    numberUpdate(state, { id, label, value }) {
      state[id][label] = value;
    },
    updateColor(state, { value, id }) {
      state[id] = value;
    }
  },
  getters: {
    getColor: state => id => color(state[id]).hex()
  }
});
