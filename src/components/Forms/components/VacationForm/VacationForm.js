import { Form, useForm } from "../../hooks/useForm";
import {
  createVacation,
  editVacation,
} from "../../../../reducers/vacationReducer";

import Avatar from "@mui/material/Avatar";
import BeachAccess from "@mui/icons-material/BeachAccess";
import Box from "@mui/material/Box";
import Controls from "../../controls/Controls";
import { Grid } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";

const VacationForm = ({ vacation, onClose }) => {
  const dispatch = useDispatch();

  // Check if props is passed and update the object.
  // Enables component reuse for both cases (create or edit).

  const dateObj = new Date();

  const initialFValues = {
    ...(!vacation.startOn
      ? {
          employee: "",
          startOn: `${dateObj.getUTCFullYear()}-${
            dateObj.getUTCMonth() + 1
          }-${dateObj.getUTCDate()}`,
          endOn: `${dateObj.getUTCFullYear()}-${
            dateObj.getUTCMonth() + 1
          }-${dateObj.getUTCDate()}`,
          status: "",
          daysLeft: "",
        }
      : {
          employee: vacation.employee.name,
          startOn: vacation.startOn,
          endOn: vacation.endOn,
          status: vacation.status,
          daysLeft: vacation.daysLeft,
        }),
  };

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("employee" in fieldValues)
      temp.employee = fieldValues.employee ? "" : "This field is required.";
    if ("startOn" in fieldValues)
      temp.startOn = fieldValues.startOn ? "" : "This field is required.";
    if ("endOn" in fieldValues)
      temp.endOn = fieldValues.endOn ? "" : "This field is required.";
    if ("daysLeft" in fieldValues)
      temp.daysLeft = fieldValues.daysLeft ? "" : "This field is required.";
    if ("status" in fieldValues)
      temp.status =
        fieldValues.status.length != 0 ? "" : "This field is required.";
    setErrors({
      ...temp,
    });

    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFValues, true, validate);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      if (!vacation.employee) {
        values.startOn = values.startOn.toISOString().split("T")[0];
        values.endOn = values.endOn.toISOString().split("T")[0];
        dispatch(createVacation(values));
      } else {
        values.employee = vacation.employee._id;
        dispatch(editVacation(values, vacation._id));
      }
      resetForm();
      onClose();
    }
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: "1.3rem",
        }}
      >
        <Avatar
          sx={{
            m: 1,
            bgcolor: "secondary.main",
          }}
        >
          <BeachAccess />
        </Avatar>
      </Box>
      <Form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          alignItems: "center",
          marginLeft: "5rem",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Controls.Input
              label="Employee"
              name="employee"
              value={values.employee}
              onChange={handleInputChange}
              error={errors.employee}
            />
            <Controls.DatePicker
              name="startOn"
              label="Start On"
              value={values.startOn}
              onChange={handleInputChange}
              error={errors.startOn}
            />
            <Controls.DatePicker
              name="endOn"
              label="End On"
              value={values.endOn}
              onChange={handleInputChange}
              error={errors.endOn}
            />
            <Controls.Input
              label="Days Left"
              name="daysLeft"
              value={values.daysLeft}
              onChange={handleInputChange}
              error={errors.daysLeft}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Controls.Select
              name="status"
              label="Status"
              value={values.status}
              onChange={handleInputChange}
              options={[
                { id: "Approved", title: "Approved" },
                { id: "Pending", title: "Pending" },
                { id: "Rejected", title: "Rejected" },
              ]}
              error={errors.status}
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginLeft: "3rem",
              }}
            >
              <Controls.Button type="submit" text="Submit" />
              <Controls.Button
                text="Reset"
                color="default"
                onClick={resetForm}
              />
            </div>
          </Grid>
        </Grid>
      </Form>
    </>
  );
};

export default VacationForm;
