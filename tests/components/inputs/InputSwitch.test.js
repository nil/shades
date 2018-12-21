import { mount } from '@vue/test-utils';
import store from 'store';
import InputSwitch from 'c/inputs/InputSwitch.vue';

// Mount component
const wrapper = mount(InputSwitch, {
  propsData: {
    label: 'bar',
    id: 'main'
  }
});

let active = null;

// Tests
describe('InputSwitch', () => {
  test('Switch state coincide with store value', () => {
    active = wrapper.vm.toggleSwitch;
    expect(wrapper.vm.toggleSwitch).toBe(store.state.main.active);
  });

  test('Label and checkbox have same name', () => {
    const nameFor = wrapper.find('.input-switch').attributes('for');
    const nameId = wrapper.find('.input-switch--checkbox').attributes('id');

    expect(nameFor).toBe(nameId);
  });

  test('Toggle switch', () => {
    // Toggle switch to change state
    wrapper.find('.input-switch--checkbox').trigger('click');

    expect(wrapper.vm.toggleSwitch).toBe(store.state.main.active);
    expect(wrapper.vm.toggleSwitch).not.toBe(active);
  });

  test('Toggle switch with label', () => {
    // Toggle switch to get back to original value
    wrapper.find('.input-switch').trigger('click');

    expect(wrapper.vm.toggleSwitch).toBe(store.state.main.active);
    expect(wrapper.vm.toggleSwitch).toBe(active);
  });
});
