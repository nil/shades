<template>
  <div class="input-color">
    <div class="input-color--info">
      <span class="input-color--label">{{ label }}</span>
      <select tabindex="-1" class="input-color--dropdown"
        v-model="colorFormat"
        @input="formatUpdate($event.target.value)">
        <option value="hex">HEX</option>
        <option value="rgb">RGB</option>
        <option value="hsv">HSB</option>
      </select>
    </div>
    <div class="input-color--picker">
      <ColorPreview :id="id" />

      <!-- Hex -->
      <ColorInputSingle
        :format="'hex'"
        :id="id" />

      <!-- RGB -->
      <ColorInputMultiple
        :format="'rgb'"
        :id="id" />

      <!-- HSB -->
      <ColorInputMultiple
        :format="'hsv'"
        :id="id" />
    </div>
  </div>
</template>

<script>

import color from 'color';
import store from 'store';

import ColorPreview from './color/ColorPreview.vue';
import ColorInputSingle from './color/ColorInputSingle.vue';
import ColorInputMultiple from './color/ColorInputMultiple.vue';

export default {
  name: 'InputColor',

  components: {
    ColorPreview,
    ColorInputSingle,
    ColorInputMultiple
  },

  props: {
    label: String,
    id: String
  },

  methods: {
    formatUpdate(newFormat) {
      let newColor = color(store.state[this.id].color)[newFormat]();

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
        return store.state[this.id].format;
      },

      set(value) {
        store.commit('updateFormat', {
          id: this.id,
          value
        });
      }
    }
  }
};

</script>
