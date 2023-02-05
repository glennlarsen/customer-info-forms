import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import AuthContext from "utils/AuthContext";
import { AUTH_URL } from "constants/apiKeys";
import schemaLogin from "constants/schemaLogin";
import AlertMessage from "components/AlertMessage";

import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import InputAdornment from "@mui/material/InputAdornment";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import Header from "components/Header";

const mainColour = "#7f57f1";

const FormTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "black",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: mainColour,
  },
});

const url = AUTH_URL;

const LoginForm = ({ title }) => {
  const [submitting, setSubmitting] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaLogin),
  });

  const [, setAuth] = useContext(AuthContext);

  async function onSubmit(data) {
    setSubmitting(true);
    setLoginError(null);
    reset();

    try {
      const response = await axios.post(url, data);
      console.log(response);
      setAuth(response.data);
      navigate("/forms");
    } catch (error) {
      console.log("error", error);
      setLoginError("Wrong username or password");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
      className="login-form"
    >
      <Header title={title} />
      {loginError && (
        <AlertMessage variant="error" title="Error" message={loginError} />
      )}
      <FormTextField
        fullWidth
        label="Username"
        variant="standard"
        type="username"
        {...register("identifier")}
        error={Boolean(errors.identifier)}
        helperText={errors.identifier ? errors.identifier.message : ""}
        InputProps={
          errors.identifier
            ? {
                endAdornment: (
                  <InputAdornment position="end">
                    <ErrorRoundedIcon color="error" />
                  </InputAdornment>
                ),
              }
            : null
        }
      />
      <FormTextField
        fullWidth
        label="Password"
        variant="standard"
        type={showPassword ? "text" : "password"}
        {...register("password")}
        error={Boolean(errors.password)}
        helperText={errors.password ? errors.password.message : ""}
        InputProps={
          errors.password
            ? {
                endAdornment: (
                  <InputAdornment position="end">
                    <ErrorRoundedIcon color="error" />
                  </InputAdornment>
                ),
              }
            : {
                endAdornment: (
                  <InputAdornment position="end">
                    {!showPassword ? (
                      <IconButton edge="end" sx={{ boxShadow: "none" }}>
                        <VisibilityIcon
                          onClick={() => setShowPassword(!showPassword)}
                          sx={{ opacity: ".6" }}
                        />
                      </IconButton>
                    ) : (
                      <IconButton edge="end" sx={{ boxShadow: "none" }}>
                        <VisibilityOffIcon
                          onClick={() => setShowPassword(!showPassword)}
                          sx={{ opacity: ".6" }}
                        />
                      </IconButton>
                    )}
                  </InputAdornment>
                ),
              }
        }
      />
      <button type="submit">{submitting ? "Loggin in..." : "Login"}</button>
    </Box>
  );
};

export default LoginForm;
