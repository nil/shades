import { mount } from '@vue/test-utils';
import store from 'store';

import InputRange from 'c/inputs/InputRange.vue';
import RangeField from 'c/inputs/range/RangeField.vue';
import RangeSlider from 'c/inputs/range/RangeSlider.vue';

// Mount component
const input = mount(InputRange, {
  propsData: {
    label: 'foo',
    id: 'main',
    min: 1,
    max: '25'
  }
});

const field = input.find(RangeField);
const slider = input.find(RangeSlider);

// Change default value
store.commit('updateRange', {
  id: 'main',
  value: 6
});

// Tests
describe('InputRange', () => {
  test('Two inputs are rendered', () => {
    const list = input.findAll('input');

    expect(list.length).toBe(2);
  });

  test('Both inputs are rendered', () => {
    expect(field.exists()).toBeTruthy();
    expect(slider.exists()).toBeTruthy();
  });

  test('Range input, number input and store have the same value', () => {
    const storeVal = Number(store.state.main.index);
    const fieldVal = Number(field.vm.$refs.input.value);
    const sliderVal = Number(slider.vm.$refs.input.value);

    expect(fieldVal).toBe(sliderVal);
    expect(fieldVal).toBe(storeVal);
    expect(sliderVal).toBe(storeVal);
  });

  test('ValuePercent is the expected percentage', () => {
    expect(`${input.vm.valuePercent.substring(0, 7)}%`).toBe('20.8333%');
  });

  describe('RangeField', () => {
    test('Change value with blur', () => {
      field.vm.$refs.input.value = '-2';
      field.trigger('blur');

      expect(Number(field.vm.$refs.input.value)).toBe(store.state.main.index);
      expect(store.state.main.index).toBe(1);
    });

    test('Change value with enter', () => {
      field.vm.$refs.input.value = '6+2*5';
      field.trigger('keydown.enter');

      expect(Number(field.vm.$refs.input.value)).toBe(store.state.main.index);
      expect(store.state.main.index).toBe(16);
    });

    test('Change value with key up', () => {
      field.trigger('keydown.up');

      expect(Number(field.vm.$refs.input.value)).toBe(store.state.main.index);
      expect(store.state.main.index).toBe(17);
    });

    test('Change value with key up and shift', () => {
      field.trigger('keydown.up', { shiftKey: true });

      expect(Number(field.vm.$refs.input.value)).toBe(store.state.main.index);
      expect(store.state.main.index).toBe(25);
    });

    test('Change value with key down', () => {
      field.trigger('keydown.down', { key: 'ArrowDown' });

      expect(Number(field.vm.$refs.input.value)).toBe(store.state.main.index);
      expect(store.state.main.index).toBe(24);
    });

    test('Change value with key down and shift', () => {
      field.trigger('keydown.down', { key: 'ArrowDown', shiftKey: true });

      expect(Number(field.vm.$refs.input.value)).toBe(store.state.main.index);
      expect(store.state.main.index).toBe(14);
    });
  });
});
