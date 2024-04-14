"use client";
import React, { useEffect } from "react";
import { Chart } from "./Chart";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { Backdrop, CircularProgress } from "@mui/material";

export const MainPage = () => {
  const [blockchainData, setBlockchainData] = React.useState([]);
  const [cumulativeData, setCumulativeData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");

      const body = JSON.stringify({
        chainName: "near",
        period: "last year",
        metric: "tg_growth_index",
        compareWith: ["fantom"],
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
  }, []);

  return (
    <Box sx={{ px: 10 }}>
      <Typography variant="h3" fontFamily={"Roboto"}>
        Blockchain Grow Index
      </Typography>
      {loading ? (
        <Backdrop
          sx={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 1)",
            opacity: 1,
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
          open={loading ? true : false}
          // open={true}
        >
          <CircularProgress color="primary" />
        </Backdrop>
      ) : (
        <Chart blockChainData={blockchainData} cumulativeData={cumulativeData} />
      )}
    </Box>
  );
};
