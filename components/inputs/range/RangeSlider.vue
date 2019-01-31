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
    id: String
  },

  computed: {
    value: {
      get() {
        return store.state[this.id].range.value;
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

    isSectionActive() {
      return isSectionActive(this.id);
    }
  }
};

</script>
