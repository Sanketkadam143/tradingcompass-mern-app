import React from "react";
import Imports from "./Imports";
import theme from "./utils/theme";
import { ThemeProvider } from "@mui/material";
import { SnackbarProvider, useSnackbar } from "notistack";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { IconButton } from "@mui/material";

const App = () => {
  function SnackbarCloseButton({ snackbarKey }) {
    const { closeSnackbar } = useSnackbar();

    return (
      <IconButton onClick={() => closeSnackbar(snackbarKey)}>
        <CloseRoundedIcon />
      </IconButton>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        dense
        maxSnack={1}
        autoHideDuration={6000}
        hideIconVariant
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        action={(snackbarKey) => (
          <SnackbarCloseButton snackbarKey={snackbarKey} />
        )}
      >
        <Imports />
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default App;
