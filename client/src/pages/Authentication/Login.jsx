import React from "react";

import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuth, selectIsAuth } from "../../redux/slices/auth";

import { AuthInput } from "../../components/forms";
import { CustomLink, Button } from "../../components/ui/index";

import "./styles.css";

export const Login = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchAuth(values));

    if (!data.payload) {
      return alert("Authenticate failed");
    }

    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    }
  };

  if (isAuth) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <AuthInput
          {...register("email", { required: "Enter email" })}
          error={Boolean(errors.email?.message)}
          errorMessage={errors.email?.message}
          type="email"
          placeholder={"EMAIL"}
        />
        <AuthInput
          {...register("password", { required: "Enter password" })}
          error={Boolean(errors.password?.message)}
          errorMessage={errors.password?.message}
          type="password"
          placeholder={"PASSWORD"}
        />
        <Button disabled={!isValid} type={"submit"}>
          Submit
        </Button>
        <CustomLink to={"/registartion"}>Registartion </CustomLink>
      </form>
    </div>
  );
};

export default Login;
