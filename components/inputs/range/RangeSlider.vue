<template>
  <input class="input-range--input"
    type="range"
    :min="min"
    :max="max"
    v-model="value"
    :disabled="!isSectionActive"
  />
</template>

<script>

import store from 'store';

import isSectionActive from 'js/isSectionActive';

export default {
  name: 'RangeField',

  props: {
    id: String,
    min: [String, Number],
    max: [String, Number]
  },

  computed: {
    value: {
      get() {
        return store.state[this.id].index;
      },
      set(value) {
        if (value !== this.value) {
          store.commit('updateRange', {
            id: this.id,
            value
          });
        }
      }
    },

    min() {
      return store.state[this.id].range.min;
    },

    max() {
      return store.state[this.id].range.max;
    },

    isSectionActive() {
      return isSectionActive(this.id);
    }
  }
};

</script>
