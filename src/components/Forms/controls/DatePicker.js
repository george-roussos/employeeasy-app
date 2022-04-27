import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";

import DateFnsUtils from "@date-io/date-fns";
import React from "react";
import { ThemeProvider } from "@material-ui/styles";
import { createTheme } from "@material-ui/core/styles";

export default function DatePicker(props) {
  const { name, label, value, onChange } = props;

  const convertToDefEventPara = (name, value) => ({
    target: {
      name,
      value,
    },
  });

  const materialTheme = createTheme({
    typography: {
      // Tell Material-UI what's the font-size on the html element is.
      htmlFontSize: 10,
    },
  });

  return (
    <ThemeProvider theme={materialTheme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          variant="outline"
          inputVariant="outlined"
          label={label}
          format="yyyy/MM/dd"
          name={name}
          value={value}
          onChange={(date) => onChange(convertToDefEventPara(name, date))}
        />
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
}
