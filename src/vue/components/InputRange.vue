<template>
  <div class="input-range">
    <div class="input-range--info">
      <div class="input-range--name">{{ label }}</div>
      <div class="input-range--value">{{ value }}</div>
    </div>
    <range-slider
      min="10"
      max="100"
      step="10"
      v-model="value">
    </range-slider>
  </div>
</template>

<script>

import store from '../../store';

import RangeSlider from '../input-range/RangeSlider.vue';

export default {
  name: 'InputRange',
  components: {
    RangeSlider
  },
  props: {
    label: String,
    id: String
  },
  computed: {
    value: {
      get() {
        return store.state[this.id].index;
      },
      set(value) {
        if (value !== this.value) {
          store.commit('updateRange', {
            id: this.id,
            value
          });
        }
      }
    }
  }
};

</script>
