<template>
  <section class="config-bar" role="main">
    <h1>Colors {{ indexValue }}</h1>

    <InputColor label="From" id="from" />
    <InputColor label="To" id="to" />

    <InputSwitch label="Main color" id="main" />

    <div class="config-bar--main" :class="{ active: isMainActive }">
      <div class="config-bar--border"></div>
      <InputRange label="Position" id="main" min="1" max="20" />
      <InputColor label="Color" id="main" />
    </div>
  </section>
</template>

<script>

import store from 'store';

import InputRange from '../inputs/InputRange.vue';
import InputColor from '../inputs/InputColor.vue';
import InputSwitch from '../inputs/InputSwitch.vue';

export default {
  name: 'ConfigBar',

  components: {
    InputRange,
    InputColor,
    InputSwitch
  },

  computed: {
    isMainActive() {
      return store.state.main.active;
    },

    indexValue() {
      return store.state.main.index;
    }
  }
};

</script>
