<template>
  <div id="app">
    <ConfigBar msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>

import ConfigBar from './ui/ConfigBar.vue';

export default {
  name: 'app',
  components: {
    ConfigBar
  }
};

</script>
