import Vue from 'vue';
import Vuex from 'vuex';
import color from 'color';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // Maximum value of each channel
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

    // Default values of each color
    color: {
      from: {
        format: 'hex',
        value: '#112233'
      },
      to: {
        format: 'hex',
        value: '#445566'
      },
      main: {
        format: 'hex',
        value: '#778899'
      }
    }
  },
  mutations: {
    updateNumber(state, { id, label, value }) {
      state.color[id].value[label] = value;
    },
    updateColor(state, { value, id }) {
      state.color[id].value = value;
    },
    updateFormat(state, { id, value }) {
      state.color[id].format = value;
    }
  },
  getters: {
    getColor: state => id => color(state.color[id].value).hex()
  }
});
