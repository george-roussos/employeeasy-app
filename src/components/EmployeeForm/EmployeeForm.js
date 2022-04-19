import React from "react";
import "./EmployeeForm.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  firstName: yup.string().required,
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  department: yup.string().required(),
  country: yup.string().required(),
  phone: yup.string().required(),
});

const EmployeeForm = () => {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const submitForm = (data) => {
    console.log(data);
  };
  return (
    <div className="employee-form">
      <div className="inputs">
        <form onSubmit={handleSubmit(submitForm)}>
          <input
            type="text"
            {...register("firstName")}
            placeholder="First Name..."
          />
          <p> {errors.firstName?.message} </p>
          <input
            type="text"
            name="lastName"
            placeholder="Last Name..."
            ref={register}
          />
          <p> {errors.lastName?.message} </p>
          <input
            type="text"
            name="email"
            placeholder="Email..."
            ref={register}
          />
          <p> {errors.email?.message} </p>
          <input
            type="text"
            name="department"
            placeholder="Department..."
            ref={register}
          />
          <p> {errors.department?.message} </p>
          <input
            type="text"
            name="phone"
            placeholder="Phone..."
            ref={register}
          />
          <p> {errors.phone?.message} </p>
          <input
            type="text"
            name="country"
            placeholder="Country..."
            ref={register}
          />
          <p> {errors.country?.message} </p>
          <input type="submit" id="submit" />
        </form>
      </div>
    </div>
  );
};

export default EmployeeForm;
