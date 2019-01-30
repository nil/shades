import store from 'store';
import validateNumber from './validateNumber';

/**
 * Update the value of the field and update the store value.
 *
 * @param {Object} obj                - An object containing all parameters.
 * @param {string} obj.id             - The id of the field.
 * @param {string|boolean} obj.label  - The name of the label, if there is one.
 * @param {string|number} obj.number  - The new number value.
 * @param {stirng|number} obj.current - The current value.
 * @param {sting|number} obj.max      - The maximum valid value.
 * @param {sting|number} obj.min      - The minimum valid value.
 *
 * @returns {number} Returns `obj.value` if its valid, else `obj.current`.
 */
export default function (obj) {
  const value = validateNumber(obj.number, obj.max, obj.min);

  const label = obj.label;
  const id = obj.id;

  if (value || value === 0) {
    if (obj.label) {
      store.commit('updateNumber', { id, label, value });
    } else {
      store.commit('updateRange', { id, value });
    }

    return value;
  }

  return obj.current;
}
