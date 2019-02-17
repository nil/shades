<template>
  <button
    class="input-bezier--button"
    :class="{ 'input-bezier--linear': isLinear, 'active': isActive }"
    :disabled="isPowerDisabled"
    @click="updateBezierValue">{{ value }}</button>
</template>

<script>

import store from 'store';

export default {
  name: 'BezierButton',

  props: {
    id: String,
    value: String,
    type: String
  },

  methods: {
    updateBezierValue() {
      if (this.type === 'easing') {
        store.commit('updateBezierWithButton', {
          id: this.id,
          easing: this.value
        });
      } else {
        store.commit('updateBezierWithButton', {
          id: this.id,
          power: this.value
        });
      }
    }
  },

  computed: {
    isLinear() {
      return this.value === 'linear';
    },

    isActive() {
      const state = store.state[this.id];

      if (state.easing === 'linear') {
        return this.isLinear;
      }

      return state.power === this.value || state.easing === this.value;
    },

    isPowerDisabled() {
      return this.type === 'power' && store.state[this.id].easing === 'linear';
    }
  }
};

</script>
