<template>
  <div class="color-input">
    <div class="color-input--info">
      <span class="color-input--name">{{ label }}</span>
      <div class="color-input--dropdown">
        <select v-model="colorFormat" @input="formatUpdate($event.target.value)">
          <option value="hex">HEX</option>
          <option value="rgb">RGB</option>
          <option value="hsv">HSB</option>
        </select>
      </div>
    </div>
    <div class="color-input--picker">
      <ColorPreview :id="colorId" />

      <!-- Hex -->
      <ColorInputSingle
        v-if="colorFormat === 'hex'"
        :id="colorId" />

      <!-- RGB -->
      <ColorInputMultiple
        v-if="colorFormat === 'rgb'"
        :format="'rgb'"
        :id="colorId" />

      <!-- HSB -->
      <ColorInputMultiple
        v-if="colorFormat === 'hsv'"
        :format="'hsv'"
        :id="colorId" />
    </div>
  </div>
</template>

<script>

import color from 'color';
import store from '../../store';

import ColorPreview from '../color-input/ColorPreview.vue';
import ColorInputSingle from '../color-input/ColorInputSingle.vue';
import ColorInputMultiple from '../color-input/ColorInputMultiple.vue';

export default {
  name: 'InputColor',
  components: {
    ColorPreview,
    ColorInputSingle,
    ColorInputMultiple
  },
  props: {
    label: String
  },
  data() {
    return {
      colorFormat: 'hex'
    };
  },
  methods: {
    formatUpdate(newFormat) {
      let newColor = color(store.state[this.colorId])[newFormat]();

      if (newFormat !== 'hex') {
        newColor = newColor.round().object();
      }

      store.commit('updateColor', {
        value: newColor,
        id: this.colorId
      });
    }
  },
  computed: {
    colorId() {
      return `${this.label.toLowerCase()}Color`;
    }
  }
};

</script>
