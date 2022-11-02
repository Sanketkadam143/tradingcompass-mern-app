import React from 'react';
import { TextField, Grid, InputAdornment, IconButton } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const Input = ({name, handleChange, label, autoFocus, type, handleShowPassword ,half,disabled}) => {
  return (
      <Grid item xs={12}sm={half ? 6 : 12}>
          <TextField
              name={name}
              onChange={handleChange}
              variant="outlined"
              required
              fullWidth
              label={label}
              autoFocus={autoFocus}
              type={type}
              disabled={disabled}
              InputProps={name === 'password' ? {
                  endAdornment: (
                      <InputAdornment position='end'>
                          <IconButton onClick={handleShowPassword}>
                              {type==='password' ? <VisibilityIcon/> : <VisibilityOffIcon/>}
                          </IconButton>
                      </InputAdornment>
                  ),
              } : null}
          />
    </Grid>
  )
}

export default Input