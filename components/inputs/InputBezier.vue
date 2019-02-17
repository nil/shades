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

    <BezierField :id="id" />
  </div>
</template>

<script>

import store from 'store';

import BezierButton from './bezier/BezierButton.vue';
import BezierField from './bezier/BezierField.vue';

export default {
  name: 'InputBezier',

  components: {
    BezierButton,
    BezierField
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
