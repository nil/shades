<template>
  <div class="hello">
    <input type="range"
      :min="min"
      :max="max"
      :value="val"
      step="1"
      @input="updateValue($event.target.value)" />
  </div>
</template>

<script>

export default {
  name: 'InputRange',
  props: {
    min: String,
    max: String,
    val: Number
  },
  methods: {
    updateValue(val) {
      this.$emit('input', val);
    }
  }
};

</script>
