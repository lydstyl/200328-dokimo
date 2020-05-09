export const paymentsSumBeforeDocDate = (essentials) => {
  const { payments, docDateJS } = essentials;

  // const array1 = [1, 2, 3, 4];
  // const reducer = (accumulator, currentValue) => accumulator + currentValue;

  // // 5 + 1 + 2 + 3 + 4
  // console.log(array1.reduce(reducer, 5));
  // // expected output: 15

  const reducer = (accumulator, currentValue) => {
    const { paymentDateJS, amount } = currentValue;

    if (paymentDateJS <= docDateJS) {
      return accumulator + amount;
    } else {
      return accumulator;
    }
  };

  const paymentsSum = payments.reduce(reducer, 0);

  return paymentsSum;
};
