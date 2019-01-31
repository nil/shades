<template>
  <div class="input-range">
    <div class="input-range--info">
      <div class="input-range--name">{{ label }}</div>
      <RangeField :id="id" />
    </div>
    <div class="input-range--slider">
      <div class="input-range--path">
        <div class="input-range--progress" :style="{ width: valuePercent }"></div>
      </div>
      <RangeSlider :id="id" />
    </div>
  </div>
</template>

<script>
import store from 'store';

import RangeField from './range/RangeField.vue';
import RangeSlider from './range/RangeSlider.vue';

export default {
  name: 'InputRange',

  components: {
    RangeField,
    RangeSlider
  },

  props: {
    label: String,
    id: String
  },

  computed: {
    valuePercent() {
      const range = store.state[this.id].range;

      const val = range.value;
      const min = range.min;
      const max = range.max;

      return `${(val - min) / (max - min) * 100}%`;
    }
  }
};

</script>
