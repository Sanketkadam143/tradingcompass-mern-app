import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { MenuItem } from "@mui/material";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import { useStateContext } from "../../Contexts/ContextProvider";

//tooltip function to show menu item on hover and on click

const HtmlTooltip = styled(({ className, isMatch, ...props }) => (
  <Tooltip
    leaveTouchDelay={6000}
    enterTouchDelay={0}
    placement={isMatch ? "right-start" : "bottom"}
    {...props}
    classes={{ popper: className }}
  />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#fff",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
    borderRadius:"8px",
    boxShadow:"rgb(0 0 0 / 28%) 0px 0px 13px 0px"
  },
}));

//mapping popup menu items
const PopupMenu = ({ name, menuItems }) => {
  const { isMatch } = useStateContext();
  
  return (
     

    <div>
      <HtmlTooltip
        isMatch={isMatch}
         
        title={menuItems.map((items) => (
         
          <MenuItem key={items}>{items}</MenuItem>
        ))}
      >
        <Button
          endIcon={<KeyboardArrowDown />}
          fullWidth
         
          style={{fontSize:"1em",textTransform: 'none',color:"black"}}
        >
          {name}
        </Button>
      </HtmlTooltip>
    </div>
  );
};

export default PopupMenu;
