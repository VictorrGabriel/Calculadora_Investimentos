function convertToMonthlyReturnrate(yearlyReturnRate) {
  return yearlyReturnRate ** (1 / 12);
}

export function generateReturnsArray(
  startingAmount = 0,
  timeHorizon = 0,
  timePeriod = "monthly",
  monthlycontribution = 0,
  returnRate = 0,
  returnTimeFrame = "monthly"
) {
  if (!timeHorizon || !startingAmount) {
    throw new Error(
      "Investimentos inicial e prazo devem ser prenchidos com valores positivos"
    );
  }

  const finalRetunRate =
    returnTimeFrame === "monthly"
      ? 1 + returnRate / 100
      : convertToMonthlyReturnrate(1 + returnRate / 100);

  const finalTimeHorizon =
    timePeriod === "monthly" ? timeHorizon : timeHorizon * 12;

  const referenceinvestmentsObject = {
    investedAmount: startingAmount,
    interestReturns: 0,
    totalInterestReturns: 0,
    month: 0,
    totalAmount: startingAmount,
  };

  const returnsArray = [referenceinvestmentsObject];

  for (
    let timeReference = 1;
    timeReference <= finalTimeHorizon;
    timeReference++
  ) {
    const totalAmount =
      returnsArray[timeReference - 1].totalAmount * finalRetunRate +
      monthlycontribution;

    const interestReturns =
      returnsArray[timeReference - 1].totalAmount * finalRetunRate;

    const investedAmount = startingAmount + monthlycontribution * timeReference;

    const totalInterestReturns = totalAmount - investedAmount;

    returnsArray.push({
      investedAmount,
      interestReturns,
      totalInterestReturns,
      month: timeReference,
      totalAmount,
    });
  }

  return returnsArray;
}
