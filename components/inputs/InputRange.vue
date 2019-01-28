<template>
  <div class="input-range">
    <div class="input-range--info">
      <div class="input-range--name">{{ label }}</div>
      <input type="text" class="input-range--value"
        ref="input"
        :value="value"
        tabindex="-1"
        @blur="writeUpdate($event)"
        @keydown.enter="writeUpdate($event)"
        @keydown.up="arrowUpdate($event)"
        @keydown.down="arrowUpdate($event)" />
    </div>
    <div class="input-range--slider">
      <div class="input-range--limit input-range--path">
        <div class="input-range--progress" :style="{ width: valuePercent }"></div>
      </div>
      <input class="input-range--input"
        type="range"
        :min="min"
        :max="max"
        v-model="value"
      />
      <div class="input-range--limit">
        <div class="input-range--tooltip" :style="{ left: valuePercent }">{{ value }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import store from 'store';
import numFormatter from 'js/numFormatter';

export default {
  name: 'InputRange',

  props: {
    label: String,
    id: String,
    min: [String, Number],
    max: [String, Number]
  },

  methods: {
    writeUpdate(e, value) {
      const chosenValue = e ? e.target.value : value;
      const val = numFormatter(chosenValue, this.max, this.min);

      if (val || val === 0) {
        store.commit('updateRange', {
          id: this.id,
          value: val
        });
        this.$refs.input.value = val;
      } else {
        this.$refs.input.value = this.value;
      }
    },

    arrowUpdate(e) {
      const diff = 1 + e.shiftKey * 9;
      const val = this.value + (e.key === 'ArrowDown' ? -diff : diff);

      this.writeUpdate(undefined, val);
    }
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

    valuePercent() {
      const min = Number(this.min);
      const max = Number(this.max);

      return `${(this.value - min) / (max - min) * 100}%`;
    }
  }
};

</script>
