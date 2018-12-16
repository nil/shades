<template>
  <label class="input-switch" :for="getId">
    <span class="input-switch--label">{{ label }}</span>
    <input class="input-switch--checkbox"
      :id="getId"
      data-check-switch=""
      role="switch"
      type="checkbox"
      v-model="toggleSwitch">
    <div class="input-switch--toggle" aria-hidden="true">
      <svg class="input-switch--on" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.5 11.4615L10.3462 15.0454L17.5 7.8916" />
      </svg>

      <svg class="input-switch--off" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 8L16 16M16 8L8 16" />
      </svg>
    </div>
  </label>
</template>

<script>

import store from '../../store';

export default {
  name: 'InputSwitch',
  props: {
    label: String,
    id: String
  },
  computed: {
    getId() {
      return `input-${Math.floor(Math.random() * 65535).toString(16)}`;
    },
    toggleSwitch: {
      get() {
        return store.state[this.id].active;
      },
      set() {
        store.commit('updateSwitch', this.id);
      }
    }
  }
};

</script>
