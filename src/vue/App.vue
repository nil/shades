<template>
  <div id="app" @click="toggleColorPicker($event)">
    <ConfigBar msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>

import store from '../store';

import ConfigBar from './ui/ConfigBar.vue';

export default {
  name: 'app',
  components: {
    ConfigBar
  },
  methods: {
    toggleColorPicker(e) {
      store.commit('toggleColorPicker', {
        target: e.target,
        id: null
      });
    }
  }
};

</script>
