import React, { useState, useEffect } from "react";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { loginSchema } from "@/schemas/authSchema";
import { InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import LoadingButton from "@/common/ui/LoadingButton";
import { loginApi } from "@/routes/api-routes/authApiRoutes";
// import { toast } from "react-toastify";

const initialValues = {
  email: "",
  password: "",
};

const LoginForm = ({ switchToSignUp }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  // 🔹 Check if already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("userProfile");
    if (storedUser) {
      navigate("/distributor"); // redirect if logged in
    }
  }, [navigate]);

  const {
    handleSubmit,
    touched,
    values,
    handleBlur,
    errors,
    handleChange,
    isSubmitting,
    setSubmitting,
  } = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: (data) => {
      userLogin(data);
    },
  });

  const userLogin = async (data) => {
    try {
      const response = await loginApi(data);

      const userProfile = response?.data?.data;
      localStorage.setItem("userProfile", JSON.stringify(userProfile));

      const successMsg = response?.data?.message || "Login successful";
      toast.success(successMsg);

      navigate("/distributor"); // ✅ navigate instead of window.location.href
    } catch (error) {
      console.log("Login Error:", error);

      const errMsg =
        error?.response?.data?.message || error?.message || "Login failed";
      toast.error(errMsg);
    } finally {
      setSubmitting(false);
    }
  };

  const ifError = (key) => touched[key] && errors[key];

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="input-group mb-16">
        <label className="input-label fw-400 text-grey-15">Email *</label>
        <TextField
          fullWidth
          margin="dense"
          placeholder="Enter your email"
          variant="outlined"
          name="email"
          size="small"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={Boolean(ifError("email"))}
          helperText={ifError("email") && errors.email}
        />
      </div>

      <div className="input-group">
        <label className="input-label fw-400 text-grey-15">Password *</label>
        <TextField
          fullWidth
          margin="dense"
          placeholder="Enter your password"
          size="small"
          variant="outlined"
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

      <div className="d-flex justify-content-between mt-15">
        <span
          className="text-primary fw-500 cursor-pointer text-grey-12"
          onClick={() => navigate("/reset-password")}
        >
          Forgot password
        </span>
      </div>

      <LoadingButton
        isLoading={isSubmitting}
        type="submit"
        variant="contained"
        fullWidth
        className="bg-primary mt-16"
      >
        Login
      </LoadingButton>
    </form>
  );
};

export default LoginForm;
