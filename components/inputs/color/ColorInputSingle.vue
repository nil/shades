<template>
  <input type="text" class="input-color--field input-color--hex"
    v-if="selectedFormat === format"
    :value="colorValue"
    :disabled="!isSectionActive"
    ref="input"
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
  name: 'ColorInputSingle',

  props: {
    format: String,
    id: String
  },

  methods: {
    writeUpdate(e) {
      updateFieldWithText({
        id: this.id,
        color: e.target.value,
        current: this.colorValue
      });
    },

    arrowUpdate(e) {
      store.commit('updateColor', {
        value: updateFieldWithKey({
          color: this.colorValue,
          key: e.key,
          shift: e.shiftKey
        }),
        id: this.id
      });
    }
  },

  computed: {
    selectedFormat() {
      return store.state[this.id].format;
    },

    colorValue() {
      return store.state[this.id].color;
    },

    isSectionActive() {
      return isSectionActive(this.id);
    }
  }
};

</script>
