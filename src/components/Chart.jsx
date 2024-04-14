import React, { useEffect } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { Box } from "@mui/system";
import { Slider } from "@mui/material";

export const Chart = ({ blockChainData, cumulativeData }) => {
  const dates = blockChainData.tg_growth_index.map((item) => item.date);
  const values = blockChainData.tg_growth_index.map((item) => item.value);
  const cumulative = cumulativeData.tg_growth_index.map((item) => item.value);

  //console.log(dates);
  //console.log(values);

  return (
    <Box sx={{ border: 1, borderRadius: 2, p: 5 }}>
      <LineChart
        xAxis={[
          {
            scaleType: "point",
            data: dates,
            // tickLabelStyle: {
            //   angle: 45,
            //   textAnchor: "start",
            //   fontSize: 12,
            // },          
          },
        ]}
        series={[
          {
            data: values,
            label: "Growth Index",
          },
          {
            data: cumulative,
            label: "Cumulative Growth Index",
          },
        ]}
        fullWidth
        height={300}
      ></LineChart>
      <Box px={5} mt={5}>
        <Slider
          // value={value}
          // onChange={handleChange}
          // valueLabelDisplay="auto"
          min={0}
          max={dates.length}
          getAriaValueText={(value) => dates[value]}
          valueLabelFormat={(value) => dates[value]}
          valueLabelDisplay="auto"
          sx={{ mt: 2 }}
          disableSwap
        />
      </Box>
    </Box>
  );
};
