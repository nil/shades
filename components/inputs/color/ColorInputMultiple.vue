<template>
  <div class="input-color--field"
    v-if="selectedFormat === format">
    <ColorNumber
      v-for="(value, channel) in formatObject"
      :key="channel"
      :id="id"
      :label="channel"
      :max="value" />
  </div>
</template>

<script>

import store from 'store';
import ColorNumber from './ColorNumber.vue';

export default {
  name: 'ColorInputMultiple',

  components: {
    ColorNumber
  },

  props: {
    format: String,
    id: String
  },

  computed: {
    formatObject() {
      return store.state.format[this.format];
    },

    selectedFormat() {
      return store.state[this.id].format;
    }
  }
};

</script>
