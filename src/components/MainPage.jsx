"use client";
import React, { useEffect } from "react";
import { Chart } from "./Chart";
import { Box } from "@mui/system";
import { Divider, Typography } from "@mui/material";
import { Backdrop, CircularProgress } from "@mui/material";

function getAverage(data) {
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
}

function transformDatas(data) {
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
}

export const MainPage = () => {
  const [basicTimelineData, setBasicTimelineData] = React.useState([]);

  const [loading, setLoading] = React.useState(true);

  const [blockchain, setBlockchain] = React.useState("near");
  const [cumulativeBC, setCumulativeBC] = React.useState(["fantom"]);

  useEffect(() => {
    const fetchData = async () => {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");

      const body = JSON.stringify({
        chainName: blockchain, //"near",
        period: "last year",
        metric: "tg_growth_index",
        compareWith: cumulativeBC, //["fantom"],
      });

      const requestOptions = {
        method: "POST",
        headers: headers,
        body: body,
        redirect: "follow",
      };

      await fetch("/api/basic-timeline-data", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          getAverage(data.tokenGuardData.blockchain);
          if (Object.keys(data.tokenGuardData.cumulative).length !== 0) getAverage(data.tokenGuardData.cumulative);

          transformDatas(data);
          console.log(transformDatas(data));

          setBasicTimelineData(transformDatas(data));
          setLoading(false);
        })
        // .then((result) => console.log(result))
        .catch((error) => console.error(error));
    };

    fetchData();
  }, [blockchain, cumulativeBC]);

  return (
    <div className="flex h-screen p-4">
      <Box className="bg-white/30 backdrop-blur-lg w-full h-full px-10 py-5 rounded-lg">
        <Box display={"flex"} alignItems={"center"}>
          <img src="/logo.svg" alt="logo" className="w-20 h-20 mb-5 mr-5" />
          <h1 className="mb-3 text-5xl ">Blockchain Growth Index</h1>
        </Box>
        <Divider className="mb-6" />
        {loading ? (
          <Backdrop
            sx={{
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(255, 255, 255, 1)",
              borderRadius: 3,
              opacity: 1,
              zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
            open={loading ? true : false}
            // open={true}
          >
            <CircularProgress color="primary" />
          </Backdrop>
        ) : (
          <Chart
            basicTimelineData={basicTimelineData}
            blockchain={blockchain}
            cumulativeBC={cumulativeBC}
            setBlockchain={setBlockchain}
            setCumulativeBC={setCumulativeBC}
          />
        )}
      </Box>
    </div>
  );
};
