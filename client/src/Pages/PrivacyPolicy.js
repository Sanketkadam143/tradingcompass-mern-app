import React from "react";
import { Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";



const useStyles = makeStyles((theme) => {
  return {
    PrivacyPageDiv: {
      marginBottom: "5em",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    contentDiv:{
        margin:"4em"
    },
    paperDiv: {
      margin: "2em",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "3em",
      minWidth: "1000px",
      [theme.breakpoints.down("lg")]: {
        gap: "0",
        minWidth: "80%",
        margin: "2em",
      },
    },
  };
});



const PrivacyPolicy = () => {

  const classes = useStyles();
  return (
    <>
      <div className={classes.PrivacyPageDiv}>


      <Paper className={classes.paperDiv} elevation={3} >
       <div  style={{margin: "1em",fontSize:"23px",fontFamily:"Arial"}}>
       Privacy Policy 

       </div>
      </Paper>



        <Paper className={classes.paperDiv} elevation={3} >
          <div className={classes.contentDiv}>
          Your privacy is very important for us. Tradingcompass policy is to respect your privacy with respect to any information that we may collect from you through our website, https://tradingcompass.netlify.app , and other sites that we own and operate.<br/><br/>

We only ask for personal information when we really need it to provide you service. We collect it by fair and legal means, with your knowledge and consent. We also let you know why we collect it and how it will be used.<br/><br/>


We only retain the information collected for the time necessary to provide you with the requested service. We will protect the data we store within commercially acceptable means to prevent loss and theft, as well as unauthorized access, disclosure, copying, use, or modification.<br/><br/>


Third party vendors, including Google, use cookies to serve ads based on a user's prior visits to your website or other websites. Google's use of advertising cookies enables it and its partners to serve ads to your users based on their visit to your sites and/or other sites on the Internet.<br/><br/>


We do not share any personally identifiable information publicly or with third parties, except when required by law.<br/><br/>


Our website may have links to external sites that are not operated by us. Please note that we have no control over the content and practices of these sites and that we cannot assume responsibility for their respective privacy policies.<br/><br/>


You are free to decline our request for your personal information, understanding that we may not be able to provide you with some of the services you desire.<br/><br/>


Your continued use of our website will be deemed acceptance of our privacy and personal information practices. If you have any questions about how we handle user data and personal information, please do not hesitate to contact us.<br/><br/>


This policy is effective as of January 01, 2022.
          </div>
        </Paper>
      </div>
    </>
  );
};

export default PrivacyPolicy;
