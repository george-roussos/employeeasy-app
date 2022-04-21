import "./EmployeeForm.css";

import * as yup from "yup";

import { createEmployee, editEmployee } from "../../reducers/employeesReducer";
import { useDispatch, useSelector } from "react-redux";

import React from "react";
import { setEditMode } from "../../reducers/modalReducer";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  fullName: yup.string().required(),
  email: yup.string().email().required(),
  department: yup.string().required(),
  country: yup.string().required(),
  phone: yup.string().required(),
  employmentType: yup.string().required(),
  startDate: yup.string().required(),
  avatar: yup.string().required(),
});

const EmployeeForm = ({ employee, onClose }) => {
  const dispatch = useDispatch();
  const editMode = useSelector((state) => state.modal);
  const { register, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const handleEntry = async (event) => {
    event.preventDefault();
    if (editMode) {
      const editedEmployee = {
        name: event.target.fullName.value || employee.name,
        email: event.target.email.value || employee.email,
        department: event.target.department.value || employee.department,
        country: event.target.country.value || employee.country,
        phone: event.target.phone.value || employee.phone,
        employmentType:
          event.target.employmentType.value || employee.employmentType,
        startDate: event.target.startDate.value || employee.startDate,
      };
      try {
        dispatch(editEmployee(editedEmployee, employee._id));
        dispatch(setEditMode(false));
        onClose();
      } catch (exception) {
        console.log(exception);
      }
    } else if (!editMode) {
      const newEmployee = {
        name: event.target.fullName.value,
        email: event.target.email.value,
        department: event.target.department.value,
        country: event.target.country.value,
        phone: event.target.phone.value,
        employmentType: event.target.employmentType.value,
        startDate: event.target.startDate.value,
        avatar: event.target.avatar.value,
      };
      try {
        dispatch(createEmployee(newEmployee));
        onClose();
      } catch (exception) {
        console.log(exception);
      }
    }
  };

  return (
    <div className="employee-form">
      <div className="inputs">
        <form onSubmit={handleEntry}>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            ref={register}
          />
          <p> {errors.fullName?.message} </p>
          <input type="text" name="email" placeholder="Email" ref={register} />
          <p> {errors.email?.message} </p>
          <input
            type="text"
            name="department"
            placeholder="Department"
            ref={register}
          />
          <p> {errors.department?.message} </p>
          <input type="text" name="phone" placeholder="Phone" ref={register} />
          <p> {errors.phone?.message} </p>
          <input
            type="text"
            name="employmentType"
            placeholder="Employment Type"
            ref={register}
          />
          <p> {errors.country?.message} </p>
          <input
            type="text"
            name="country"
            placeholder="Country"
            ref={register}
          />
          <p> {errors.country?.message} </p>
          <input
            type="text"
            name="startDate"
            placeholder="Start Date"
            ref={register}
          />
          <p> {errors.startDate?.message} </p>
          <input
            type="text"
            name="avatar"
            placeholder="Picture"
            ref={register}
          />
          <p> {errors.startDate?.message} </p>
          <input type="submit" id="submit" />
        </form>
      </div>
    </div>
  );
};

export default EmployeeForm;
