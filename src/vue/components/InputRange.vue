<template>
  <div class="hello">
    {{ label }}
    <range-slider
      class="slider"
      min="10"
      max="100"
      step="10"
      v-model="sliderValue">
    </range-slider>
    {{ sliderValue }}
  </div>
</template>

<script>

// import RangeSlider from 'vue-range-slider';
import RangeSlider from '../input-range/RangeSlider.vue';

export default {
  name: 'InputRange',
  components: {
    RangeSlider
  },
  props: {
    label: String
  },
  data() {
    return {
      sliderValue: 20
    };
  }
};

</script>

<style>

</style>
