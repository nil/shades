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

    // Current values for every color
    from: {
      format: 'hex',
      color: '#112233'
    },

    to: {
      format: 'hex',
      color: '#445566'
    },

    main: {
      active: true,
      format: 'hex',
      color: '#778899',
      index: 30
    }
  },

  mutations: {
    updateNumber(state, { id, label, value }) {
      state[id].color[label] = value;
    },
    updateColor(state, { value, id }) {
      state[id].color = value;
    },
    updateFormat(state, { id, value }) {
      state[id].format = value;
    },
    updateSwitch(state, id) {
      state[id].active = !state[id].active;
    },
    updateRange(state, { value, id }) {
      state[id].index = value;
    }
  },

  getters: {
    hex: state => id => color(state[id].color).hex()
  }
});
