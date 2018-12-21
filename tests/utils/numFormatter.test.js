import numFormatter from '../../src/js/numFormatter';

describe('numFormatter', () => {
  test('Empty string', () => {
    expect(numFormatter('')).toBeFalsy();
  });
  test('Zero as number', () => {
    expect(numFormatter(0)).toBe(0);
  });
  test('Zero as string', () => {
    expect(numFormatter('0')).toBe(0);
  });
  test('Number', () => {
    expect(numFormatter(123)).toBe(123);
  });
  test('String', () => {
    expect(numFormatter('123')).toBe(123);
  });
  test('Decimal number', () => {
    expect(numFormatter('12.1')).toBe(12);
  });
  test('Decimal number, decimal greater than 5', () => {
    expect(numFormatter('12.7')).toBe(13);
  });
  test('Negative number', () => {
    expect(numFormatter('-20')).toBe(0);
  });
  test('Letter', () => {
    expect(numFormatter('a')).toBeFalsy();
  });
  test('Numbers and letters', () => {
    expect(numFormatter('12a')).toBeFalsy();
  });
  test('Maximum value', () => {
    expect(numFormatter('200', '200')).toBe(200);
  });
  test('Greater than maximum value', () => {
    expect(numFormatter('222', '200')).toBe(200);
  });
  test('Math operation', () => {
    expect(numFormatter('-1+3')).toBe(2);
  });
  test('Math operation with negative result', () => {
    expect(numFormatter('-1-3')).toBe(0);
  });
  test('Complex math operation', () => {
    expect(numFormatter('1+2/2+6*8-20')).toBe(30);
  });
});
