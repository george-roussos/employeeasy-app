import React from "react";
import { TextField } from "@material-ui/core";

export default function Input(props) {
  const { name, label, value, error = null, onChange } = props;
  return (
    <TextField
      variant="outlined"
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      InputLabelProps={{ style: { fontSize: "1.6rem" } }}
      InputProps={{
        style: { fontSize: "1.6rem" },
      }}
      {...(error && { error: true, helperText: error })}
    />
  );
}
