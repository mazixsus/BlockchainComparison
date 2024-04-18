import React, { use, useEffect } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { Box } from "@mui/system";
import { Card, Hidden, Slider } from "@mui/material";
import { Select, MenuItem, Typography } from "@mui/material";
import { Chip } from "@mui/material";
import { OutlinedInput } from "@mui/material";
import { InputLabel } from "@mui/material";
import { FormControl } from "@mui/material";
import { Paper } from "@mui/material";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import { Grid } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { GaugeCharts } from "./GaugeCharts";

const blockchains = [
  { key: "near", name: "NEAR Protocol" },
  { key: "fantom", name: "Fantom" },
  { key: "avalanche", name: "Avalanche" },
  { key: "solana", name: "Solana" },
  { key: "arbitrum", name: "Arbitrum" },
  // { key: "bsc", name: "Binance Smart Chain" },
  { key: "ethereum", name: "Ethereum" },
  { key: "polygon", name: "Polygon" },
  { key: "optimism", name: "Optimism" },
  // {key: "alephzero", name: "Aleph Zero"},
];

export const Chart = ({ basicTimelineData, blockchain, cumulativeBC, dateRange, setBlockchain, setCumulativeBC, setDateRange }) => {
  const [chartData, setChartData] = React.useState(basicTimelineData.tg_growth_index);

  const [sliderValue, setSliderValue] = React.useState([0, basicTimelineData.tg_growth_index.dates.length - 1]);
  const minDistance = 10;

  const [granularity, setGranularity] = React.useState("week");

  useEffect(() => {
    setChartData(basicTimelineData.tg_growth_index);
    setSliderValue([0, chartData.dates.length - 1]);
    setGranularity("week");
  }, [basicTimelineData]);

  useEffect(() => {
    setSliderValue([0, chartData.dates.length - 1]);
  }, [chartData]);

  const handleChangeGranularity = (event) => {
    setGranularity(event.target.value);
    if (event.target.value === "week") {
      setChartData(basicTimelineData.tg_growth_index);
    } else if (event.target.value === "two_weeks") {
      setChartData(basicTimelineData.avgBiweekly);
    } else if (event.target.value === "four_weeks") {
      setChartData(basicTimelineData.avgMonthly);
    }
  };

  const handleChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], chartData.dates.length - 1 - minDistance);
        setSliderValue([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setSliderValue([clamped - minDistance, clamped]);
      }
    } else {
      setSliderValue(newValue);
    }
  };

  return (
    <Box>
      <Grid container spacing={5} mb={3}>
        <Grid item lg={12} xl={6}>
          <Box display={"flex"} alignItems={"center"} my={2}>
            <Typography mr={1}>Blockchain:</Typography>
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel id="blockchain-lebel" size="small">
                Select Blockchain
              </InputLabel>
              <Select
                type="text"
                size="small"
                labelId="blockchain-lebel"
                sx={{ mr: 1, background: "rgba(255, 255, 255, 0.3)" }}
                value={blockchain}
                input={<OutlinedInput label="Add To Comapare" sx={{ background: "rgba(255, 255, 255, 0.3)" }} />}
                onChange={(e) => setBlockchain(e.target.value)}
              >
                {blockchains.map((blockchain) => {
                  return (
                    <MenuItem key={blockchain.key} value={blockchain.key}>
                      {blockchain.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <Typography mr={1}>Compare With:</Typography>
            <FormControl sx={{ minWidth: 300 }}>
              <InputLabel id="compare-with-lebel" size="small">
                Add to comapare
              </InputLabel>
              <Select
                labelId="compare-with-lebel"
                size="small"
                value={cumulativeBC}
                onChange={(e) => setCumulativeBC(e.target.value)}
                multiple
                sx={{ background: "rgba(255, 255, 255, 0.3)" }}
                input={<OutlinedInput label="Add To Comapare" />}
                MenuProps={{
                  anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "left",
                  },
                  transformOrigin: {
                    vertical: "top",
                    horizontal: "left",
                  },
                  // getContentAnchorEl: null
                }}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} size="small" label={blockchains.find((blockchain) => blockchain.key == value).name} />
                    ))}
                  </Box>
                )}
              >
                {blockchains.map((blockchain) => {
                  return (
                    <MenuItem key={blockchain.key} value={blockchain.key}>
                      {blockchain.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
          <Box display={"flex"} alignItems={"center"} my={2}>
            <Typography mr={1}>Granularity:</Typography>
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel id="granularity-lebel" size="small">
                Choose Granularity
              </InputLabel>
              <Select
                type="text"
                size="small"
                labelId="granularity-lebel"
                sx={{ mr: 1, background: "rgba(255, 255, 255, 0.3)" }}
                value={granularity}
                input={<OutlinedInput label="Choose Granularity" sx={{ background: "rgba(255, 255, 255, 0.3)" }} />}
                onChange={handleChangeGranularity}
              >
                <MenuItem value="week">Week</MenuItem>
                <MenuItem value="two_weeks">Two Weeks</MenuItem>
                <MenuItem value="four_weeks">Four Weeks</MenuItem>
              </Select>
            </FormControl>
            <Typography mr={1}>Date Range:</Typography>
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel id="date-range-lebel" size="small">
                Choose Date Range
              </InputLabel>
              <Select
                type="text"
                size="small"
                labelId="date-range-lebel"
                sx={{ mr: 1, background: "rgba(255, 255, 255, 0.3)" }}
                value={dateRange}
                input={<OutlinedInput label="Choose Date Range" sx={{ background: "rgba(255, 255, 255, 0.3)" }} />}
                onChange={(e) => setDateRange(e.target.value)}
              >
                <MenuItem value="last year">Last Year</MenuItem>
                <MenuItem value="6 months">Last 6 Months</MenuItem>
                <MenuItem value="3 months">Last 3 Months</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Grid>
        <Grid item sm={12} md={12} lg={12} xl={6}>
          <GaugeCharts chartData={chartData} />
        </Grid>
      </Grid>

      <Card sx={{ border: 1, borderRadius: 2, p: 5, borderColor: "grey", background: "rgba(255, 255, 255, 0.3)" }}>
        <LineChart
          xAxis={[
            {
              scaleType: "point",
              data: chartData.dates.slice(sliderValue[0], sliderValue[1] + 1),
            },
          ]}
          series={[
            {
              data: chartData.blockchainValue.slice(sliderValue[0], sliderValue[1] + 1),
              label: "Growth Index",
            },
            {
              data: chartData.cumulativeValue.slice(sliderValue[0], sliderValue[1] + 1),
              ...(chartData.cumulativeValue.length > 0 ? { label: "Cumulative Growth Index" } : {}),
            },
          ]}
          fullWidth
          height={300}
          grid={{ vertical: true, horizontal: true }}
        />
        <Box px={5} mt={5}>
          <Slider
            value={sliderValue}
            onChange={handleChange}
            min={0}
            max={chartData.dates.length - 1}
            marks={chartData.dates.map((date, index) => {
              return { value: index, label: date };
            })}
            getAriaValueText={(value) => chartData.dates[value]}
            valueLabelFormat={(value) => chartData.dates[value]}
            valueLabelDisplay="on"
            sx={{
              mt: 2,
              "& .MuiSlider-markLabel": {
                transform: "rotate(45deg)",
                marginTop: "10px",
                // textAnchor: "end",
              },
            }}
            disableSwap
          />
        </Box>
      </Card>
    </Box>
  );
};
