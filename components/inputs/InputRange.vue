<template>
  <div class="input-range">
    <div class="input-range--info">
      <div class="input-range--name">{{ label }}</div>
      <RangeField :id="id" :min="min" :max="max" />
    </div>
    <div class="input-range--slider">
      <div class="input-range--path">
        <div class="input-range--progress" :style="{ width: valuePercent }"></div>
      </div>
      <RangeSlider :id="id" :min="min" :max="max" />
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
    id: String,
    min: [String, Number],
    max: [String, Number]
  },

  computed: {
    valuePercent() {
      const val = store.state[this.id].index;
      const min = Number(this.min);
      const max = Number(this.max);

      return `${(val - min) / (max - min) * 100}%`;
    }
  }
};

</script>
