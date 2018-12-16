<!-- Based on https://github.com/ktsn/vue-range-slider -->

<template>
  <span class="range-slider">
    <drag-helper
      @dragstart="dragStart"
      @drag="drag"
      @dragend="dragEnd">
      <span ref="inner" class="range-slider-inner">
        <input class="range-slider-hidden"
          type="text"
          :name="name"
          :value="actualValue">
        <span class="range-slider-rail"></span>
        <span class="range-slider-fill" :style="{ width: valuePercent + '%' }"></span>
        <span class="range-slider-knob" ref="knob" :style="{ left: valuePercent + '%' }">
          <slot name="knob"></slot>
        </span>
      </span>
    </drag-helper>
  </span>
</template>

<script>

import DragHelper from '../../js/utils/dragHelper';
import round from '../../js/utils/round';

export default {
  components: {
    DragHelper
  },
  props: {
    name: String,
    value: [String, Number],
    min: [String, Number],
    max: [String, Number],
    step: [String, Number]
  },

  data() {
    return {
      actualValue: null,
      dragStartValue: null
    };
  },

  created() {
    const { minNum: min, maxNum: max } = this;
    let defaultValue = Number(this.value);

    if (this.value == null || Number.isNaN(defaultValue)) {
      if (min > max) {
        defaultValue = min;
      } else {
        defaultValue = (min + max) / 2;
      }
    }

    this.actualValue = this.round(defaultValue);
  },

  computed: {
    minNum() {
      return Number(this.min);
    },

    maxNum() {
      return Number(this.max);
    },

    stepNum() {
      return Number(this.step);
    },

    valuePercent() {
      return (this.actualValue - this.minNum) / (this.maxNum - this.minNum) * 100;
    }
  },

  watch: {
    value(newValue) {
      const value = Number(newValue);
      if (newValue != null && !Number.isNaN(value)) {
        this.actualValue = this.round(value);
      }
    },
    min() {
      this.actualValue = this.round(this.actualValue);
    },
    max() {
      this.actualValue = this.round(this.actualValue);
    }
  },

  methods: {
    dragStart(event, offset) {
      this.dragStartValue = this.actualValue;
      if (event.target === this.$refs.knob) {
        return;
      }
      // If the click is out of knob, move it to mouse position
      this.drag(event, offset);
    },

    drag(event, offset) {
      const { offsetWidth } = this.$refs.inner;
      this.actualValue = this.round(this.valueFromBounds(offset.left, offsetWidth));
      this.emitInput(this.actualValue);
    },

    dragEnd(event, offset) {
      const { offsetWidth } = this.$refs.inner;
      this.actualValue = this.round(this.valueFromBounds(offset.left, offsetWidth));

      if (this.dragStartValue !== this.actualValue) {
        this.emitChange(this.actualValue);
      }
    },

    emitInput(value) {
      this.$emit('input', value);
    },

    emitChange(value) {
      this.$emit('change', value);
    },

    valueFromBounds(point, width) {
      return (point / width) * (this.maxNum - this.minNum) + this.minNum;
    },

    round(value) {
      return round(value, this.minNum, this.maxNum, this.stepNum);
    }
  }
};

</script>
