import { Form, useForm } from "../../hooks/useForm";
import {
  createEmployee,
  editEmployee,
} from "../../../../reducers/employeesReducer";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Controls from "../../controls/Controls";
import { Grid } from "@material-ui/core";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import React from "react";
import { useDispatch } from "react-redux";

const EmployeeForm = ({ employee, onClose }) => {
  const dispatch = useDispatch();

  // Check if props is passed and update the object.
  // Enables component reuse for both cases (create or edit).

  const dateObj = new Date();

  const initialFValues = {
    ...(!employee.name
      ? {
          name: "",
          avatar: "",
          email: "",
          phone: "",
          country: "",
          department: "",
          employmentType: "",
          startDate: `${dateObj.getUTCFullYear()}-${
            dateObj.getUTCMonth() + 1
          }-${dateObj.getUTCDate()}`,
        }
      : {
          name: employee.name,
          avatar: employee.avatar,
          email: employee.email,
          phone: employee.phone,
          country: employee.country,
          department: employee.department,
          employmentType: employee.employmentType,
          startDate: employee.startDate,
        }),
  };

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("name" in fieldValues)
      temp.name = fieldValues.name ? "" : "This field is required.";
    if ("avatar" in fieldValues)
      temp.avatar = fieldValues.avatar ? "" : "This field is required.";
    if ("email" in fieldValues)
      temp.email = /$^|.+@.+..+/.test(fieldValues.email)
        ? ""
        : "Email is not valid.";
    if ("phone" in fieldValues)
      temp.phone = fieldValues.phone ? "" : "This field is required.";
    if ("country" in fieldValues)
      temp.country = fieldValues.country ? "" : "This field is required.";
    if ("department" in fieldValues)
      temp.department =
        fieldValues.department.length != 0 ? "" : "This field is required.";
    if ("employmentType" in fieldValues)
      temp.employmentType =
        fieldValues.employmentType.length != 0 ? "" : "This field is required.";
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
      if (!employee.name) {
        dispatch(createEmployee(values));
      } else {
        dispatch(editEmployee(values, employee._id));
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
          <PersonAddAltIcon />
        </Avatar>
      </Box>
      <Form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          alignItems: "center",
          marginLeft: "2rem",
        }}
      >
        <Grid container>
          <Grid item xs={6}>
            <Controls.Input
              name="name"
              label="Full Name"
              value={values.name}
              onChange={handleInputChange}
              error={errors.name}
            />
            <Controls.Input
              label="Email"
              name="email"
              value={values.email}
              onChange={handleInputChange}
              error={errors.email}
            />
            <Controls.Input
              label="Phone"
              name="phone"
              value={values.phone}
              onChange={handleInputChange}
              error={errors.phone}
            />
            <Controls.Input
              label="Country"
              name="country"
              value={values.country}
              onChange={handleInputChange}
              error={errors.country}
            />
            <Controls.Input
              name="avatar"
              label="Display Picture Link"
              value={values.avatar}
              onChange={handleInputChange}
              error={errors.avatar}
            />
          </Grid>
          <Grid item xs={6}>
            <Controls.Select
              name="department"
              label="Department"
              value={values.department}
              onChange={handleInputChange}
              options={[
                { id: "Tech", title: "Tech" },
                { id: "Finance", title: "Finance" },
                { id: "Creatives", title: "Creatives" },
              ]}
              error={errors.department}
            />
            <Controls.Select
              name="employmentType"
              label="Employment Type"
              value={values.employmentType}
              onChange={handleInputChange}
              options={[
                { id: "Permanent", title: "Permanent" },
                { id: "Contractor", title: "Contractor" },
              ]}
              error={errors.employmentType}
            />
            <Controls.DatePicker
              name="startDate"
              label="Hire Date"
              value={values.startDate}
              onChange={handleInputChange}
            />
            <div>
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

export default EmployeeForm;
