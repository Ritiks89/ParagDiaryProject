import React, { useState } from "react";
import { TextField, Button, Box, Typography, CircularProgress } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

// ✅ Validation Schema
const validationSchema = Yup.object({
  partyCode: Yup.number()
    .typeError("Party code must be numeric")
    .required("Party code is required"),
  name: Yup.string().required("Name is required"),
  mobile: Yup.string()
    .matches(/^[0-9]{10}$/, "Mobile must be 10 digits")
    .required("Mobile is required"),
  route: Yup.string().required("Route is required"),
  openingBalance: Yup.number()
    .typeError("Opening Balance must be numeric")
    .required("Opening Balance is required"),
  loginId: Yup.string().required("Login ID is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const DistributorForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      partyCode: "",
      name: "",
      mobile: "",
      route: "",
      openingBalance: "",
      loginId: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);

        // ✅ Call API
        const response = await addDistributorApi(values);

        console.log("Distributor Added:", response.data);

        // ✅ Navigate back to Distributor List after success
        navigate("/distributor");
      } catch (error) {
        console.error("Error adding distributor:", error);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 5,
        p: 3,
        border: "1px solid #ccc",
        borderRadius: 2,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Distributor Form
      </Typography>

      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          id="partyCode"
          name="partyCode"
          label="Party Code"
          value={formik.values.partyCode}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.partyCode && Boolean(formik.errors.partyCode)}
          helperText={formik.touched.partyCode && formik.errors.partyCode}
        />

        <TextField
          fullWidth
          margin="normal"
          id="name"
          name="name"
          label="Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />

        <TextField
          fullWidth
          margin="normal"
          id="mobile"
          name="mobile"
          label="Mobile"
          value={formik.values.mobile}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.mobile && Boolean(formik.errors.mobile)}
          helperText={formik.touched.mobile && formik.errors.mobile}
        />

        <TextField
          fullWidth
          margin="normal"
          id="route"
          name="route"
          label="Route"
          value={formik.values.route}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.route && Boolean(formik.errors.route)}
          helperText={formik.touched.route && formik.errors.route}
        />

        <TextField
          fullWidth
          margin="normal"
          id="openingBalance"
          name="openingBalance"
          label="Opening Balance"
          value={formik.values.openingBalance}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.openingBalance &&
            Boolean(formik.errors.openingBalance)
          }
          helperText={
            formik.touched.openingBalance && formik.errors.openingBalance
          }
        />

        <TextField
          fullWidth
          margin="normal"
          id="loginId"
          name="loginId"
          label="Login ID"
          value={formik.values.loginId}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.loginId && Boolean(formik.errors.loginId)}
          helperText={formik.touched.loginId && formik.errors.loginId}
        />

        <TextField
          fullWidth
          margin="normal"
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />

        <Button
          color="primary"
          variant="contained"
          fullWidth
          type="submit"
          sx={{ mt: 2 }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Submit"}
        </Button>
      </form>
    </Box>
  );
};

export default DistributorForm;
