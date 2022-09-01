import React from "react";
import { Grid, Card, Typography, Button } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

const ChangeInPC = ({ indices }) => {
  //received index data as indices
  //loop through array and add all pe ce change
  let PE = 0;
  indices?.forEach((x) => {
    PE += x.PE?.changeinOpenInterest;
  });

  let CE = 0;
  indices?.forEach((x) => {
    CE += x.CE?.changeinOpenInterest;
  });
  return (
    <>
      <Grid item>
        <Card>
          <Typography color={"#40b0b2"}>
            <ArrowUpwardIcon />
            Change In PE OI <br />
            <Button color="success" variant="outlined">
              {PE}
            </Button>
          </Typography>

          <Typography color={"#e76d67"}>
            <ArrowDownwardIcon />
            Change In CE OI <br />
            <Button color="error" variant="outlined">
              {CE}
            </Button>
          </Typography>
        </Card>
      </Grid>
    </>
  );
};

export default ChangeInPC;
