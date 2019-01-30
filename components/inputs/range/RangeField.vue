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
import updateFieldWithKey from 'js/updateFieldWithKey';
import updateFieldWithText from 'js/updateFieldWithText';

export default {
  name: 'RangeField',

  props: {
    id: String,
    min: [String, Number],
    max: [String, Number]
  },

  methods: {
    writeUpdate(e, value) {
      this.$refs.input.value = updateFieldWithText({
        id: this.id,
        number: e ? e.target.value : value,
        current: this.colorValue,
        max: this.max,
        min: this.min
      });
    },

    arrowUpdate(e) {
      this.writeUpdate(null, updateFieldWithKey({
        number: this.value,
        key: e.key,
        shift: e.shiftKey
      }));
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
