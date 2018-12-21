<template>
  <div class="input-color--preview" :style="{ background: backgroundColor }" />
</template>

<script>

import store from 'store';

export default {
  name: 'ColorPreview',
  props: {
    id: String
  },
  computed: {
    backgroundColor() {
      return store.getters.hex(this.id);
    }
  }
};

</script>
