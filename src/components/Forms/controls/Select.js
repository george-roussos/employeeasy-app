import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
} from "@material-ui/core";

import React from "react";
import { ThemeProvider } from "@material-ui/styles";
import { createTheme } from "@material-ui/core/styles";

export default function Select(props) {
  const { name, label, value, error = null, onChange, options } = props;

  const materialTheme = createTheme({
    typography: {
      // Tell Material-UI what's the font-size on the html element is.
      htmlFontSize: 10,
    },
  });

  return (
    <ThemeProvider theme={materialTheme}>
      <FormControl variant="outlined" {...(error && { error: true })}>
        <InputLabel>{label}</InputLabel>
        <MuiSelect label={label} name={name} value={value} onChange={onChange}>
          <MenuItem value="">None</MenuItem>
          {options.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.title}
            </MenuItem>
          ))}
        </MuiSelect>
        {error && <FormHelperText>{error}</FormHelperText>}
      </FormControl>
    </ThemeProvider>
  );
}
