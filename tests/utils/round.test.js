import round from '../../src/js/round';

describe('Round', () => {
  test('Less than minimum value', () => {
    expect(round(3, 10, 20)).toEqual(10);
  });

  test('Greater than minimum value', () => {
    expect(round(53, 15, 45)).toEqual(45);
  });

  test('Between min and max', () => {
    expect(round(14, 2, 23)).toEqual(14);
  });

  test('Decimal value', () => {
    expect(round(16.3, 10, 20)).toEqual(16);
    expect(round(16.6, 10, 20)).toEqual(17);
  });

  test('Min or max values are not integers', () => {
    expect(() => {
      round(2, 1, 5.4);
    }).toThrow();

    expect(() => {
      round(52, 21.1, 100);
    }).toThrow();
  });
});
