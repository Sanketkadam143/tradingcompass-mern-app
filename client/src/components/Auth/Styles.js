import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
  },
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(4),
  },
  name:{
   fontWeight:"bold",
   fontSize:"1em",
   fontFamily:"sans-serif",
   color:"#081452"
  },
  timer:{
  marginLeft:"90%",
  },
  submitbut: {
    margin: theme.spacing(3, 0, 2),
  },
  googleButton: {
    margin: theme.spacing(2,0,2,0),
    width: '100%',
    alignSelf: 'center',
  },
}));