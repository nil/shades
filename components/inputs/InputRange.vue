<template>
  <div class="input-range">
    <div class="input-range--info">
      <div class="input-range--name">{{ label }}</div>
      <div class="input-range--value">{{ value }}</div>
    </div>
    <drag-helper
      @dragstart="dragStart"
      @drag="drag"
      @dragend="dragEnd">
      <div ref="slider" class="input-range--slider">
        <input class="input-range--hidden"
          type="text"
          :value="value">
        <div class="input-range--progress" :style="{ width: valuePercent + '%' }"></div>
        <div class="input-range--drag">
          <div class="input-range--handle" ref="handle" :style="{ left: valuePercent + '%' }">
          <slot name="handle"></slot>
          </div>
        </div>
      </div>
    </drag-helper>
  </div>
</template>

<script>

import store from 'store';
import DragHelper from 'js/dragHelper';
import round from 'js/round';

export default {
  name: 'InputRange',

  components: {
    DragHelper
  },

  props: {
    label: String,
    id: String,
    min: [String, Number],
    max: [String, Number]
  },

  data() {
    return {
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

    this.value = this.round(defaultValue);
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
    },

    minNum() {
      return Number(this.min);
    },

    maxNum() {
      return Number(this.max);
    },

    valuePercent() {
      return (this.value - this.minNum) / (this.maxNum - this.minNum) * 100;
    }
  },

  watch: {
    value(newValue) {
      const value = Number(newValue);
      if (newValue != null && !Number.isNaN(value)) {
        this.value = this.round(value);
      }
    },
    min() {
      this.value = this.round(this.value);
    },
    max() {
      this.value = this.round(this.value);
    }
  },

  methods: {
    dragStart(event, offset) {
      this.dragStartValue = this.value;
      if (event.target === this.$refs.handle) {
        return;
      }
      // If the click is out of handle, move it to mouse position
      this.drag(event, offset);
    },

    drag(event, offset) {
      const { offsetWidth } = this.$refs.slider;
      this.value = this.round(this.valueFromBounds(offset, offsetWidth));
      this.emitInput(this.value);
    },

    dragEnd(event, offset) {
      const { offsetWidth } = this.$refs.slider;
      this.value = this.round(this.valueFromBounds(offset, offsetWidth));

      if (this.dragStartValue !== this.value) {
        this.emitChange(this.value);
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
      return round(value, this.minNum, this.maxNum, 1);
    }
  }
};

</script>
