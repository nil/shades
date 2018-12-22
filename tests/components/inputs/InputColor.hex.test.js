import { mount } from '@vue/test-utils';
import store from 'store';

import InputColor from 'c/inputs/InputColor.vue';
import ColorInputSingle from 'c/inputs/color/ColorInputSingle.vue';
import ColorPreview from 'c/inputs/color/ColorPreview.vue';

// Mount components
const input = mount(InputColor, {
  propsData: {
    label: 'From',
    id: 'from'
  }
});

const single = input.find(ColorInputSingle);
const preview = input.find(ColorPreview);

// Tests
describe('ColorInput', () => {
  test('Only one field is rendered', () => {
    expect(input.findAll('.input-color--hex').length).toBe(1);
  });

  test('Color format is the same as in the store', () => {
    expect(input.vm.colorFormat).toBe(store.state.from.format);
  });

  describe('ColorInputSingle', () => {
    test('Change value with blur', () => {
      single.element.value = 'dra';
      single.trigger('blur');

      expect(single.element.value).toBe(store.state.from.color);
      expect(store.state.from.color).toBe('#DADADA');
    });

    test('Change value with enter', () => {
      single.element.value = '0';
      single.trigger('keydown.enter');

      expect(single.element.value).toBe(store.state.from.color);
      expect(store.state.from.color).toBe('#000000');
    });

    test('Change value with key up', () => {
      single.trigger('keydown.up');

      expect(single.element.value).toBe(store.state.from.color);
      expect(store.state.from.color).toBe('#030303');
    });

    test('Change value with key up and shift', () => {
      single.trigger('keydown.up', { shiftKey: true });

      expect(single.element.value).toBe(store.state.from.color);
      expect(store.state.from.color).toBe('#1C1C1C');
    });

    test('Change value with key down', () => {
      single.trigger('keydown.down', { key: 'ArrowDown' });

      expect(single.element.value).toBe(store.state.from.color);
      expect(store.state.from.color).toBe('#1A1A1A');
    });

    test('Change value with key down and shift', () => {
      single.trigger('keydown.down', { key: 'ArrowDown', shiftKey: true });

      expect(single.element.value).toBe(store.state.from.color);
      expect(store.state.from.color).toBe('#000000');
    });
  });

  describe('ColorPreview', () => {
    test('Color coincide with store value', () => {
      expect(preview.vm.backgroundColor).toBe(store.state.from.color);
    });

    test('Color changes when input is updated', () => {
      single.element.value = 'd';
      single.trigger('blur');

      expect(preview.vm.backgroundColor).toBe('#DDDDDD');
    });

    test('Color does not change if input is invalid', () => {
      single.element.value = 'r';
      single.trigger('blur');

      expect(preview.vm.backgroundColor).toBe(store.state.from.color);
    });
  });
});
