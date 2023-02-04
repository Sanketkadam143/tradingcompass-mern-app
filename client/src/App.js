import React from "react";
import Router from "./routes";
import theme from "./utils/theme";
import Notify from "./utils/Notify";
import { ThemeProvider } from "@mui/material";
import useSocketConnection from "./API/socket";

const App = () => {
  useSocketConnection();

  return (
    <ThemeProvider theme={theme}>   
        <Router />
        <Notify/>
    </ThemeProvider>
  );
};

export default App;
