<template>
  <div class="input-range">
    <div class="input-range--info">
      <div class="input-range--name">{{ label }}</div>
      <div class="input-range--value">{{ value }}</div>
    </div>
    <div class="input-range--slider">
      <div class="input-range--path">
        <div class="input-range--progress" :style="{ width: valuePercent }"></div>
      </div>
      <input class="input-range--input"
        type="range"
        :min="min"
        :max="max"
        v-model="value"
      />
    </div>
  </div>
</template>

<script>
import store from 'store';

export default {
  name: 'InputRange',

  props: {
    label: String,
    id: String,
    min: [String, Number],
    max: [String, Number]
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

    getId() {
      return `input-${Math.floor(Math.random() * 65535).toString(16)}`;
    },

    valuePercent() {
      const min = Number(this.min);
      const max = Number(this.max);

      return `${(this.value - min) / (max - min) * 100}%`;
    }
  }
};

</script>
