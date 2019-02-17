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

    easing: {
      list: {
        easing: [
          'linear',
          'easeIn',
          'easeOut',
          'easeInOut'
        ],
        power: [
          'sine',
          'quad',
          'cubic',
          'quart',
          'quint',
          'expo',
          'cric',
          'back'
        ]
      },
      value: {
        linear: '0, 0, 1, 1',

        sineEaseIn: '0.47, 0, 0.745, 0.715',
        sineEaseOut: '0.39, 0.575, 0.565, 1',
        sineEaseInOut: '0.445, 0.05, 0.55, 0.95',

        quadEaseIn: '0.55, 0.085, 0.68, 0.53',
        quadEaseOut: '0.25, 0.46, 0.45, 0.94',
        quadEaseInOut: '0.455, 0.03, 0.515, 0.955',

        cubicEaseIn: '0.55, 0.055, 0.675, 0.19',
        cubicEaseOut: '0.215, 0.61, 0.355, 1',
        cubicEaseInOut: '0.645, 0.045, 0.355, 1',

        quartEaseIn: '0.895, 0.03, 0.685, 0.22',
        quartEaseOut: '0.165, 0.84, 0.44, 1',
        quartEaseInOut: '0.77, 0, 0.175, 1',

        quintEaseIn: '0.755, 0.05, 0.855, 0.06',
        quintEaseOut: '0.23, 1, 0.32, 1',
        quintEaseInOut: '0.86, 0, 0.07, 1',

        expoEaseIn: '0.95, 0.05, 0.795, 0.035',
        expoEaseOut: '0.19, 1, 0.22, 1',
        expoEaseInOut: '1, 0, 0, 1',

        cricEaseIn: '0.6, 0.04, 0.98, 0.335',
        cricEaseOut: '0.075, 0.82, 0.165, 1',
        cricEaseInOut: '0.785, 0.135, 0.15, 0.86',

        backEaseIn: '0.6, -0.28, 0.735, 0.045',
        backEaseOut: '0.175, 0.885, 0.32, 1.275',
        backEaseInOut: '0.68, -0.55, 0.265, 1.55'

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
      active: false,
      format: 'hex',
      color: '#778899',
      index: 5
    },

    // Current values for every bezier picker
    hue: {
      value: '0.34, 0.87, 0.40, 0.13',
      custom: false,
      linear: false,
      easing: 'easeInOut',
      power: 'cubic'
    },

    // Data used on tests
    test: {
      active: true,
      format: 'hex',
      color: '#112233',
      index: 6
    }
  },

  mutations: {
    updateNumber(state, { id, label, value }) {
      state[id].color[label] = value;
    },
    updateColor(state, { id, value }) {
      state[id].color = value;
    },
    updateFormat(state, { id, value }) {
      state[id].format = value;
    },
    updateSwitch(state, id) {
      state[id].active = !state[id].active;
    },
    updateRange(state, { id, value }) {
      state[id].index = value;
    },

    updateBezierWithButton(state, { id, easing, power }) {
      const item = state[id];

      if (easing) {
        item.easing = easing;
      } else if (power) {
        item.power = power;
      }

      if (easing === 'linear') {
        item.custom = false;
        item.linear = true;
        item.value = state.easing.value.linear;
      } else {
        const uppercaseEasing = item.easing.charAt(0).toUpperCase() + item.easing.slice(1);
        const newValue = item.power + uppercaseEasing;

        item.custom = false;
        item.linear = false;
        item.value = state.easing.value[newValue];
      }
    }
  },

  getters: {
    hex: state => id => color(state[id].color).hex()
  }
});
