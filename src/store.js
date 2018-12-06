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
        format: 'hsv',
        value: {
          h: 100,
          s: 5,
          v: 80
        },
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
    },
    toggleColorPicker(state, { target, id }) {
      if (target.classList.contains('color-input--preview')) {
        state.colors[id].ui = !state.colors[id].ui;
      } else {
        for (const item in state.colors) {
          if (Object.prototype.hasOwnProperty.call(state.colors, item)) {
            if (state.colors[item].ui) {
              state.colors[item].ui = false;
            }
          }
        }
      }
    }

  },
  getters: {
    hex: state => id => color(state.colors[id].value).hex(),
    color: state => id => state.colors[id].value
  }
});
