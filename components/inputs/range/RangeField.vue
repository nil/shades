<template>
  <input type="text" class="input-range--value"
    ref="input"
    :value="value"
    tabindex="-1"
    :disabled="!isSectionActive"
    @blur="writeUpdate($event)"
    @keydown.enter="writeUpdate($event)"
    @keydown.up="arrowUpdate($event)"
    @keydown.down="arrowUpdate($event)" />
</template>

<script>

import store from 'store';

import isSectionActive from 'js/isSectionActive';
import validateNumber from 'js/validateNumber';

export default {
  name: 'RangeField',

  props: {
    id: String,
    min: [String, Number],
    max: [String, Number]
  },

  methods: {
    writeUpdate(e, value) {
      const chosenValue = e ? e.target.value : value;
      const val = validateNumber(chosenValue, this.max, this.min);

      if (val || val === 0) {
        store.commit('updateRange', {
          id: this.id,
          value: val
        });
        this.$refs.input.value = val;
      } else {
        this.$refs.input.value = this.value;
      }
    },

    arrowUpdate(e) {
      const diff = 1 + e.shiftKey * 9;
      const val = this.value + (e.key === 'ArrowDown' ? -diff : diff);

      this.writeUpdate(undefined, val);
    }
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

    isSectionActive() {
      return isSectionActive(this.id);
    }
  }
};

</script>
