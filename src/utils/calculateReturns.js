export const calculateMonthlyReturns = (
  investment,
  interest,
  years,
  inflationRate
) => {
  const monthlyRate = interest / 100 / 12;
  const inflationMonthlyRate = inflationRate / 100 / 12;
  const monthlyReturns = [];
  const inflationAdjustedReturns = [];

  for (let i = 0; i < years * 12; i++) {
    const nominalReturn =
      investment * Math.pow(1 + monthlyRate, i + 1) - investment;
    const inflationAdjustedReturn =
      (investment * Math.pow(1 + monthlyRate, i + 1) - investment) /
      Math.pow(1 + inflationMonthlyRate, i + 1);

    monthlyReturns.push(nominalReturn);

    inflationAdjustedReturns.push(inflationAdjustedReturn);
  }

  return { monthlyReturns, inflationAdjustedReturns };
};
