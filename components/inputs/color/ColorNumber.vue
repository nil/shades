<template>
  <div class="input-color--number">
    <label class="input-color--letter"
      :for="getId"
      @mousedown="mouseDownUpdate($event)">
      {{ labelLetter }}
    </label>
    <input type="text" class="input-color--input"
      :id="getId"
      :value="colorValue"
      :disabled="!isSectionActive"
      ref="input"
      @blur="writeUpdate($event)"
      @keydown.enter="writeUpdate($event)"
      @keydown.up="arrowUpdate($event)"
      @keydown.down="arrowUpdate($event)" />
  </div>
</template>

<script>

import store from 'store';
import isSectionActive from 'js/isSectionActive';
import updateFieldWithKey from 'js/updateFieldWithKey';
import updateFieldWithText from 'js/updateFieldWithText';

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
      this.$refs.input.value = updateFieldWithText({
        id: this.id,
        label: this.label,
        number: e ? e.target.value : value,
        current: this.colorValue,
        max: this.max,
        min: this.min
      });
    },

    arrowUpdate(e) {
      this.writeUpdate(null, updateFieldWithKey({
        number: this.colorValue,
        key: e.key,
        shift: e.shiftKey
      }));
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
    labelLetter() {
      // HSV's most popular name is HSB, so this replaces the V with a B
      if (this.label === 'v') {
        return 'B';
      }

      return this.label.toUpperCase();
    },

    getId() {
      return `input-${Math.floor(Math.random() * 65535).toString(16)}`;
    },

    colorValue() {
      return store.state[this.id].color[this.label];
    },

    isSectionActive() {
      return isSectionActive(this.id);
    }
  }
};

</script>
