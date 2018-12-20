<!-- Based on https://github.com/ktsn/vue-range-slider -->

<template>
  <drag-helper
    @dragstart="dragStart"
    @drag="drag"
    @dragend="dragEnd">
    <div ref="slider" class="input-range--slider">
      <input class="input-range--hidden"
        type="text"
        :name="name"
        :value="actualValue">
      <div class="input-range--progress" :style="{ width: valuePercent + '%' }"></div>
      <div class="input-range--drag">
        <div class="input-range--handle" ref="handle" :style="{ left: valuePercent + '%' }">
        <slot name="handle"></slot>
        </div>
      </div>
    </div>
  </drag-helper>
</template>

<script>

import DragHelper from '../../js/dragHelper';
import round from '../../js/round';

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
      if (event.target === this.$refs.handle) {
        return;
      }
      // If the click is out of handle, move it to mouse position
      this.drag(event, offset);
    },

    drag(event, offset) {
      const { offsetWidth } = this.$refs.slider;
      this.actualValue = this.round(this.valueFromBounds(offset, offsetWidth));
      this.emitInput(this.actualValue);
    },

    dragEnd(event, offset) {
      const { offsetWidth } = this.$refs.slider;
      this.actualValue = this.round(this.valueFromBounds(offset, offsetWidth));

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
