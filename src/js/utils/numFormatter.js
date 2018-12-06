const math = require('string-math');

module.exports = function (val, maximum = 99999) {
  // Turn value into a string
  let number = String(val);

  // See if it contains any of the invalid characters
  const match = number.match(/([^\d,.+\-*/\u00D7\u00F7]).*/g);

  // Turn maximum into a number
  const max = Number(maximum);

  if (number.length && !match) {
    // Do math operations
    number = math(number);

    // Smaller than 0 - return 0
    if (number <= 0) {
      return 0;
    }

    // Greater than maximum - return false
    if (number > max) {
      return false;
    }

    // Else - return number without decimals
    return Number(number.toFixed(0));
  }

  return false;
};
