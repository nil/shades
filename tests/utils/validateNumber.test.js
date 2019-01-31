import validateNumber from 'js/validateNumber';

const max = {
  max: 200
};

const min = {
  min: 10,
  max: 50
};

describe('validateNumber', () => {
  test('Empty string', () => {
    expect(validateNumber('')).toBeFalsy();
  });
  test('Zero as number', () => {
    expect(validateNumber(0)).toBe(0);
  });
  test('Zero as string', () => {
    expect(validateNumber('0')).toBe(0);
  });
  test('Number', () => {
    expect(validateNumber(123)).toBe(123);
  });
  test('String', () => {
    expect(validateNumber('123')).toBe(123);
  });
  test('Decimal number', () => {
    expect(validateNumber('12.1')).toBe(12);
  });
  test('Decimal number, decimal greater than 5', () => {
    expect(validateNumber('12.7')).toBe(13);
  });
  test('Negative number', () => {
    expect(validateNumber('-20')).toBe(0);
  });
  test('Letter', () => {
    expect(validateNumber('a')).toBeFalsy();
  });
  test('Numbers and letters', () => {
    expect(validateNumber('12a')).toBeFalsy();
  });
  test('Maximum value', () => {
    expect(validateNumber('200', max)).toBe(200);
  });
  test('Greater than maximum value', () => {
    expect(validateNumber('222', max)).toBe(200);
  });
  test('Minimum value', () => {
    expect(validateNumber('10', min)).toBe(10);
  });
  test('Less than minimum value', () => {
    expect(validateNumber('5', min)).toBe(10);
  });
  test('Math operation', () => {
    expect(validateNumber('-1+3')).toBe(2);
  });
  test('Math operation with negative result', () => {
    expect(validateNumber('-1-3')).toBe(0);
  });
  test('Complex math operation', () => {
    expect(validateNumber('1+2/2+6*8-20')).toBe(30);
  });
  test('Parenthesis with maximum value', () => {
    expect(validateNumber('(((1+2)*9)+3)/(2+4)*100', max)).toBe(200);
  });
});
