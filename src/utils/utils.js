export function amount(a) {
  a = a + '';
  a = a.split('.');

  if (a[1]) {
    if (a[1].length === 1) {
      a[1] = a[1] + '0';
    }

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
