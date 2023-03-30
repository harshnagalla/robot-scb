import React from "react";
import { Grid, Paper } from "@mui/material";
import WestIcon from "@mui/icons-material/West";
import NorthIcon from "@mui/icons-material/North";
import SouthIcon from "@mui/icons-material/South";
import EastIcon from "@mui/icons-material/East";
import { Direction } from "@/types/robot";

interface GridProps {
  robotX: number;
  robotY: number;
  robotDirection: Direction;
}

const RoboGrid = ({ robotX, robotY, robotDirection }: GridProps) => {
  const size = 5;
  const center = Math.floor(size / 2);

  const rows = Array.from(Array(size).keys()).map((i) => i - center);
  const cols = Array.from(Array(size).keys()).map((i) => i - center);

  const renderCell = (x: number, y: number) => {
    const isRobot = x === robotX && y === robotY;

    const directionIcon =
      robotX === x && robotY === y
        ? {
            [Direction.NORTH]: <NorthIcon fontSize={"large"} />,
            [Direction.EAST]: <EastIcon fontSize={"large"} />,
            [Direction.SOUTH]: <SouthIcon fontSize={"large"} />,
            [Direction.WEST]: <WestIcon fontSize={"large"} />,
          }[robotDirection]
        : null;
    return (
      <Grid item key={`${x},${y}`} sx={{ width: "20%", height: "20%" }}>
        <Paper
          style={{
            width: "100%",
            height: "100px",
            backgroundColor: isRobot ? "#ff1744" : "#eeeeee",
            border: "1px solid #bdbdbd",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <div style={{ position: "absolute", top: 0, left: 0 }}>
            <span>X: {x}</span>
            <br />
            <span>Y: {y}</span>
          </div>
          {directionIcon}
        </Paper>
      </Grid>
    );
  };

  return (
    <Grid
      container
      spacing={0}
      sx={{
        width: "80%",
        height: "80%",
        margin: "auto",
        rowGap: 0,
        columnGap: 0,
      }}
    >
      {rows.map((x) => cols.map((y) => renderCell(x, y)))}
    </Grid>
  );
};

export default RoboGrid;
