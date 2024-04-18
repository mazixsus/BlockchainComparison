
import React from "react";
import { Box, Typography } from "@mui/material";
import { Card } from "@mui/material";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";


export const GaugeCharts = ({chartData}) => {

    const lastGrowthIndex = chartData.blockchainValue.slice(-1);
    const meanGrowthIndex = chartData.blockchainValue.reduce((acc, x) => acc + x, 0) / chartData.blockchainValue.length;
    const standardDeviation = Math.sqrt(chartData.blockchainValue.map(x => Math.pow(x - meanGrowthIndex, 2)).reduce((a, b) => a + b) / chartData.blockchainValue.length);

    return (
        <Card
            sx={{
              display: "flex",
              justifyContent: "space-around",
              border: 1,
              borderRadius: 2,
              p: 3,
              borderColor: "grey",
              background: "rgba(255, 255, 255, 0.3)",
            }}
          >
            {/* last growth index value */}
            <Box display={"flex"}>
              <Box>
                <Box fullWidth display={"flex"}>
                  <Gauge
                    width={100}
                    height={100}
                    value={lastGrowthIndex}
                    sx={(theme) => ({
                      [`& .${gaugeClasses.valueArc}`]: {
                        fill: "#ee285b",
                        ...(lastGrowthIndex > 20 ? { fill: "#ff640c" } : {}),
                        ...(lastGrowthIndex > 40 ? { fill: "#fdb62b" } : {}),
                        ...(lastGrowthIndex > 60 ? { fill: "#4870bd" } : {}),
                        ...(lastGrowthIndex > 80 ? { fill: "#42ac8a" } : {}),
                      },
                      // [`& .${gaugeClasses.referenceArc}`]: {
                      //   fill: theme.palette.text.disabled,
                      // },
                    })}
                  />
                </Box>
                <Typography>Last Growth Index</Typography>
              </Box>
              <Box display={"flex"} flexDirection={"column"} ml={3} justifyContent={"center"}>
                <Box display={"flex"} >
                  <FiberManualRecordIcon fontSize="small" sx={{ color: "#ee285b" }} />
                  <Typography fontSize={"small"} textAlign={"center"}>0-20</Typography>
                </Box>
                <Box display={"flex"} >
                  <FiberManualRecordIcon fontSize="small" sx={{ color: "#ff640c" }} />
                  <Typography fontSize={"small"} textAlign={"center"}>20-40</Typography>
                </Box>
                <Box display={"flex"} >
                  <FiberManualRecordIcon fontSize="small" sx={{ color: "#fdb62b" }} />
                  <Typography fontSize={"small"} textAlign={"center"}>40-60</Typography>
                </Box>
                <Box display={"flex"} >
                  <FiberManualRecordIcon fontSize="small" sx={{ color: "#4870bd" }} />
                  <Typography fontSize={"small"} textAlign={"center"}>60-80</Typography>
                </Box>
                <Box display={"flex"} >
                  <FiberManualRecordIcon fontSize="small" sx={{ color: "#42ac8a" }} />
                  <Typography fontSize={"small"} textAlign={"center"}>80-100</Typography>
                </Box>
              </Box>
            </Box>

            {/* mean value */}
            <Box display={"flex"}>
              <Box>
                <Box fullWidth display={"flex"}>
                  <Gauge
                    width={100}
                    height={100}
                    value={meanGrowthIndex}
                    sx={(value, theme) => ({
                      [`& .${gaugeClasses.valueArc}`]: {
                        fill: "#ee285b",
                        ...(meanGrowthIndex > 20 ? { fill: "#ff640c" } : {}),
                        ...(meanGrowthIndex > 40 ? { fill: "#fdb62b" } : {}),
                        ...(meanGrowthIndex > 60 ? { fill: "#4870bd" } : {}),
                        ...(meanGrowthIndex > 80 ? { fill: "#42ac8a" } : {}),
                      },
                      // [`& .${gaugeClasses.referenceArc}`]: {
                      //   fill: theme.palette.text.disabled,
                      // },
                    })}
                  />
                </Box>
                <Typography>Mean Growth Index</Typography>
              </Box>
              <Box display={"flex"} flexDirection={"column"} ml={3} justifyContent={"center"}>
                <Box display={"flex"} >
                  <FiberManualRecordIcon fontSize="small" sx={{ color: "#ee285b" }} />
                  <Typography fontSize={"small"} textAlign={"center"}>0-20</Typography>
                </Box>
                <Box display={"flex"} >
                  <FiberManualRecordIcon fontSize="small" sx={{ color: "#ff640c" }} />
                  <Typography fontSize={"small"} textAlign={"center"}>20-40</Typography>
                </Box>
                <Box display={"flex"} >
                  <FiberManualRecordIcon fontSize="small" sx={{ color: "#fdb62b" }} />
                  <Typography fontSize={"small"} textAlign={"center"}>40-60</Typography>
                </Box>
                <Box display={"flex"} >
                  <FiberManualRecordIcon fontSize="small" sx={{ color: "#4870bd" }} />
                  <Typography fontSize={"small"} textAlign={"center"}>60-80</Typography>
                </Box>
                <Box display={"flex"} >
                  <FiberManualRecordIcon fontSize="small" sx={{ color: "#42ac8a" }} />
                  <Typography fontSize={"small"} textAlign={"center"}>80-100</Typography>
                </Box>
              </Box>
            </Box>

            {/* standard deviation  */}
            <Box display={"flex"}>
              <Box>
                <Box fullWidth display={"flex"}>
                  <Gauge
                    width={100}
                    height={100}
                    valueMax={20}
                    value={standardDeviation}
                    sx={{
                      [`& .${gaugeClasses.valueArc}`]: {
                        fill: "#ee285b",
                        ...(standardDeviation < 15 ? { fill: "#fdb62b" } : {}),
                        ...(standardDeviation < 10 ? { fill: "#4870bd" } : {}),
                        ...(standardDeviation < 5 ? { fill: "#42ac8a" } : {}),
                      },
                    }}
                  />
                </Box>
                <Typography>Standard Deviation</Typography>
              </Box>
              <Box display={"flex"} flexDirection={"column"} ml={3} justifyContent={"center"}>
                <Box display={"flex"} >
                  <FiberManualRecordIcon fontSize="small" sx={{ color: "#ee285b" }} />
                  <Typography fontSize={"small"} textAlign={"center"}>15-20</Typography>
                </Box>
                <Box display={"flex"} >
                  <FiberManualRecordIcon fontSize="small" sx={{ color: "#fdb62b" }} />
                  <Typography fontSize={"small"} textAlign={"center"}>10-15</Typography>
                </Box>
                <Box display={"flex"} >
                  <FiberManualRecordIcon fontSize="small" sx={{ color: "#4870bd" }} />
                  <Typography fontSize={"small"} textAlign={"center"}>5-10</Typography>
                </Box>
                <Box display={"flex"} >
                  <FiberManualRecordIcon fontSize="small" sx={{ color: "#42ac8a" }} />
                  <Typography fontSize={"small"} textAlign={"center"}>0-5</Typography>
                </Box>
              </Box>
            </Box>
          </Card>
    );
}
