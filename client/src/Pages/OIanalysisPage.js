import React from "react";
import { Grid, Card } from "@mui/material";
import OIchange from "../components/Charts/OIchange";
import OverallOI from "../components/Charts/OverallOI";
import { useStateContext } from "../Contexts/ContextProvider";

const OIanalysisPage = () => {
  const { NiftyData } = useStateContext();

  return (
    <>
      <Grid item>
        <Card>
          <OIchange indices={NiftyData} />
        </Card>
      </Grid>
      <Grid item>
        <Card>
          <OverallOI indices={NiftyData} />
        </Card>
      </Grid>
    </>
  );
};

export default OIanalysisPage;
