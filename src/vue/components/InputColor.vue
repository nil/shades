<template>
  <div class="color-input">
    <div class="color-input--info">
      <span class="color-input--name">
        {{ this.id.charAt(0).toUpperCase() + this.id.slice(1) }}
      </span>
      <div class="color-input--dropdown">
        <select v-model="colorFormat" @input="formatUpdate($event.target.value)">
          <option value="hex">HEX</option>
          <option value="rgb">RGB</option>
          <option value="hsv">HSB</option>
        </select>
      </div>
    </div>
    <div class="color-input--picker">
      <ColorPreview :id="id" />

      <!-- Hex -->
      <ColorInputSingle
        v-if="colorFormat === 'hex'"
        :id="id" />

      <!-- RGB -->
      <ColorInputMultiple
        v-if="colorFormat === 'rgb'"
        :format="'rgb'"
        :id="id" />

      <!-- HSB -->
      <ColorInputMultiple
        v-if="colorFormat === 'hsv'"
        :format="'hsv'"
        :id="id" />
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
    id: String
  },
  methods: {
    formatUpdate(newFormat) {
      let newColor = color(store.getters.color(this.id))[newFormat]();

      if (newFormat !== 'hex') {
        newColor = newColor.round().object();
      }

      store.commit('updateColor', {
        value: newColor,
        id: this.id
      });
    }
  },
  computed: {
    colorFormat: {
      get() {
        return store.state.colors[this.id].format;
      },
      set(newFormat) {
        store.commit('updateFormat', {
          value: newFormat,
          id: this.id
        });
      }
    }
  }
};

</script>
