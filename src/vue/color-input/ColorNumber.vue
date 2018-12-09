<template>
  <div class="color-input--number">
    <label class="color-input--label"
      :for="getId"
      @mousedown="mouseDownUpdate($event)">
      {{ labelLetter }}
    </label>
    <input type="text" class="color-input--input"
      :id="getId"
      :value="colorValue"
      ref="input"
      @blur="writeUpdate($event)"
      @keypress.enter="writeUpdate($event)"
      @keypress.up="arrowUpdate($event)"
      @keypress.down="arrowUpdate($event)" />
  </div>
</template>

<script>

import store from '../../store';
import numFormatter from '../../js/utils/numFormatter';

let initialMousePosition = 0;
let initialColorValue = 0;

export default {
  name: 'InputColorNumber',
  props: {
    max: Number,
    label: String,
    id: String
  },
  methods: {
    writeUpdate(e, value) {
      const chosenValue = e ? e.target.value : value;
      const val = numFormatter(chosenValue, this.max);

      if (val || val === 0) {
        store.commit('updateNumber', {
          id: this.id,
          label: this.label,
          value: val
        });
      } else {
        this.$refs.input.value = this.colorValue;
      }
    },
    arrowUpdate(e) {
      const diff = 1 + e.shiftKey * 9;
      const val = this.colorValue + (e.key === 'ArrowDown' ? -diff : diff);

      this.writeUpdate(undefined, val);
    },
    mouseDownUpdate(e) {
      initialMousePosition = e.pageX;
      initialColorValue = this.colorValue;

      document.addEventListener('mousemove', this.mouseMoveUpdate);
      document.addEventListener('mouseup', this.mouseUpUpdate);
    },
    mouseMoveUpdate(e) {
      const val = initialColorValue + e.pageX - initialMousePosition;

      this.writeUpdate(undefined, val);
    },
    mouseUpUpdate() {
      document.removeEventListener('mousemove', this.mouseMoveUpdate);
    }
  },
  computed: {
    colorValue() {
      return store.state.colors[this.id].value[this.label];
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
