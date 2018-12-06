<template>
  <div class="color-input--number">
    <label :for="getId" class="color-input--label">
      {{ labelLetter }}
    </label>
    <input type="text" class="color-input--input"
      :id="getId"
      :value="colorValue"
      ref="input"
      @blur="numUpdate($event)"
      @keypress.enter="numUpdate($event)" />
  </div>
</template>

<script>

import store from '../../store';
import numFormatter from '../../js/utils/numFormatter';

export default {
  name: 'InputColorNumber',
  props: {
    max: Number,
    label: String,
    id: String
  },
  methods: {
    numUpdate(e) {
      const val = numFormatter(e.target.value, this.max);

      if (val || val === 0) {
        store.commit('numberUpdate', {
          id: this.id,
          label: this.label,
          value: val
        });
      } else {
        this.$refs.input.value = this.colorValue;
      }
    }
  },
  computed: {
    colorValue() {
      return store.state[this.id][this.label];
    },
    getId() {
      return `input-${Math.floor(Math.random() * 65535).toString(16)}`;
    },
    labelLetter() {
      // HSV's most popular name is HSB, so this replaces the V with a B
      if (this.label === 'v') {
        return 'B';
      }

      return this.label.toUpperCase();
    }
  }
};

</script>
