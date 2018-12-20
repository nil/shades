import round from '../src/js/round';

describe('Round', () => {
  test('Min, max', () => {
    expect(round(19, 20, 51, 3)).toEqual(20);
    expect(round(52, 20, 51, 3)).toEqual(50);
  });

  test('Multiple of step, do not touch value', () => {
    expect(round(5, 0, 10, 5)).toEqual(5);
  });

  test('Multiple of step', () => {
    expect(round(10, 3, 12, 3)).toEqual(9);
  });

  test('Fraction', () => {
    expect(round(4.1, 0, 10, 1.5)).toEqual(4.5);
  });
});
