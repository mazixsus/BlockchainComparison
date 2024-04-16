import React, { useEffect } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { Box } from "@mui/system";
import { Card, Slider } from "@mui/material";
import { Select, MenuItem, Typography } from "@mui/material";
import { Chip } from "@mui/material";
import { OutlinedInput } from "@mui/material";
import { InputLabel } from "@mui/material";
import { FormControl } from "@mui/material";
import { Paper } from "@mui/material";

const blockchains = [
  { key: "near", name: "NEAR Protocol" },
  { key: "fantom", name: "Fantom" },
  { key: "avalanche", name: "Avalanche" },
  { key: "solana", name: "Solana" },
  { key: "arbitrum", name: "Arbitrum" },
  { key: "bsc", name: "Binance Smart Chain" },
  { key: "ethereum", name: "Ethereum" },
  { key: "polygon", name: "Polygon" },
  { key: "optimism", name: "Optimism" },
  // {key: "alephzero", name: "Aleph Zero"},
];

export const Chart = ({ blockChainData, cumulativeData, blockchain, cumulativeBC, setBlockchain, setCumulativeBC }) => {
  const dates = blockChainData.tg_growth_index.map((item) => item.date);
  const values = blockChainData.tg_growth_index.map((item) => item.value);
  const cumulative = cumulativeData.tg_growth_index.map((item) => item.value);

  const [value, setValue] = React.useState([0, dates.length - 1]);
  const minDistance = 10;

  const handleChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 100 - minDistance);
        setValue([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setValue([clamped - minDistance, clamped]);
      }
    } else {
      setValue(newValue);
    }
  };

  return (
    <Box>
      <Box display={"flex"} alignItems={"center"} my={1}>
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

      <Card sx={{ border: 1, borderRadius: 2, p: 5, borderColor: "grey", background: "rgba(255, 255, 255, 0.3)" }}>
        <LineChart
          xAxis={[
            {
              scaleType: "point",
              data: dates.slice(value[0], value[1] + 1),
              // tickLabelStyle: {
              //   angle: 45,
              //   textAnchor: "start",
              //   fontSize: 12,
              // },
            },
          ]}
          series={[
            {
              data: values.slice(value[0], value[1] + 1),
              label: "Growth Index",
            },
            {
              data: cumulative.slice(value[0], value[1] + 1),
              label: "Cumulative Growth Index",
            },
          ]}
          fullWidth
          height={300}
          grid={{ vertical: true, horizontal: true }}
        ></LineChart>
        <Box px={5} mt={5}>
          <Slider
            value={value}
            onChange={handleChange}
            min={0}
            max={dates.length - 1}
            marks={dates.map((date, index) => {
              return { value: index, label: date };
            })}
            getAriaValueText={(value) => dates[value]}
            valueLabelFormat={(value) => dates[value]}
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
