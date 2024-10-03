import { arbitrum, avalanche, ethereum, fantom, near, optimism, polygon, solana } from "./mock-data";

export const getDataObject = (blockchain, cumulativeBC, dateRange) => {
  const blockchainData = getData(blockchain, dateRange);
  const cumulativeData = cumulativeBC.length > 0 ? getCumulativeData(cumulativeBC, dateRange) : [];

  return {
    blockchain: { tg_growth_index: blockchainData },
    cumulative: cumulativeBC.length > 0 ? { tg_growth_index: cumulativeData } : {},
  };
};

const getData = (blockchain, dateRange) => {
  let data = [];
  switch (blockchain) {
    case "near":
      data = JSON.parse(JSON.stringify(near));
      break;
    case "ethereum":
      data = JSON.parse(JSON.stringify(ethereum));
      break;
    case "avalanche":
      data = JSON.parse(JSON.stringify(avalanche));
      break;
    case "polygon":
      data = JSON.parse(JSON.stringify(polygon));
      break;
    case "fantom":
      data = JSON.parse(JSON.stringify(fantom));
      break;
    case "solana":
      data = JSON.parse(JSON.stringify(solana));
      break;
    case "arbitrum":
      data = JSON.parse(JSON.stringify(arbitrum));
      break;
    case "optimism":
      data = JSON.parse(JSON.stringify(optimism));
      break;
  }

  if (dateRange === "3 months") {
    data = data.slice(-13);
  } else if (dateRange === "6 months") {
    data = data.slice(-27);
  }
  return data;
};

const getCumulativeData = (cumulativeBC, dateRange) => {
  let data = null;
  let dataToConcat = null;
  for (const chain of cumulativeBC) {
    if (data === null) {
      data = getData(chain, dateRange);
      continue;
    }
    dataToConcat = getData(chain, dateRange);
    data = concatData(data, dataToConcat);
  }

  data = data.map((ele) => {
    return {
      date: ele.date,
      value: ele.value / cumulativeBC.length,
    };
  });
  return data;
};

const concatData = (data, cumulativeData) => {
  for (let i = 0; i < data.length; i++) {
    data[i].value += cumulativeData[i].value;
  }
  return data;
};
