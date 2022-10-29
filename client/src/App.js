import React from 'react'
import Imports from './Imports'
import theme from "./utils/theme";
import { ThemeProvider } from "@mui/material";
import { SnackbarProvider } from 'notistack';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
    <SnackbarProvider maxSnack={3} autoHideDuration={6000}>
      <Imports/>
      </SnackbarProvider>
      </ThemeProvider>
  )
}

export default App
