<template>
  <input type="text" class="color-input--field color-input--hex"
    :value="colorValue"
    ref="input"
    @blur="writeUpdate($event)"
    @keypress.enter="writeUpdate($event)"
    @keypress.up="arrowUpdate($event)"
    @keypress.down="arrowUpdate($event)" />
</template>

<script>

import HexFormat from 'hex-format';
import color from 'color';
import store from '../../store';

export default {
  name: 'ColorInputSingle',
  props: {
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
    colorValue() {
      return store.state.colors[this.id].value;
    }
  }
};

</script>
