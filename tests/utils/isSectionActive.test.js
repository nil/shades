import { mount } from '@vue/test-utils';
import store from 'store';
import InputSwitch from 'c/inputs/InputSwitch.vue';
import isSectionActive from '../../src/js/isSectionActive';

// Mount component
const wrapper = mount(InputSwitch, {
  propsData: {
    label: 'bar',
    id: 'main'
  }
});

// Tests
describe('isSectionActive', () => {
  test('Returned value is the same as stored value', () => {
    expect(isSectionActive('main')).toBe(store.state.main.active);
  });

  test('Value changes when store value is updated', () => {
    const initialValue = isSectionActive('main');

    // Toggle switch to change state
    wrapper.find('.input-switch').trigger('click');
    expect(isSectionActive('main')).toBe(!initialValue);

    // Toggle switch to get back to original state
    wrapper.find('.input-switch').trigger('click');
    expect(isSectionActive('main')).toBe(initialValue);
  });

  test('Return true if active is undefined', () => {
    expect(isSectionActive('from')).toBeTruthy();
  });
});
