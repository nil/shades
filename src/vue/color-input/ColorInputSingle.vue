<template>
  <input type="text" class="color-input--field color-input--hex"
    :value="colorValue"
    ref="input"
    @blur="colorUpdate($event)"
    @keypress.enter="colorUpdate($event)" />
</template>

<script>

import HexFormat from 'hex-format';
import store from '../../store';

export default {
  name: 'ColorInputSingle',
  props: {
    id: String
  },
  methods: {
    colorUpdate(e) {
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
    }
  },
  computed: {
    colorValue() {
      return store.state.colors[this.id].value;
    }
  }
};

</script>
