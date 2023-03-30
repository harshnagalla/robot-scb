import React, { useState } from "react";
import { Button, Grid, TextField } from "@mui/material";
import RoboGrid from "@/components/RoboGrid";
import { Direction } from "@/types/robot";
import {
  getLeftDirection,
  getNextPosition,
  getRightDirection,
  isInBounds,
} from "@/utils/robot";

interface Position {
  x: number;
  y: number;
  direction: Direction;
}

const Robot = () => {
  const [position, setPosition] = useState<Position | null>({
    x: -1,
    y: -1,
    direction: Direction.NORTH,
  });
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const handlePlace = () => {
    const [xInput, yInput, directionInput] = input.split(" ");
    const x = parseInt(xInput, 10);
    const y = parseInt(yInput, 10);
    const validX = x >= -1 && x <= 1;
    const validY = y >= -1 && y <= 1;
    const direction = directionInput as Direction;
    const validDirection = ["NORTH", "EAST", "SOUTH", "WEST"].includes(
      direction
    );
    if (validX && validY && validDirection) {
      setPosition({ x, y, direction });
      setError("");
    } else {
      setError(
        'Invalid PLACE command. Please enter a valid command in the format for place "X Y Direction", where X and Y are integers between -1 and 1 and Direction is one of the values "NORTH", "EAST", "SOUTH", or "WEST".'
      );
    }
  };

  const handleMove = () => {
    if (position) {
      const { x, y, direction } = position;
      const newPosition = getNextPosition(x, y, direction);
      if (isInBounds(newPosition.x, newPosition.y)) {
        setPosition({ ...newPosition, direction });
        setError("");
      } else {
        setError(
          "Invalid MOVE command. The robot cannot move outside the 5x5 grid."
        );
      }
    }
  };

  const handleLeft = () => {
    if (position) {
      const { x, y, direction } = position;
      const newDirection = getLeftDirection(direction);
      setPosition({ x, y, direction: newDirection });
      setError("");
    }
  };

  const handleRight = () => {
    if (position) {
      const { x, y, direction } = position;
      const newDirection = getRightDirection(direction);
      setPosition({ x, y, direction: newDirection });
      setError("");
    }
  };

  const handleReport = () => {
    if (position) {
      const { x, y, direction } = position;
      setError("");
      alert(
        `The robot is currently at position ${x},${y} facing ${direction}.`
      );
    }
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  return (
    <Grid container spacing={2} style={{ marginTop: 16 }}>
      <Grid item xs={12}>
        <TextField
          label="Command"
          variant="outlined"
          size="small"
          value={input}
          onChange={handleInput}
          style={{ width: "100%" }}
        />
        {error && <span style={{ color: "red" }}>{error}</span>}
      </Grid>
      <Grid item xs={12} sm={6}>
        <Button
          variant="contained"
          color="primary"
          onClick={handlePlace}
          style={{ width: "100%" }}
        >
          PLACE
        </Button>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleMove}
          style={{ width: "100%" }}
          disabled={!position}
        >
          MOVE
        </Button>
      </Grid>
      <Grid item xs={6}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleLeft}
          style={{ width: "100%" }}
          disabled={!position}
        >
          Turn Robot Anti-Clockwise
        </Button>
      </Grid>
      <Grid item xs={6}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleRight}
          style={{ width: "100%" }}
          disabled={!position}
        >
          Turn Robot Clockwise
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleReport}
          style={{ width: "100%" }}
          disabled={!position}
        >
          REPORT
        </Button>
      </Grid>
      <Grid item xs={12}>
        <RoboGrid
          key={`${position?.x},${position?.y},${position?.direction}`}
          robotX={position?.x ?? 0}
          robotY={position?.y ?? 0}
          robotDirection={position?.direction || Direction.NORTH}
        />
      </Grid>
    </Grid>
  );
};

export default Robot;
