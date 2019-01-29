import store from 'store';

export default function (id) {
  const active = store.state[id].active;

  if (active === undefined) {
    return true;
  }

  return active;
}
