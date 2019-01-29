import store from 'store';

/**
 * Checks if section with name `id` is active
 *
 * @param {string} id - The name of the section
 *
 * @returns {boolean} Returns `true` if section is active or undefined, else `false`.
 */
export default function (id) {
  const active = store.state[id].active;

  if (active === undefined) {
    return true;
  }

  return active;
}
