export const repaymentCalculator = (x: number, y: number, z: number) => {
  const i = y / 100 / 12;
  return Math.ceil((x * i * (1 + i) ** z) / ((1 + i) ** z - 1));
};

const paymentAmount = (rate: number, months: number, presentValue: number) => {
  if (rate == 0) return -presentValue / months;
  const presentValueif = Math.pow(1 + rate, months);
  let pmt = (rate / (presentValueif - 1)) * -(presentValue * presentValueif);
  return pmt;
};

const interestPortionAmount = (
  presentValue: number,
  pmt: number,
  rate: number,
  period: number
) => {
  let tmp = Math.pow(1 + rate, period);
  return 0 - (presentValue * tmp * rate + pmt * (tmp - 1));
};

// https://formula.github.io/formula/docs/code/src/ipmt
export const paymentPrincipalAmount = (arg: {
  rate: number;
  period: number;
  months: number;
  presentValue: number;
}) => {
  if (arg.period < 1 || arg.period >= arg.months + 1) return 0;

  const pmtRes = paymentAmount(arg.rate, arg.months, -arg.presentValue);
  const ipmtRes = interestPortionAmount(
    -arg.presentValue,
    pmtRes,
    arg.rate,
    arg.period - 1
  );
  return pmtRes - ipmtRes;
};
