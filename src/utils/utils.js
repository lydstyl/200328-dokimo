export function amount(a) {
  // convert to string exemple 12.56 --> '12.56'
  a = a + '';
  a = a.split('.');

  if (a[1]) {
    // fix long decimal exemple 8.96000000000036 to 8.96
    if (a[1].length > 2) {
      a[1] = a[1].split(''); // array with for exemple ['9', '6', '0',... , '3', '6']

      a[1] = [a[1][0], a[1][1]].join('');
    }

    // if only 1 decimal add a 0 ex 32.1 --> 32.10
    if (a[1].length === 1) {
      a[1] = a[1] + '0';
    }

    // if something like 1234.35 add a space --> 1 234.35
    if (a[0].length > 3) {
      let left = a[0];

      left.split('');

      a[0] = left;
    }
  } else {
    return a.join('') + ',00';
  }

  a = a.join(',');

  return a;
}
