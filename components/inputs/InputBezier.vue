<template>
  <div class="input-bezier">
    <div class="input-bezier--preview">preview</div>
    <div class="input-bezier--easing">
      <BezierButton
        v-for="value in bezierEasings"
        :key="value"
        :id="id"
        :value="value"
        type="easing" />
    </div>
    <div class="input-bezier--power">
      <BezierButton
        v-for="value in bezierPowers"
        :key="value"
        :id="id"
        :value="value"
        type="power" />
    </div>
  </div>
</template>

<script>

import store from 'store';

import BezierButton from './bezier/BezierButton.vue';

export default {
  name: 'InputBezier',

  components: {
    BezierButton
  },

  props: {
    label: String,
    id: String
  },

  methods: {

  },

  computed: {
    bezierEasings() {
      return store.state.easing.list.easing;
    },

    bezierPowers() {
      return store.state.easing.list.power;
    }
  }
};

</script>
