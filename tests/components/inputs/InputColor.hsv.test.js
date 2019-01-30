import { mount } from '@vue/test-utils';
import store from 'store';

import InputColor from 'c/inputs/InputColor.vue';
import ColorInputMultiple from 'c/inputs/color/ColorInputMultiple.vue';
import ColorNumber from 'c/inputs/color/ColorNumber.vue';
import ColorPreview from 'c/inputs/color/ColorPreview.vue';

// Mount components
const input = mount(InputColor, {
  propsData: {
    label: 'From',
    id: 'from'
  }
});

// Change format to hsv
input.find('.input-color--dropdown').setValue('hsv');
input.find('.input-color--dropdown').trigger('input');

const multiple = input.find(ColorInputMultiple);
const number = input.find(ColorNumber);
const numbers = input.findAll(ColorNumber);
const preview = input.find(ColorPreview);

// Tests
describe('ColorInput', () => {
  describe('formatUpdate', () => {
    test('Format is updated', () => {
      expect(input.vm.colorFormat).toBe(store.state.from.format);
      expect(input.vm.colorFormat).toBe('hsv');
    });

    test('Color is updated', () => {
      expect(store.state.from.color.h).not.toBe(undefined);
    });

    test('Input is replaced', () => {
      expect(input.find('.input-color--hex').exists()).toBeFalsy();
      expect(input.find('.input-color--number').exists()).toBeTruthy();
    });
  });

  describe('ColorInputMultiple', () => {
    test('Correct number of inputs', () => {
      expect(Object.keys(multiple.vm.formatObject).length).toBe(numbers.length);
    });
  });

  describe('ColorNumber', () => {
    const numberInput = number.find('.input-color--input');

    test('Label and checkbox have same name', () => {
      const nameFor = number.find('.input-color--letter').attributes('for');
      const nameId = number.find('.input-color--input').attributes('id');

      expect(nameFor).toBe(nameId);
    });

    test('Correct label for v', () => {
      expect(numbers.at(2).vm.labelLetter).toBe('B');
    });

    test('Change value with blur', () => {
      number.vm.$refs.input.value = '20';
      numberInput.trigger('blur');

      expect(Number(number.vm.$refs.input.value)).toBe(store.state.from.color.h);
      expect(store.state.from.color.h).toBe(20);
    });

    test('Change value with enter', () => {
      number.vm.$refs.input.value = '12+6*4';
      numberInput.trigger('keydown.enter');

      expect(Number(number.vm.$refs.input.value)).toBe(store.state.from.color.h);
      expect(store.state.from.color.h).toBe(36);
    });

    test('Change value with key up', () => {
      numberInput.trigger('keydown.up');

      expect(Number(number.vm.$refs.input.value)).toBe(store.state.from.color.h);
      expect(store.state.from.color.h).toBe(37);
    });

    test('Change value with key up and shift', () => {
      numberInput.trigger('keydown.up', { shiftKey: true });

      expect(Number(number.vm.$refs.input.value)).toBe(store.state.from.color.h);
      expect(store.state.from.color.h).toBe(47);
    });

    test('Change value with key down', () => {
      numberInput.trigger('keydown.down', { key: 'ArrowDown' });

      expect(Number(number.vm.$refs.input.value)).toBe(store.state.from.color.h);
      expect(store.state.from.color.h).toBe(46);
    });

    test('Change value with key down and shift', () => {
      numberInput.trigger('keydown.down', { key: 'ArrowDown', shiftKey: true });

      expect(Number(number.vm.$refs.input.value)).toBe(store.state.from.color.h);
      expect(store.state.from.color.h).toBe(36);
    });
  });

  test('Color preview is updated', () => {
    expect(preview.vm.backgroundColor).toBe('#332511');
  });
});
