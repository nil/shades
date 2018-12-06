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
    colors: {
      from: {
        format: 'hex',
        value: '#112233',
        ui: false
      },
      to: {
        format: 'hex',
        value: '#FFFFFF',
        ui: true
      }
    }
  },
  mutations: {
    numberUpdate(state, { id, label, value }) {
      state.colors[id].value[label] = value;
    },
    updateColor(state, { value, id }) {
      state.colors[id].value = value;
    },
    updateFormat(state, { value, id }) {
      state.colors[id].format = value;
    }
  },
  getters: {
    getColor: state => id => color(state.colors[id].value).hex()
  }
});
