import { Form, useForm } from "../../hooks/useForm";
import {
  createExpense,
  editExpense,
} from "../../../../reducers/expensesReducer";

import AttachMoney from "@mui/icons-material/AttachMoney";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Controls from "../../controls/Controls";
import { Grid } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";

const ExpenseForm = ({ expense, onClose }) => {
  const dispatch = useDispatch();

  // Check if props is passed and update the object.
  // Enables component reuse for both cases (create or edit).

  const dateObj = new Date();

  const initialFValues = {
    ...(!expense.employee
      ? {
          employee: "",
          merchant: "",
          amount: "",
          currency: "",
          status: "",
          date: `${dateObj.getUTCFullYear()}-${
            dateObj.getUTCMonth() + 1
          }-${dateObj.getUTCDate()}`,
        }
      : {
          employee: expense.employee.name,
          merchant: expense.merchant,
          amount: expense.amount,
          currency: expense.currency,
          status: expense.status,
          date: expense.date,
        }),
  };

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("merchant" in fieldValues)
      temp.merchant = fieldValues.merchant ? "" : "This field is required.";
    if ("amount" in fieldValues)
      temp.amount = fieldValues.amount ? "" : "This field is required.";
    if ("currency" in fieldValues)
      temp.currency = fieldValues.currency ? "" : "This field is required.";
    if ("status" in fieldValues)
      temp.status =
        fieldValues.status.length != 0 ? "" : "This field is required.";
    if ("employee" in fieldValues)
      temp.employee = fieldValues.employee ? "" : "This field is required.";
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
      values.date = values.date.toISOString().split("T")[0];
      if (!expense.employee) {
        dispatch(createExpense(values));
      } else {
        dispatch(editExpense(values, expense._id));
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
          <AttachMoney />
        </Avatar>
      </Box>
      <Form
        onSubmit={handleSubmit}
        style={{ display: "flex", alignItems: "center", marginLeft: "2rem" }}
      >
        <Grid container>
          <Grid item xs={6}>
            <Controls.DatePicker
              name="date"
              label="Expense Date"
              value={values.date}
              onChange={handleInputChange}
            />
            <Controls.Input
              label="Merchant"
              name="merchant"
              value={values.merchant}
              onChange={handleInputChange}
              error={errors.merchant}
            />
            <Controls.Input
              label="Amount"
              name="amount"
              value={values.amount}
              onChange={handleInputChange}
              error={errors.amount}
            />
            <Controls.Input
              label="Currency"
              name="currency"
              value={values.currency}
              onChange={handleInputChange}
              error={errors.currency}
            />
            <Controls.Input
              name="employee"
              label="Employee"
              value={values.employee}
              onChange={handleInputChange}
              error={errors.employee}
            />
          </Grid>
          <Grid item xs={6}>
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

export default ExpenseForm;
