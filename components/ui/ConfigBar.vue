<template>
  <section class="config-bar" role="main">
    <h1>Colors</h1>

    <InputColor label="From" id="from" />
    <InputColor label="To" id="to" />

    <InputSwitch label="Main color" id="main" />

    <div class="config-bar--main" :class="{ active: isSectionActive }">
      <div class="config-bar--border"></div>
      <InputRange label="Position" id="main" min="1" max="20" />
      <InputColor label="Color" id="main" />
    </div>

    <InputBezier id="hue" />
  </section>
</template>

<script>

import isSectionActive from 'js/isSectionActive';

import InputBezier from '../inputs/InputBezier.vue';
import InputRange from '../inputs/InputRange.vue';
import InputColor from '../inputs/InputColor.vue';
import InputSwitch from '../inputs/InputSwitch.vue';

export default {
  name: 'ConfigBar',

  components: {
    InputBezier,
    InputRange,
    InputColor,
    InputSwitch
  },

  computed: {
    isSectionActive() {
      return isSectionActive('main');
    }
  }
};

</script>
