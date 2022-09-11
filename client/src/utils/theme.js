import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#081452',
    },
    secondary: {
      main:'#eeeeee',
    },
    error: {
      main:'#e76d67',
    },
    success: {
      main:'#40b0b2',
    },
 },
 shape:{
  borderRadius: 8,
 }


});

export default theme;