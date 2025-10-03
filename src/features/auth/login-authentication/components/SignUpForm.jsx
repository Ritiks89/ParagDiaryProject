import React, { useState } from "react";
import { useFormik } from "formik";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { FaCircleCheck } from "react-icons/fa6";
import { signupSchema } from "@/schemas/authSchema";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import LoadingButton from "@/common/ui/LoadingButton";
import { useToast } from "@/hooks/useToast";
import { signupApi } from "@/routes/api-routes/authApiRoutes";

const SignUpForm = ({ switchToLogin }) => {
  const showToast = useToast();
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      userType : "admin"
    },
    validationSchema: signupSchema,
    onSubmit: async (values) => {
      handleSignup(values);
    },
  });

  const {
    values,
    handleChange,
    handleSubmit,
    errors,
    touched,
    setFieldValue,
    handleBlur,
  } = formik;
  const isLengthValid = values.password.length >= 8;
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(values.password);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };
  const ifError = (key) => touched[key] && errors[key];
  function handleNumbersOnly(e) {
    const { name, value } = e.target;
    if (/^\d*\.?\d*$/.test(e.target.value)) {
      setFieldValue(name, value);
    }
  }

  async function handleSignup(payload) {
    try {
      const response = await signupApi(payload);
      showToast("200", "Account created successfully! Now you can login.");
      switchToLogin();
    } catch (error) {}
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="input-group mb-16">
        <label className="input-label text-grey-15">Name *</label>
        <TextField
          name="name"
          fullWidth
          margin="dense"
          placeholder="Enter your name"
          variant="outlined"
          size="small"
          value={values.name}
          onChange={handleChange}
          error={touched.name && Boolean(errors.name)}
          helperText={touched.name && errors.name}
        />
      </div>

      <div className="input-group mb-16">
        <label className="input-label text-grey-15">Email *</label>
        <TextField
          name="email"
          fullWidth
          margin="dense"
          placeholder="Enter your email"
          variant="outlined"
          size="small"
          value={values.email}
          onChange={handleChange}
          error={touched.email && Boolean(errors.email)}
          helperText={touched.email && errors.email}
        />
      </div>

      <div className="input-group mb-16">
        <label className="input-label text-grey-15">Phone *</label>
        <TextField
          name="phone"
          fullWidth
          margin="dense"
          placeholder="Enter phone number"
          variant="outlined"
          size="small"
          value={values.phone}
          onChange={handleNumbersOnly}
          error={touched.phone && Boolean(errors.phone)}
          helperText={touched.phone && errors.phone}
        />
      </div>

      <div className="input-group">
        <label className="input-label text-grey-15">Password *</label>
        <TextField
          fullWidth
          margin="dense"
          placeholder="Enter your password"
          variant="outlined"
          size="small"
          type={showPassword ? "text" : "password"}
          name="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={Boolean(ifError("password"))}
          helperText={ifError("password") && errors.password}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleTogglePassword} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </div>

      <div className="mt-20">
        <div className="d-flex align-items-center gap-2 fs-14 fw-500">
          <FaCircleCheck
            className={
              isLengthValid ? "text-success fs-14" : "light-gray fs-14"
            }
          />
          <p className="text-grey-10">Must be at least 8 characters</p>
        </div>
        <div className="d-flex align-items-center gap-2 fs-14 fw-500 mt-10">
          <FaCircleCheck
            className={
              hasSpecialChar ? "text-success fs-14" : "light-gray fs-14"
            }
          />
          <p className="text-grey-10">Must contain one special character</p>
        </div>
      </div>

      <LoadingButton
        isLoading={false}
        type="button"
        variant="contained"
        fullWidth
        onClick={handleSubmit}
        className="bg-primary mt-16"
      >
        Sign Up
      </LoadingButton>
      <div className="mt-30 d-flex align-items-center justify-content-center">
        <p className="text-gray fs-14">Already have an account?</p>
        <span
          className="dark-blue fw-600 ml-5 fs-14 cursor-pointer"
          onClick={switchToLogin}
        >
          Log in
        </span>
      </div>
    </form>
  );
};

export default SignUpForm;
