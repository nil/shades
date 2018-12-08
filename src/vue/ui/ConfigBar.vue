<template>
  <section class="config-bar" role="main">

    <!-- <InputRange min="2" max="10" :val="steps" v-model="steps" /> {{ steps }} -->

    <div>
      <h1>Colors</h1>
      <InputColor label="From" />
      <InputColor label="To" />
    </div>

  </section>
</template>

<script>

import InputRange from '../components/InputRange.vue';
import InputColor from '../components/InputColor.vue';

export default {
  name: 'ConfigBar',
  props: {
    msg: String
  },
  components: {
    InputRange,
    InputColor
  },
  data() {
    return {
      steps: 10,
      minRange: 15,
      maxRange: 75,

      color: '#112233'
      // color: {
      //   r: 40,
      //   g: 40,
      //   b: 30
      // }
    };
  }
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
