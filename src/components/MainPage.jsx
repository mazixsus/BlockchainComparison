"use client";
import React, { useEffect } from "react";
import { Chart } from "./Chart";
import { Box } from "@mui/system";
import { Divider, Typography } from "@mui/material";
import { Backdrop, CircularProgress } from "@mui/material";

export const MainPage = () => {
  const [blockchainData, setBlockchainData] = React.useState([]);
  const [cumulativeData, setCumulativeData] = React.useState([]);
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
          console.log(data.tokenGuardData.blockchain);
          setBlockchainData(data.tokenGuardData.blockchain);
          setCumulativeData(data.tokenGuardData.cumulative);
          setLoading(false);
        })
        // .then((result) => console.log(result))
        .catch((error) => console.error(error));
    };

    fetchData();
  }, [blockchain, cumulativeBC]);

  return (
    <div class="flex h-screen p-4">
      <Box className="bg-white/30 backdrop-blur-lg w-full h-full px-10 py-5 rounded-lg">
        <h1 class="mb-3 text-5xl ">Blockchain Grow Index</h1>
        <Divider className="mb-6"/>
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
            blockChainData={blockchainData}
            cumulativeData={cumulativeData}
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
