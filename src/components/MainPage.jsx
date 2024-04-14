'use client'
import React, { useEffect } from "react";
import { Chart } from "./Chart";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";

export const MainPage = () => {
  const [blockchainData, setBlockchainData] = React.useState([]);
  const [cumulativeData, setCumulativeData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        chainName: "near",
        period: "last year",
        metric: "tg_growth_index",
        compareWith: ["fantom"],
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      await fetch("http://localhost:5000/grow-index/", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          console.log(data.blockchain);
          setBlockchainData(data.blockchain);
          setCumulativeData(data.cumulative);
          setLoading(false);
        })
        // .then((result) => console.log(result))
        .catch((error) => console.error(error));
    };

    fetchData();
  }, []);

  return (
    <Box sx={{px: 10}}>
      <Typography variant="h3" fontFamily={"Roboto"}>Blockchain Grow Index</Typography>
      {loading ? <p>Loading...</p> : <Chart blockChainData={blockchainData} cumulativeData={cumulativeData} />}
    </Box>
  );
};
