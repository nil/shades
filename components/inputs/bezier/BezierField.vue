<template>
  <input class="input-bezier--field"
    type="text"
    :value="bezierValue" />
</template>

<script>

import store from 'store';

export default {
  name: 'BezierValue',

  props: {
    id: String
  },

  methods: {
    updateBezierValue() {
      if (this.type === 'easing') {
        store.commit('updateBezierWithButton', {
          id: this.id,
          easing: this.value
        });
      } else {
        store.commit('updateBezierWithButton', {
          id: this.id,
          power: this.value
        });
      }
    }
  },

  computed: {
    bezierValue() {
      return store.state[this.id].value;
    }
  }
};

</script>
