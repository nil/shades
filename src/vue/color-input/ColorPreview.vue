<template>
  <div class="color-input--preview"
    :style="{ background: backgroundColor }"
    @click="toggleColorPicker($event)" />
</template>

<script>

import store from '../../store';

export default {
  name: 'ColorPreview',
  props: {
    id: String
  },
  computed: {
    backgroundColor() {
      return store.getters.hex(this.id);
    }
  },
  methods: {
    toggleColorPicker(e) {
      store.commit('toggleColorPicker', {
        target: e.target,
        id: this.id
      });
    }
  }
};

</script>
