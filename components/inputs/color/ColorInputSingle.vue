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

import HexFormat from 'hex-format';
import color from 'color';
import store from 'store';

import isSectionActive from 'js/isSectionActive';

export default {
  name: 'ColorInputSingle',

  props: {
    format: String,
    id: String
  },

  methods: {
    writeUpdate(e) {
      const val = e.target.value;
      const hex = new HexFormat().format(val);

      if (hex && this.colorValue !== hex) {
        store.commit('updateColor', {
          value: hex,
          id: this.id
        });
        this.$refs.input.value = hex;
      } else {
        this.$refs.input.value = this.colorValue;
      }
    },

    arrowUpdate(e) {
      const diff = 1 + e.shiftKey * 9;
      const hsb = color(this.colorValue).hsv().round().object();
      const val = hsb.v + (e.key === 'ArrowDown' ? -diff : diff);
      const hex = color({ h: hsb.h, s: hsb.s, v: val }).hex();

      store.commit('updateColor', {
        value: hex,
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
