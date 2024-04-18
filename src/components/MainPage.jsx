"use client";
import React, { useEffect } from "react";
import { Chart } from "./Chart";
import { Box } from "@mui/system";
import { Divider, Typography } from "@mui/material";
import { Backdrop, CircularProgress } from "@mui/material";
import { getAverage, transformDatas } from "../utils/DataHelper";

export const MainPage = () => {
  const [basicTimelineData, setBasicTimelineData] = React.useState([]);

  const [loading, setLoading] = React.useState(true);

  const [blockchain, setBlockchain] = React.useState("near");
  const [cumulativeBC, setCumulativeBC] = React.useState(["fantom"]);
  const [dateRange, setDateRange] = React.useState("last year");

  useEffect(() => {
    const fetchData = async () => {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");

      const body = JSON.stringify({
        chainName: blockchain, //"near",
        period: dateRange,//"3 months",
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
  }, [blockchain, cumulativeBC, dateRange]);

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
            dateRange={dateRange}
            
            setBlockchain={setBlockchain}
            setCumulativeBC={setCumulativeBC}
            setDateRange={setDateRange}
          />
        )}
      </Box>
    </div>
  );
};
