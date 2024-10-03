export const getAverage = (data) => {
  let accAvgMonthly = [];
  let accAvgBiweekly = [];

  const [fy, fm, fd] = data.tg_growth_index[0].date.split("-");
  let accLastDate = `${fy}-${fm}`;
  let accLastMonthPart = fd > 15 ? 2 : 1;

  let avgMonthly = [];
  let avgBiweekly = [];
  data.tg_growth_index.forEach(({ date, value }, index) => {
    const [year, month, day] = date.split("-");
    if (accLastDate !== `${year}-${month}`) {
      // monthly average
      avgMonthly.push({ data: accLastDate, value: accAvgMonthly.reduce((acc, x) => acc + x, 0) / accAvgMonthly.length });
      accAvgMonthly = [];
      // biweekly average
      avgBiweekly.push({ data: `II ${accLastDate}`, value: accAvgBiweekly.reduce((acc, x) => acc + x, 0) / accAvgBiweekly.length });
      accAvgBiweekly = [];
      accLastMonthPart = 1;

      accLastDate = `${year}-${month}`;
    } else if (accLastMonthPart === 1 && day > 15) {
      avgBiweekly.push({ data: `I ${accLastDate}`, value: accAvgBiweekly.reduce((acc, x) => acc + x, 0) / accAvgBiweekly.length });
      accAvgBiweekly = [];
      accLastMonthPart = 2;
    }
    accAvgMonthly.push(value);
    accAvgBiweekly.push(value);

    if (index === data.tg_growth_index.length - 1) {
      avgMonthly.push({ data: accLastDate, value: accAvgMonthly.reduce((acc, x) => acc + x, 0) / accAvgMonthly.length });
      avgBiweekly.push({ data: `II ${accLastDate}`, value: accAvgBiweekly.reduce((acc, x) => acc + x, 0) / accAvgBiweekly.length });
    }
  });

  data["avgMonthly"] = avgMonthly;
  data["avgBiweekly"] = avgBiweekly;
};

export const transformDatas = (data) => {
  let blockchainValue = data.tokenGuardData.blockchain.tg_growth_index.map((item) => item.value);
  let blockchainAvgMonthly = data.tokenGuardData.blockchain.avgMonthly.map((item) => item.value);
  let blockchainAvgBiweekly = data.tokenGuardData.blockchain.avgBiweekly.map((item) => item.value);

  let cumulativeValue = [];
  let cumulativeAvgMonthly = [];
  let cumulativeAvgBiweekly = [];
  if (Object.keys(data.tokenGuardData.cumulative).length !== 0) {
    cumulativeValue = data.tokenGuardData.cumulative.tg_growth_index.map((item) => item.value);
    cumulativeAvgMonthly = data.tokenGuardData.cumulative.avgMonthly.map((item) => item.value);
    cumulativeAvgBiweekly = data.tokenGuardData.cumulative.avgBiweekly.map((item) => item.value);
  }

  let dates = data.tokenGuardData.blockchain.tg_growth_index.map((item) => item.date);
  let datesAvgMonthly = data.tokenGuardData.blockchain.avgMonthly.map((item) => item.data);
  let datesAvgBiweekly = data.tokenGuardData.blockchain.avgBiweekly.map((item) => item.data);

  return {
    tg_growth_index: { blockchainValue, cumulativeValue, dates },
    avgMonthly: { blockchainValue: blockchainAvgMonthly, cumulativeValue: cumulativeAvgMonthly, dates: datesAvgMonthly },
    avgBiweekly: { blockchainValue: blockchainAvgBiweekly, cumulativeValue: cumulativeAvgBiweekly, dates: datesAvgBiweekly },
  };
};
